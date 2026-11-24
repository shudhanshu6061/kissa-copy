import { Link } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/index";
import { storefrontContext } from "../../lib/context";
import { requireCustomerAccount } from "../../lib/customer-account.server";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Account Overview — KISSA Atelier" },
    { name: "description", content: "Overview of your KISSA botanical fragrance account." },
  ];
};

const CUSTOMER_OVERVIEW_QUERY = gql(`
  query CustomerOverview {
    customer {
      id
      firstName
      lastName
      displayName
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
      defaultAddress {
        id
        formatted
        firstName
        lastName
        address1
        address2
        city
        province
        zip
        country
      }
      orders(first: 3, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          name
          number
          processedAt
          financialStatus
          fulfillmentStatus
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 3) {
            nodes {
              title
              quantity
              image {
                url
                altText
              }
            }
          }
        }
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

  const { data, errors } = await customerAccount.graphql(CUSTOMER_OVERVIEW_QUERY, {
    accessToken,
  });

  if (errors && errors.length > 0) {
    console.warn("Customer overview GraphQL errors:", errors);
  }

  return {
    customer: data?.customer ?? null,
  };
}

export default function AccountIndex({ loaderData }: Route.ComponentProps) {
  const customer = loaderData?.customer;
  const recentOrders = customer?.orders?.nodes ?? [];
  const defaultAddress = customer?.defaultAddress;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatPrice = (amount?: string, currency?: string) => {
    if (!amount) return "";
    const num = parseFloat(amount);
    return `${currency || "INR"} ${num.toLocaleString()}`;
  };

  return (
    <div>
      {/* Quick Summary Grid */}
      <section className="kissa-grid-stats">
        <div className="kissa-card">
          <span className="kissa-stat-label">Connoisseur Tier</span>
          <div className="kissa-stat-value">Atelier Patron</div>
          <p className="kissa-stat-desc">
            {customer?.emailAddress?.emailAddress || "Verified Member"}
          </p>
        </div>

        <div className="kissa-card">
          <span className="kissa-stat-label">Acquisitions</span>
          <div className="kissa-stat-value">{recentOrders.length}</div>
          <p className="kissa-stat-desc">
            {recentOrders.length > 0
              ? `Latest order: ${recentOrders[0].name}`
              : "No flacons acquired yet"}
          </p>
        </div>

        <div className="kissa-card">
          <span className="kissa-stat-label">Primary Sanctuary</span>
          <div className="kissa-stat-value" style={{ fontSize: "1.4rem" }}>
            {defaultAddress?.city ? `${defaultAddress.city}, ${defaultAddress.country}` : "Unspecified"}
          </div>
          <p className="kissa-stat-desc">
            <Link
              to="/account/addresses"
              style={{ color: "var(--kissa-orange)", textDecoration: "none" }}
            >
              {defaultAddress ? "Manage addresses →" : "Add sanctuary address →"}
            </Link>
          </p>
        </div>
      </section>

      {/* Recent Orders Section */}
      <section style={{ marginBottom: "48px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "20px",
          }}
        >
          <h2 className="kissa-card-title" style={{ margin: 0 }}>
            Recent Olfactory Acquisitions
          </h2>
          {recentOrders.length > 0 && (
            <Link
              to="/account/orders"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.85rem",
                color: "var(--kissa-orange)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View all orders ({recentOrders.length}) →
            </Link>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="kissa-empty-state">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--kissa-brown-light)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ margin: "0 auto 12px" }}
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h3 className="kissa-empty-title">Your cabinet awaits its first flacon</h3>
            <p className="kissa-empty-desc">
              Every grand fragrance journey begins with an encounter. Discover our artisanal extractions hand-bottled in small numbered editions.
            </p>
            <Link to="/shop" className="kissa-btn-primary">
              Explore Botanical Herbarium
            </Link>
          </div>
        ) : (
          <div>
            {recentOrders.map((order: any) => (
              <div key={order.id} className="kissa-order-item">
                <div className="kissa-order-header">
                  <div>
                    <span className="kissa-order-title">{order.name}</span>
                    <span className="kissa-order-date">
                      {formatDate(order.processedAt)}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span
                      className={`kissa-badge ${
                        order.financialStatus === "PAID"
                          ? "kissa-badge-paid"
                          : "kissa-badge-pending"
                      }`}
                    >
                      {order.financialStatus}
                    </span>
                    <span className="kissa-badge kissa-badge-fulfilled">
                      {order.fulfillmentStatus}
                    </span>
                  </div>
                </div>

                {order.lineItems?.nodes?.map((line: any, idx: number) => (
                  <div key={idx} className="kissa-order-line-item">
                    {line.image?.url ? (
                      <img
                        src={line.image.url}
                        alt={line.image.altText || line.title}
                        className="kissa-order-thumb"
                      />
                    ) : (
                      <div
                        className="kissa-order-thumb"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--kissa-brown-light)",
                        }}
                      >
                        FLACON
                      </div>
                    )}
                    <div>
                      <h4 className="kissa-order-line-title">{line.title}</h4>
                      <p className="kissa-order-line-qty">Quantity: {line.quantity}</p>
                    </div>
                  </div>
                ))}

                <div className="kissa-order-footer">
                  <span style={{ fontSize: "0.9rem", color: "var(--kissa-brown-light)" }}>
                    Total Amount
                  </span>
                  <span className="kissa-order-total">
                    {formatPrice(order.totalPrice?.amount, order.totalPrice?.currencyCode)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Account Management Navigation Cards */}
      <section>
        <h2 className="kissa-card-title" style={{ marginBottom: "20px" }}>
          Atelier Services &amp; Management
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <Link
            to="/account/orders"
            className="kissa-card"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <h3 className="kissa-card-title" style={{ fontSize: "1.3rem" }}>
              Acquisitions Archive →
            </h3>
            <p className="kissa-stat-desc">
              Review your historical orders, tracking information, and edition certificates.
            </p>
          </Link>

          <Link
            to="/account/addresses"
            className="kissa-card"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <h3 className="kissa-card-title" style={{ fontSize: "1.3rem" }}>
              Sanctuary Addresses →
            </h3>
            <p className="kissa-stat-desc">
              Update your delivery sanctuaries and default destination coordinates.
            </p>
          </Link>

          <Link
            to="/account/profile"
            className="kissa-card"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <h3 className="kissa-card-title" style={{ fontSize: "1.3rem" }}>
              Connoisseur Profile →
            </h3>
            <p className="kissa-stat-desc">
              Manage personal details, olfactory contact preferences, and name records.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
