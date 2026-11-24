import { NavLink, Outlet } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/layout";
import { storefrontContext } from "../../lib/context";
import { requireCustomerAccount } from "../../lib/customer-account.server";
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

  const { customerAccount, accessToken } = await requireCustomerAccount(
    request,
    storefront.requestContext
  );

  const { data, errors } = await customerAccount.graphql(CUSTOMER_LAYOUT_QUERY, {
    accessToken,
  });

  if (errors && errors.length > 0) {
    console.warn("Customer layout GraphQL errors:", errors);
  }

  return {
    customer: data?.customer ?? null,
  };
}

export default function AccountLayout({ loaderData }: Route.ComponentProps) {
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
