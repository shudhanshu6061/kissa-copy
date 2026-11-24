import { NavLink, Outlet } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/layout";
import { storefrontContext } from "../../lib/context";
import { envContext } from "../../lib/server-context";
import {
  createRequestCustomerSession,
  createRequestCustomerAccountClient,
} from "../../lib/customer-account.server";
import { createAppSessionManager } from "../../lib/session.server";
import { MainLayout } from "../../layouts/MainLayout";
import "../../styles/account.css";

const CUSTOMER_LAYOUT_QUERY = gql(`
  query CustomerLayout {
    customer {
      id
      firstName
      lastName
      displayName
      emailAddress {
        emailAddress
      }
    }
  }
`);

export async function loader({ request, context }: Route.LoaderArgs) {
  const storefront = context.get(storefrontContext);
  if (!storefront) {
    throw new Response("Storefront context not initialized", { status: 500 });
  }
  const env = context.get(envContext);

  const { customerSession } = createRequestCustomerSession(env);
  const sessionManager = await createAppSessionManager(request, env);
  const loggedIn = await customerSession.isLoggedIn(
    sessionManager,
    storefront.requestContext
  );

  const url = new URL(request.url);
  const returnTo = url.pathname + url.search;

  if (!loggedIn) {
    return {
      isLoggedIn: false,
      customer: null,
      returnTo,
    };
  }

  const accessToken = await customerSession.getAccessToken(
    sessionManager,
    storefront.requestContext
  );

  if (!accessToken) {
    if (url.searchParams.get("refreshed") === "1") {
      return {
        isLoggedIn: false,
        customer: null,
        returnTo,
      };
    }

    const refreshTarget = `/account/refresh?return_to=${encodeURIComponent(
      `${url.pathname}?refreshed=1`
    )}`;
    throw new Response(null, {
      status: 302,
      headers: { Location: refreshTarget },
    });
  }

  let customer = null;
  try {
    const customerAccount = createRequestCustomerAccountClient(
      storefront.requestContext,
      env
    );
    const { data, errors } = await customerAccount.graphql(CUSTOMER_LAYOUT_QUERY, {
      accessToken,
    });

    if (errors && errors.length > 0) {
      console.warn("Customer layout GraphQL errors:", errors);
    }
    customer = data?.customer ?? null;
  } catch (err) {
    console.error("Failed to query customer layout:", err);
  }

  return {
    isLoggedIn: true,
    customer,
    returnTo,
  };
}

export default function AccountLayout({ loaderData }: Route.ComponentProps) {
  if (!loaderData?.isLoggedIn) {
    const returnTo = loaderData?.returnTo || "/account";
    const authUrl = `/account/login?return_to=${encodeURIComponent(returnTo)}`;

    return (
      <MainLayout showAnnouncement={false}>
        <div className="kissa-login-gate">
          <div style={{ marginBottom: "20px" }}>
            <img
              src="/kissa-logo.png"
              alt="KISSA"
              className="kissa-login-logo"
            />
          </div>

          <span className="kissa-account-pretitle">
            Private Sanctuary &amp; Concierge
          </span>

          <h1 className="kissa-account-title" style={{ fontSize: "2.2rem" }}>
            Atelier Member Sign-In
          </h1>

          <p
            className="kissa-account-subtitle"
            style={{ marginBottom: "32px", fontSize: "1.05rem", lineHeight: "1.6" }}
          >
            Enter the sanctuary of wild botanical extracts and living watercolors.
            Authenticate seamlessly with Shopify&apos;s official passwordless customer portal.
          </p>

          <div style={{ marginBottom: "24px" }}>
            <a
              href={authUrl}
              className="kissa-btn-primary"
              style={{
                width: "100%",
                padding: "16px 28px",
                display: "inline-block",
                textAlign: "center",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              Authenticate with Shopify
            </a>
          </div>

          <div style={{ borderTop: "1px solid var(--kissa-border)", paddingTop: "20px" }}>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--kissa-brown-light)",
                fontFamily: "Inter, sans-serif",
                margin: "0 0 16px",
              }}
            >
              No password required. A secure one-time code will be dispatched to your email address or Shop account.
            </p>

            <a
              href="/shop"
              className="kissa-btn-secondary"
              style={{
                fontSize: "0.8rem",
                padding: "10px 20px",
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              Return to Herbarium Shop
            </a>
          </div>
        </div>
      </MainLayout>
    );
  }

  const customer = loaderData?.customer;
  const displayName =
    customer?.firstName ||
    customer?.displayName ||
    customer?.emailAddress?.emailAddress?.split("@")[0] ||
    "Connoisseur";

  const email = customer?.emailAddress?.emailAddress || "";

  return (
    <MainLayout showAnnouncement={false}>
      <div className="kissa-account-page">
        {/* Account Header */}
        <header className="kissa-account-header">
          <div>
            <span className="kissa-account-pretitle">
              Atelier Member Sanctuary
            </span>
            <h1 className="kissa-account-title">
              Welcome, {displayName}
            </h1>
            <p className="kissa-account-subtitle">
              {email} · Patron of KISSA Botanical Parfumerie
            </p>
          </div>

          <div className="kissa-account-actions-top">
            {/* Plain native form is required by Hydrogen for external Shopify OAuth logout redirects */}
            <form method="post" action="/account/logout">
              <button
                type="submit"
                className="kissa-account-logout-btn"
                title="Sign out of Shopify Customer Account"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="kissa-account-nav" aria-label="Customer Account Navigation">
          <NavLink
            to="/account"
            end
            className={({ isActive }) =>
              `kissa-account-tab ${isActive ? "active" : ""}`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/account/orders"
            className={({ isActive }) =>
              `kissa-account-tab ${isActive ? "active" : ""}`
            }
          >
            Orders &amp; Acquisitions
          </NavLink>
          <NavLink
            to="/account/addresses"
            className={({ isActive }) =>
              `kissa-account-tab ${isActive ? "active" : ""}`
            }
          >
            Saved Sanctuaries
          </NavLink>
          <NavLink
            to="/account/profile"
            className={({ isActive }) =>
              `kissa-account-tab ${isActive ? "active" : ""}`
            }
          >
            Member Profile
          </NavLink>
        </nav>

        {/* Sub-page content */}
        <main>
          <Outlet />
        </main>
      </div>
    </MainLayout>
  );
}
