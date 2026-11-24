import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/addresses";
import { storefrontContext } from "../../lib/context";
import { envContext } from "../../lib/server-context";
import { requireCustomerAccount } from "../../lib/customer-account.server";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Saved Sanctuaries — KISSA Atelier" },
    { name: "description", content: "Manage your delivery sanctuaries and address destinations." },
  ];
};

const CUSTOMER_ADDRESSES_QUERY = gql(`
  query CustomerAddresses {
    customer {
      defaultAddress {
        id
      }
      addresses(first: 20) {
        nodes {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          zip
          country
          phone
          formatted
        }
      }
    }
  }
`);

const CREATE_ADDRESS_MUTATION = gql(`
  mutation CreateAddress($address: CustomerAddressInput!, $defaultAddress: Boolean) {
    customerAddressCreate(address: $address, defaultAddress: $defaultAddress) {
      customerAddress {
        id
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`);

const UPDATE_ADDRESS_MUTATION = gql(`
  mutation UpdateAddress($addressId: ID!, $address: CustomerAddressInput!, $defaultAddress: Boolean) {
    customerAddressUpdate(addressId: $addressId, address: $address, defaultAddress: $defaultAddress) {
      customerAddress {
        id
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`);

const DELETE_ADDRESS_MUTATION = gql(`
  mutation DeleteAddress($addressId: ID!) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        field
        message
        code
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

  let defaultAddressId = null;
  let addresses: any[] = [];
  try {
    const { data, errors } = await customerAccount.graphql(CUSTOMER_ADDRESSES_QUERY, {
      accessToken,
    });

    if (errors && errors.length > 0) {
      console.warn("Customer addresses GraphQL errors:", errors);
    }
    defaultAddressId = data?.customer?.defaultAddress?.id ?? null;
    addresses = data?.customer?.addresses?.nodes ?? [];
  } catch (err) {
    console.error("Failed to query customer addresses:", err);
  }

  return {
    defaultAddressId,
    addresses,
  };
}

export async function action({ request, context }: Route.ActionArgs) {
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

  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();

  try {
    if (intent === "delete") {
      const addressId = formData.get("addressId")?.toString() || "";
      const { data, errors } = await customerAccount.graphql(DELETE_ADDRESS_MUTATION, {
        accessToken,
        variables: { addressId },
      });

      if (errors && errors.length > 0) {
        return { success: false, error: errors[0].message };
      }
      const userErrors = data?.customerAddressDelete?.userErrors ?? [];
      if (userErrors.length > 0) {
        return { success: false, error: userErrors.map((e: any) => e.message).join(", ") };
      }
      return { success: true, message: "Sanctuary address removed." };
    }

    if (intent === "setDefault") {
      const addressId = formData.get("addressId")?.toString() || "";
      const { data, errors } = await customerAccount.graphql(UPDATE_ADDRESS_MUTATION, {
        accessToken,
        variables: {
          addressId,
          address: {},
          defaultAddress: true,
        },
      });

      if (errors && errors.length > 0) {
        return { success: false, error: errors[0].message };
      }
      const userErrors = data?.customerAddressUpdate?.userErrors ?? [];
      if (userErrors.length > 0) {
        return { success: false, error: userErrors.map((e: any) => e.message).join(", ") };
      }
      return { success: true, message: "Default sanctuary destination updated." };
    }

    if (intent === "create") {
      const addressInput = {
        firstName: formData.get("firstName")?.toString() || "",
        lastName: formData.get("lastName")?.toString() || "",
        address1: formData.get("address1")?.toString() || "",
        address2: formData.get("address2")?.toString() || "",
        city: formData.get("city")?.toString() || "",
        province: formData.get("province")?.toString() || "",
        zip: formData.get("zip")?.toString() || "",
        country: formData.get("country")?.toString() || "India",
        phone: formData.get("phone")?.toString() || "",
      };
      const defaultAddress = formData.get("defaultAddress") === "on";

      const { data, errors } = await customerAccount.graphql(CREATE_ADDRESS_MUTATION, {
        accessToken,
        variables: {
          address: addressInput,
          defaultAddress,
        },
      });

      if (errors && errors.length > 0) {
        return { success: false, error: errors[0].message };
      }
      const userErrors = data?.customerAddressCreate?.userErrors ?? [];
      if (userErrors.length > 0) {
        return { success: false, error: userErrors.map((e: any) => e.message).join(", ") };
      }
      return { success: true, message: "New sanctuary address inscribed successfully." };
    }

    return { success: false, error: "Invalid action intent." };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An error occurred while managing addresses.",
    };
  }
}

export default function AccountAddresses({
  loaderData,
}: Route.ComponentProps) {
  const addresses = loaderData?.addresses ?? [];
  const defaultAddressId = loaderData?.defaultAddressId;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 className="kissa-card-title" style={{ fontSize: "2rem", marginBottom: "8px" }}>
            Sanctuary Addresses
          </h2>
          <p className="kissa-account-subtitle">
            Private residential and studio destinations for flacon deliveries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className={isAdding ? "kissa-btn-secondary" : "kissa-btn-primary"}
        >
          {isAdding ? "Cancel Form" : "+ Add New Sanctuary"}
        </button>
      </div>

      {actionData?.message && (
        <div
          style={{
            background: "rgba(46, 125, 50, 0.1)",
            border: "1px solid #2e7d32",
            color: "#2e7d32",
            padding: "14px 18px",
            borderRadius: "8px",
            marginBottom: "24px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
          }}
        >
          {actionData.message}
        </div>
      )}

      {actionData?.error && (
        <div
          style={{
            background: "rgba(198, 40, 40, 0.1)",
            border: "1px solid #c62828",
            color: "#c62828",
            padding: "14px 18px",
            borderRadius: "8px",
            marginBottom: "24px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
          }}
        >
          {actionData.error}
        </div>
      )}

      {/* Add Address Form Drawer/Card */}
      {isAdding && (
        <div className="kissa-card" style={{ marginBottom: "36px" }}>
          <h3 className="kissa-card-title" style={{ fontSize: "1.4rem" }}>
            Inscribe New Sanctuary Destination
          </h3>
          <Form
            method="post"
            onSubmit={() => {
              // Wait for submission
            }}
          >
            <input type="hidden" name="intent" value="create" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="kissa-form-group">
                <label className="kissa-label">First Name</label>
                <input name="firstName" required className="kissa-input" placeholder="e.g. Alistair" />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">Last Name</label>
                <input name="lastName" required className="kissa-input" placeholder="e.g. Vance" />
              </div>
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Address Line 1</label>
              <input name="address1" required className="kissa-input" placeholder="Suite, Villa, or Street address" />
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Address Line 2 (Optional)</label>
              <input name="address2" className="kissa-input" placeholder="Apartment, Studio, or Landmark" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px" }}>
              <div className="kissa-form-group">
                <label className="kissa-label">City</label>
                <input name="city" required className="kissa-input" placeholder="e.g. Mumbai" />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">State / Province</label>
                <input name="province" required className="kissa-input" placeholder="e.g. Maharashtra" />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">Postal / Zip Code</label>
                <input name="zip" required className="kissa-input" placeholder="e.g. 400001" />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">Country</label>
                <input name="country" defaultValue="India" required className="kissa-input" />
              </div>
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Delivery Contact Phone</label>
              <input name="phone" type="tel" className="kissa-input" placeholder="+91 98765 43210" />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}>
                <input type="checkbox" name="defaultAddress" />
                <span>Set as primary delivery sanctuary</span>
              </label>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={isSubmitting} className="kissa-btn-primary">
                {isSubmitting ? "Preserving..." : "Save Sanctuary"}
              </button>
              <button type="button" onClick={() => setIsAdding(false)} className="kissa-btn-secondary">
                Cancel
              </button>
            </div>
          </Form>
        </div>
      )}

      {/* Address Cards Grid */}
      {addresses.length === 0 ? (
        <div className="kissa-empty-state">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--kissa-brown-light)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 auto 12px" }}
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h3 className="kissa-empty-title">No destinations recorded</h3>
          <p className="kissa-empty-desc">
            You have not registered any delivery sanctuaries. Add your private address coordinates to expedite future flacon reservations.
          </p>
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="kissa-btn-primary"
          >
            Inscribe First Sanctuary
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {addresses.map((addr: any) => {
            const isDefault = addr.id === defaultAddressId;
            return (
              <div
                key={addr.id}
                className="kissa-card"
                style={{
                  position: "relative",
                  borderColor: isDefault ? "var(--kissa-orange)" : "var(--kissa-border)",
                }}
              >
                {isDefault && (
                  <span
                    className="kissa-badge"
                    style={{
                      background: "var(--kissa-orange)",
                      color: "#ffffff",
                      marginBottom: "12px",
                    }}
                  >
                    Primary Sanctuary
                  </span>
                )}

                <h3 className="kissa-card-title" style={{ fontSize: "1.25rem", margin: "4px 0 8px" }}>
                  {addr.firstName} {addr.lastName}
                </h3>

                <div
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "var(--kissa-brown-light)",
                    marginBottom: "20px",
                  }}
                >
                  <div>{addr.address1}</div>
                  {addr.address2 && <div>{addr.address2}</div>}
                  <div>
                    {addr.city}, {addr.province} {addr.zip}
                  </div>
                  <div>{addr.country}</div>
                  {addr.phone && <div style={{ marginTop: "6px" }}>Tel: {addr.phone}</div>}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--kissa-border-subtle)",
                  }}
                >
                  {!isDefault && (
                    <Form method="post">
                      <input type="hidden" name="intent" value="setDefault" />
                      <input type="hidden" name="addressId" value={addr.id} />
                      <button
                        type="submit"
                        className="kissa-btn-secondary"
                        style={{ fontSize: "0.75rem", padding: "6px 14px" }}
                      >
                        Set as Default
                      </button>
                    </Form>
                  )}

                  <Form method="post" onSubmit={(e) => {
                    if (!confirm("Are you sure you wish to remove this sanctuary address?")) {
                      e.preventDefault();
                    }
                  }}>
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="addressId" value={addr.id} />
                    <button
                      type="submit"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--kissa-brown-light)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Remove
                    </button>
                  </Form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
