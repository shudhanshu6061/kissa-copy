import { useState } from "react";
import { Link } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/orders";
import { storefrontContext } from "../../lib/context";
import { envContext } from "../../lib/server-context";
import { requireCustomerAccount } from "../../lib/customer-account.server";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Orders | KISSA" },
    { name: "description", content: "View your previous orders and check the status of your deliveries." },
  ];
};

const CUSTOMER_ORDERS_QUERY = gql(`
  query CustomerOrders {
    customer {
      orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
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
          subtotalPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
          totalShippingPrice {
            amount
            currencyCode
          }
          shippingAddress {
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
          lineItems(first: 20) {
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
  const env = context.get(envContext);

  const { customerAccount, accessToken } = await requireCustomerAccount(
    request,
    storefront.requestContext,
    env
  );

  let orders: any[] = [];
  try {
    const { data, errors } = await customerAccount.graphql(CUSTOMER_ORDERS_QUERY, {
      accessToken,
    });

    if (errors && errors.length > 0) {
      console.warn("Customer orders GraphQL errors:", errors);
    }
    orders = data?.customer?.orders?.nodes ?? [];
  } catch (err) {
    console.error("Failed to query customer orders:", err);
  }

  return {
    orders,
  };
}

export default function AccountOrders({ loaderData }: Route.ComponentProps) {
  const orders = loaderData?.orders ?? [];
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

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
    const sym = currency === "INR" ? "₹" : currency === "USD" ? "$" : currency ? `${currency} ` : "₹";
    return `${sym}${num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getPaymentBadgeClass = (status?: string) => {
    switch (status) {
      case "PAID":
        return "kissa-badge-paid";
      case "REFUNDED":
      case "VOIDED":
        return "kissa-badge-refunded";
      default:
        return "kissa-badge-pending";
    }
  };

  const getFulfillmentBadgeClass = (status?: string) => {
    switch (status) {
      case "FULFILLED":
        return "kissa-badge-fulfilled";
      case "IN_TRANSIT":
        return "kissa-badge-in-transit";
      default:
        return "kissa-badge-unfulfilled";
    }
  };

  const formatBadgeText = (text?: string) => {
    if (!text) return "Pending";
    return text.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div>
      {/* SECTION HEADING */}
      <div className="kissa-section-header">
        <h2 className="kissa-section-title">My Orders</h2>
        <p className="kissa-section-desc">
          View your previous orders and check the status of your deliveries.
        </p>
      </div>

      {orders.length === 0 ? (
        /* EMPTY STATE: NO ORDERS YET */
        <div className="kissa-empty-state">
          <svg
            className="kissa-empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h3 className="kissa-empty-title">No Orders Yet</h3>
          <p className="kissa-empty-desc">
            You haven&apos;t placed any orders yet. Explore our collection and find your favourite fragrance.
          </p>
          <Link to="/shop" className="kissa-btn-primary">
            SHOP NOW
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order: any) => (
            <article key={order.id} className="kissa-order-card">
              <div className="kissa-order-top-bar">
                <div className="kissa-order-info">
                  <span className="kissa-order-id">Order {order.name}</span>
                  <span className="kissa-order-date">
                    Placed on {formatDate(order.processedAt)}
                  </span>
                </div>

                <div className="kissa-order-badges">
                  <span className={`kissa-badge ${getPaymentBadgeClass(order.financialStatus)}`}>
                    Payment: {formatBadgeText(order.financialStatus)}
                  </span>
                  <span className={`kissa-badge ${getFulfillmentBadgeClass(order.fulfillmentStatus)}`}>
                    Fulfillment: {formatBadgeText(order.fulfillmentStatus)}
                  </span>
                </div>
              </div>

              {/* Products Line Items */}
              <div className="kissa-line-items-list">
                {order.lineItems?.nodes?.map((line: any, idx: number) => (
                  <div key={idx} className="kissa-line-item">
                    {line.image?.url ? (
                      <img
                        src={line.image.url}
                        alt={line.image.altText || line.title}
                        className="kissa-line-item-img"
                      />
                    ) : (
                      <div className="kissa-line-item-fallback">KISSA</div>
                    )}
                    <div className="kissa-line-item-details">
                      <h4 className="kissa-line-item-title">{line.title}</h4>
                      <p className="kissa-line-item-meta">
                        Quantity: {line.quantity}
                        {line.price?.amount && (
                          <span> · {formatPrice(line.price.amount, line.price.currencyCode)} each</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer & Action Buttons */}
              <div className="kissa-order-bottom-bar">
                <div className="kissa-order-total-block">
                  <span className="kissa-order-total-label">Total Amount</span>
                  <span className="kissa-order-total-val">
                    {formatPrice(order.totalPrice?.amount, order.totalPrice?.currencyCode)}
                  </span>
                </div>

                <div className="kissa-order-actions">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="kissa-btn-secondary kissa-btn-sm"
                  >
                    View Details
                  </button>

                  {order.statusPageUrl ? (
                    <a
                      href={order.statusPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kissa-btn-primary kissa-btn-sm"
                    >
                      <span>Track Order</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="kissa-btn-primary kissa-btn-sm"
                    >
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div
          className="kissa-modal-backdrop"
          onClick={() => setSelectedOrder(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-order-title"
        >
          <div
            className="kissa-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="kissa-modal-close"
              onClick={() => setSelectedOrder(null)}
              aria-label="Close order details"
            >
              ×
            </button>

            <div style={{ marginBottom: "20px" }}>
              <span className="kissa-stat-label">Order Details</span>
              <h3 id="modal-order-title" className="kissa-section-title" style={{ fontSize: "1.8rem" }}>
                Order {selectedOrder.name}
              </h3>
              <p className="kissa-order-date">
                Placed on {formatDate(selectedOrder.processedAt)}
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              <span className={`kissa-badge ${getPaymentBadgeClass(selectedOrder.financialStatus)}`}>
                Payment: {formatBadgeText(selectedOrder.financialStatus)}
              </span>
              <span className={`kissa-badge ${getFulfillmentBadgeClass(selectedOrder.fulfillmentStatus)}`}>
                Fulfillment: {formatBadgeText(selectedOrder.fulfillmentStatus)}
              </span>
            </div>

            {/* Products List in Modal */}
            <div style={{ marginBottom: "24px", borderTop: "1px solid var(--kissa-border-subtle)", paddingTop: "16px" }}>
              <h4 className="kissa-card-title" style={{ fontSize: "1.2rem", marginBottom: "12px" }}>
                Items Ordered
              </h4>
              <div className="kissa-line-items-list">
                {selectedOrder.lineItems?.nodes?.map((line: any, idx: number) => (
                  <div key={idx} className="kissa-line-item">
                    {line.image?.url ? (
                      <img
                        src={line.image.url}
                        alt={line.image.altText || line.title}
                        className="kissa-line-item-img"
                      />
                    ) : (
                      <div className="kissa-line-item-fallback">KISSA</div>
                    )}
                    <div className="kissa-line-item-details">
                      <h5 className="kissa-line-item-title">{line.title}</h5>
                      <p className="kissa-line-item-meta">
                        Quantity: {line.quantity}
                        {line.price?.amount && (
                          <span> · {formatPrice(line.price.amount, line.price.currencyCode)} each</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div
              style={{
                background: "var(--kissa-card-bg-subtle)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
                fontSize: "0.95rem",
              }}
            >
              {selectedOrder.subtotalPrice?.amount && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--kissa-primary-light)" }}>Subtotal</span>
                  <span>{formatPrice(selectedOrder.subtotalPrice.amount, selectedOrder.subtotalPrice.currencyCode)}</span>
                </div>
              )}

              {selectedOrder.totalShippingPrice?.amount && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--kissa-primary-light)" }}>Shipping</span>
                  <span>{formatPrice(selectedOrder.totalShippingPrice.amount, selectedOrder.totalShippingPrice.currencyCode)}</span>
                </div>
              )}

              {selectedOrder.totalTax?.amount && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--kissa-primary-light)" }}>Tax</span>
                  <span>{formatPrice(selectedOrder.totalTax.amount, selectedOrder.totalTax.currencyCode)}</span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                  borderTop: "1px solid var(--kissa-border-subtle)",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                }}
              >
                <span>Total</span>
                <span>{formatPrice(selectedOrder.totalPrice?.amount, selectedOrder.totalPrice?.currencyCode)}</span>
              </div>
            </div>

            {/* Shipping Address in Modal */}
            {selectedOrder.shippingAddress && (
              <div style={{ marginBottom: "24px" }}>
                <h4 className="kissa-card-title" style={{ fontSize: "1.2rem", marginBottom: "8px" }}>
                  Delivery Address
                </h4>
                <div style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--kissa-primary-light)" }}>
                  <p style={{ margin: 0, fontWeight: 600, color: "var(--kissa-primary)" }}>
                    {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                  </p>
                  <p style={{ margin: 0 }}>{selectedOrder.shippingAddress.address1}</p>
                  {selectedOrder.shippingAddress.address2 && <p style={{ margin: 0 }}>{selectedOrder.shippingAddress.address2}</p>}
                  <p style={{ margin: 0 }}>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.province} {selectedOrder.shippingAddress.zip}
                  </p>
                  <p style={{ margin: 0 }}>{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>
            )}

            {/* Action in Modal */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              {selectedOrder.statusPageUrl && (
                <a
                  href={selectedOrder.statusPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kissa-btn-primary"
                >
                  <span>Track on Shopify</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="kissa-btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
