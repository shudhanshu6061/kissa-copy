import { NavLink, Outlet, redirect } from "react-router";
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
import { useWishlist } from "../../lib/wishlist";
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
    throw redirect(refreshTarget);
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
  const { count: wishlistCount } = useWishlist();

  // If user is not logged in, render the clean, modern sign-in gate
  if (!loaderData?.isLoggedIn) {
    const returnTo = loaderData?.returnTo || "/account";
    const authUrl = `/account/login?return_to=${encodeURIComponent(returnTo)}`;

    return (
      <MainLayout showAnnouncement={false}>
        <div className="kissa-account-container">
          <div className="kissa-login-gate">
            <img
              src="/kissa-logo.png"
              alt="KISSA"
              className="kissa-login-logo"
            />

            <h1
              className="kissa-section-title"
              style={{ fontSize: "2.2rem", marginBottom: "12px" }}
            >
              Sign In to Your Account
            </h1>

            <p
              className="kissa-section-desc"
              style={{ marginBottom: "32px", fontSize: "1.05rem" }}
            >
              Sign in to view your orders, track deliveries, and manage your saved addresses.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <a
                href={authUrl}
                className="kissa-btn-primary"
                style={{
                  width: "100%",
                  padding: "16px 28px",
                  display: "inline-block",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                Sign In with Shopify
              </a>
            </div>

            <div style={{ borderTop: "1px solid var(--kissa-border)", paddingTop: "20px" }}>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--kissa-primary-light)",
                  fontFamily: "Inter, sans-serif",
                  margin: "0 0 16px",
                }}
              >
                Shopify will send a secure one-time verification code to your email address.
              </p>

              <a
                href="/shop"
                className="kissa-btn-secondary"
                style={{ fontSize: "0.8rem", padding: "8px 18px" }}
              >
                Return to Shop
              </a>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const customer = loaderData?.customer;
  const customerName =
    customer?.firstName ||
    customer?.displayName ||
    customer?.emailAddress?.emailAddress?.split("@")[0] ||
    "Customer";

  return (
    <MainLayout showAnnouncement={false}>
      <div className="kissa-account-container">
        {/* WELCOME SECTION */}
        <section className="kissa-welcome-section" aria-label="Customer Welcome">
          <div className="kissa-welcome-content">
            <h1 className="kissa-welcome-heading">
              Welcome back, {customerName}!
            </h1>
            <p className="kissa-welcome-desc">
              Manage your account, view your orders, track deliveries and update your personal information.
            </p>
          </div>

          <div className="kissa-welcome-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Verified Customer</span>
          </div>
        </section>

        {/* DASHBOARD LAYOUT: SIDEBAR + CONTENT */}
        <div className="kissa-dashboard-layout">
          {/* SIDEBAR NAVIGATION */}
          <aside className="kissa-sidebar" aria-label="Account Sidebar Navigation">
            <nav className="kissa-sidebar-nav">
              <NavLink
                to="/account"
                end
                className={({ isActive }) =>
                  `kissa-nav-item ${isActive ? "active" : ""}`
                }
              >
                <svg
                  className="kissa-nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                <span>Overview</span>
              </NavLink>

              <NavLink
                to="/account/orders"
                className={({ isActive }) =>
                  `kissa-nav-item ${isActive ? "active" : ""}`
                }
              >
                <svg
                  className="kissa-nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>My Orders</span>
              </NavLink>

              <NavLink
                to="/account/profile"
                className={({ isActive }) =>
                  `kissa-nav-item ${isActive ? "active" : ""}`
                }
              >
                <svg
                  className="kissa-nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Personal Information</span>
              </NavLink>

              <NavLink
                to="/account/addresses"
                className={({ isActive }) =>
                  `kissa-nav-item ${isActive ? "active" : ""}`
                }
              >
                <svg
                  className="kissa-nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Saved Addresses</span>
              </NavLink>

              <NavLink
                to="/account/wishlist"
                className={({ isActive }) =>
                  `kissa-nav-item ${isActive ? "active" : ""}`
                }
              >
                <svg
                  className="kissa-nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="kissa-nav-badge">{wishlistCount}</span>
                )}
              </NavLink>

              <div className="kissa-sidebar-logout">
                <form method="post" action="/account/logout">
                  <button
                    type="submit"
                    className="kissa-logout-btn"
                    title="Sign out of your account"
                  >
                    <svg
                      className="kissa-nav-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </form>
              </div>
            </nav>
          </aside>

          {/* MAIN CONTENT OUTLET */}
          <main className="kissa-main-content">
            <Outlet context={{ customer }} />
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
