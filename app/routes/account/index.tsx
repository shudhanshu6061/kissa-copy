import { Link } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/index";
import { storefrontContext } from "../../lib/context";
import { envContext } from "../../lib/server-context";
import {
  createRequestCustomerSession,
  createRequestCustomerAccountClient,
} from "../../lib/customer-account.server";
import { createAppSessionManager } from "../../lib/session.server";
import { useWishlist } from "../../lib/wishlist";
import { useCart } from "../../context/CartContext";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Account Overview | KISSA" },
    { name: "description", content: "View your account overview, recent orders, and personal details." },
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
        phone
      }
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
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
          lineItems(first: 5) {
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
  const env = context.get(envContext);

  const { customerSession } = createRequestCustomerSession(env);
  const sessionManager = await createAppSessionManager(request, env);
  const loggedIn = await customerSession.isLoggedIn(
    sessionManager,
    storefront.requestContext
  );

  if (!loggedIn) {
    return {
      customer: null,
    };
  }

  const accessToken = await customerSession.getAccessToken(
    sessionManager,
    storefront.requestContext
  );

  if (!accessToken) {
    return {
      customer: null,
    };
  }

  let customer = null;
  try {
    const customerAccount = createRequestCustomerAccountClient(
      storefront.requestContext,
      env
    );
    const { data, errors } = await customerAccount.graphql(CUSTOMER_OVERVIEW_QUERY, {
      accessToken,
    });

    if (errors && errors.length > 0) {
      console.warn("Customer overview GraphQL errors:", errors);
    }
    customer = data?.customer ?? null;
  } catch (err) {
    console.error("Failed to query customer overview:", err);
  }

  return {
    customer,
  };
}

export default function AccountOverview({ loaderData }: Route.ComponentProps) {
  const customer = loaderData?.customer;
  const orders = customer?.orders?.nodes ?? [];
  const recentOrder = orders.length > 0 ? orders[0] : null;
  const defaultAddress = customer?.defaultAddress;
  const { wishlist, count: wishlistCount } = useWishlist();
  const { addToCart } = useCart();

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
        <h2 className="kissa-section-title">Account Overview</h2>
        <p className="kissa-section-desc">
          A summary of your recent activity, order status, and saved preferences.
        </p>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="kissa-stats-grid">
        {/* TOTAL ORDERS CARD */}
        <div className="kissa-stat-card">
          <span className="kissa-stat-label">Total Orders</span>
          <div className="kissa-stat-value">{orders.length}</div>
          <Link to="/account/orders" className="kissa-stat-link">
            <span>View all orders</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* WISHLIST STAT CARD */}
        <div className="kissa-stat-card">
          <span className="kissa-stat-label">Wishlist</span>
          <div className="kissa-stat-value">{wishlistCount}</div>
          <Link to="/account/wishlist" className="kissa-stat-link">
            <span>{wishlistCount > 0 ? "View your saved items" : "Explore products"}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ACCOUNT DETAILS STAT CARD */}
        <div className="kissa-stat-card">
          <span className="kissa-stat-label">Account Details</span>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--kissa-primary)",
              marginBottom: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {customer?.firstName
              ? `${customer.firstName} ${customer?.lastName || ""}`.trim()
              : customer?.displayName || "Account Member"}
          </div>
          <Link to="/account/profile" className="kissa-stat-link">
            <span>Edit profile</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* DEFAULT ADDRESS STAT CARD */}
        <div className="kissa-stat-card">
          <span className="kissa-stat-label">Delivery Address</span>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              fontWeight: 500,
              color: "var(--kissa-primary)",
              marginBottom: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {defaultAddress?.city ? `${defaultAddress.city}, ${defaultAddress.country}` : "No default address"}
          </div>
          <Link to="/account/addresses" className="kissa-stat-link">
            <span>Manage addresses</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* RECENT ORDER SECTION */}
      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "16px",
          }}
        >
          <h3 className="kissa-card-title">Recent Order</h3>
          {orders.length > 0 && (
            <Link
              to="/account/orders"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--kissa-accent)",
                textDecoration: "none",
              }}
            >
              View all orders ({orders.length}) →
            </Link>
          )}
        </div>

        {recentOrder ? (
          <div className="kissa-order-card">
            <div className="kissa-order-top-bar">
              <div className="kissa-order-info">
                <span className="kissa-order-id">Order {recentOrder.name}</span>
                <span className="kissa-order-date">
                  Placed on {formatDate(recentOrder.processedAt)}
                </span>
              </div>

              <div className="kissa-order-badges">
                <span className={`kissa-badge ${getPaymentBadgeClass(recentOrder.financialStatus)}`}>
                  {formatBadgeText(recentOrder.financialStatus)}
                </span>
                <span className={`kissa-badge ${getFulfillmentBadgeClass(recentOrder.fulfillmentStatus)}`}>
                  {formatBadgeText(recentOrder.fulfillmentStatus)}
                </span>
              </div>
            </div>

            {/* Products List */}
            <div className="kissa-line-items-list">
              {recentOrder.lineItems?.nodes?.map((line: any, idx: number) => (
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
                    <p className="kissa-line-item-meta">Quantity: {line.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Bottom Bar with Total and Action Buttons */}
            <div className="kissa-order-bottom-bar">
              <div className="kissa-order-total-block">
                <span className="kissa-order-total-label">Total Amount</span>
                <span className="kissa-order-total-val">
                  {formatPrice(recentOrder.totalPrice?.amount, recentOrder.totalPrice?.currencyCode)}
                </span>
              </div>

              <div className="kissa-order-actions">
                <Link
                  to="/account/orders"
                  className="kissa-btn-secondary kissa-btn-sm"
                >
                  View Details
                </Link>

                {recentOrder.statusPageUrl ? (
                  <a
                    href={recentOrder.statusPageUrl}
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
                  <Link
                    to="/account/orders"
                    className="kissa-btn-primary kissa-btn-sm"
                  >
                    Track Order
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
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
            <h4 className="kissa-empty-title">No Orders Yet</h4>
            <p className="kissa-empty-desc">
              You haven&apos;t placed any orders yet. Explore our collection and find your favourite fragrance.
            </p>
            <Link to="/shop" className="kissa-btn-primary">
              SHOP NOW
            </Link>
          </div>
        )}
      </section>

      {/* WISHLIST SECTION */}
      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "16px",
          }}
        >
          <h3 className="kissa-card-title">Wishlist</h3>
          {wishlist.length > 0 && (
            <Link
              to="/account/wishlist"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--kissa-accent)",
                textDecoration: "none",
              }}
            >
              View all ({wishlist.length}) →
            </Link>
          )}
        </div>

        {wishlist.length > 0 ? (
          <div className="kissa-wishlist-grid">
            {wishlist.slice(0, 3).map((item) => (
              <div key={item.id} className="kissa-wishlist-card">
                <div className="kissa-wishlist-img-wrap">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="kissa-wishlist-img"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.8rem",
                        color: "var(--kissa-primary-light)",
                      }}
                    >
                      KISSA
                    </div>
                  )}
                </div>

                <div className="kissa-wishlist-content">
                  <h4 className="kissa-wishlist-title">{item.title}</h4>
                  <div className="kissa-wishlist-price">
                    {typeof item.price === "number"
                      ? `₹${item.price.toLocaleString("en-IN")}`
                      : item.price}
                  </div>

                  <div className="kissa-wishlist-actions">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart({
                          title: item.title,
                          price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
                          img: item.image || "",
                          size: item.size || "50ml",
                        });
                      }}
                      className="kissa-btn-primary kissa-btn-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE: EMPTY WISHLIST */
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
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <h4 className="kissa-empty-title">Empty Wishlist</h4>
            <p className="kissa-empty-desc">
              You haven&apos;t saved any products yet. Browse our collection and save products you&apos;d like to purchase later.
            </p>
            <Link to="/shop" className="kissa-btn-primary">
              EXPLORE PRODUCTS
            </Link>
          </div>
        )}
      </section>

      {/* ACCOUNT DETAILS SECTION */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "16px",
          }}
        >
          <h3 className="kissa-card-title">Account Details</h3>
          <Link
            to="/account/profile"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "var(--kissa-accent)",
              textDecoration: "none",
            }}
          >
            Edit profile →
          </Link>
        </div>

        <div className="kissa-card">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            <div>
              <span className="kissa-label">Full Name</span>
              <p style={{ margin: "0 0 16px", fontSize: "1.1rem", color: "var(--kissa-primary)" }}>
                {customer?.firstName
                  ? `${customer.firstName} ${customer?.lastName || ""}`.trim()
                  : "Not provided"}
              </p>

              <span className="kissa-label">Email Address</span>
              <p style={{ margin: "0 0 16px", fontSize: "1.05rem", color: "var(--kissa-primary)" }}>
                {customer?.emailAddress?.emailAddress || "Not provided"}
              </p>

              <span className="kissa-label">Phone Number</span>
              <p style={{ margin: 0, fontSize: "1.05rem", color: "var(--kissa-primary)" }}>
                {customer?.phoneNumber?.phoneNumber || "No phone number added"}
              </p>
            </div>

            <div>
              <span className="kissa-label">Default Shipping Address</span>
              {defaultAddress ? (
                <div style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--kissa-primary-light)", marginBottom: "16px" }}>
                  <p style={{ margin: 0, fontWeight: 600, color: "var(--kissa-primary)" }}>
                    {defaultAddress.firstName} {defaultAddress.lastName}
                  </p>
                  <p style={{ margin: 0 }}>{defaultAddress.address1}</p>
                  {defaultAddress.address2 && <p style={{ margin: 0 }}>{defaultAddress.address2}</p>}
                  <p style={{ margin: 0 }}>
                    {defaultAddress.city}, {defaultAddress.province} {defaultAddress.zip}
                  </p>
                  <p style={{ margin: 0 }}>{defaultAddress.country}</p>
                  {defaultAddress.phone && <p style={{ margin: "4px 0 0" }}>Tel: {defaultAddress.phone}</p>}
                </div>
              ) : (
                <p style={{ margin: "0 0 16px", fontSize: "1rem", color: "var(--kissa-primary-light)" }}>
                  You have not set a default shipping address yet.
                </p>
              )}

              <Link
                to="/account/addresses"
                className="kissa-btn-secondary kissa-btn-sm"
              >
                Manage Addresses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
