import { Link } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/orders";
import { storefrontContext } from "../../lib/context";
import { requireCustomerAccount } from "../../lib/customer-account.server";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Acquisitions & Orders — KISSA Atelier" },
    { name: "description", content: "Review your botanical perfume orders and flacon acquisitions." },
  ];
};

const CUSTOMER_ORDERS_QUERY = gql(`
  query CustomerOrders {
    customer {
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          name
          number
          processedAt
          financialStatus
          fulfillmentStatus
          statusPageUrl
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 10) {
            nodes {
              title
              quantity
              price {
                amount
                currencyCode
              }
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

  const { data, errors } = await customerAccount.graphql(CUSTOMER_ORDERS_QUERY, {
    accessToken,
  });

  if (errors && errors.length > 0) {
    console.warn("Customer orders GraphQL errors:", errors);
  }

  return {
    orders: data?.customer?.orders?.nodes ?? [],
  };
}

export default function AccountOrders({ loaderData }: Route.ComponentProps) {
  const orders = loaderData?.orders ?? [];

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
      <div style={{ marginBottom: "32px" }}>
        <h2 className="kissa-card-title" style={{ fontSize: "2rem", marginBottom: "8px" }}>
          Your Flacon Archive
        </h2>
        <p className="kissa-account-subtitle">
          Numbered editions and olfactory creations prepared for your sanctuary.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="kissa-empty-state">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--kissa-brown-light)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 auto 16px" }}
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h3 className="kissa-empty-title">No acquisitions recorded yet</h3>
          <p className="kissa-empty-desc">
            Your private cellar currently holds no registered flacons. Explore our wild botanical herbarium to place your first reservation.
          </p>
          <Link to="/shop" className="kissa-btn-primary">
            Explore Herbarium Collection
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {orders.map((order: any) => (
            <article key={order.id} className="kissa-order-item">
              <div className="kissa-order-header">
                <div>
                  <span className="kissa-order-title" style={{ fontSize: "1.2rem" }}>
                    Acquisition {order.name}
                  </span>
                  <span className="kissa-order-date">
                    Ordered on {formatDate(order.processedAt)}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span
                    className={`kissa-badge ${
                      order.financialStatus === "PAID"
                        ? "kissa-badge-paid"
                        : "kissa-badge-pending"
                    }`}
                  >
                    Payment: {order.financialStatus}
                  </span>
                  <span className="kissa-badge kissa-badge-fulfilled">
                    Status: {order.fulfillmentStatus}
                  </span>
                </div>
              </div>

              {/* Line Items */}
              <div style={{ margin: "16px 0" }}>
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
                          fontSize: "0.7rem",
                          color: "var(--kissa-brown-light)",
                        }}
                      >
                        KISSA
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h4 className="kissa-order-line-title">{line.title}</h4>
                      <p className="kissa-order-line-qty">
                        Quantity: {line.quantity}
                        {line.price?.amount && (
                          <span> · {formatPrice(line.price.amount, line.price.currencyCode)} each</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer & Tracking Link */}
              <div className="kissa-order-footer">
                <div>
                  {order.statusPageUrl && (
                    <a
                      href={order.statusPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.85rem",
                        color: "var(--kissa-orange)",
                        textDecoration: "none",
                        fontWeight: 500,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>Track Dispatch on Shopify</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--kissa-brown-light)", display: "block" }}>
                    Total Invoiced
                  </span>
                  <span className="kissa-order-total" style={{ fontSize: "1.25rem" }}>
                    {formatPrice(order.totalPrice?.amount, order.totalPrice?.currencyCode)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
