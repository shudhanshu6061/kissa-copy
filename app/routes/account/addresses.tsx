import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/addresses";
import { storefrontContext } from "../../lib/context";
import { envContext } from "../../lib/server-context";
import { requireCustomerAccount } from "../../lib/customer-account.server";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Addresses | KISSA" },
    { name: "description", content: "Manage your delivery addresses for faster checkout." },
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
      return { success: true, message: "Address deleted successfully." };
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
      return { success: true, message: "Default address updated successfully." };
    }

    if (intent === "create") {
      const addressInput = {
        firstName: formData.get("firstName")?.toString() || "",
        lastName: formData.get("lastName")?.toString() || "",
        company: formData.get("company")?.toString() || "",
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
      return { success: true, message: "New address added successfully." };
    }

    if (intent === "update") {
      const addressId = formData.get("addressId")?.toString() || "";
      const addressInput = {
        firstName: formData.get("firstName")?.toString() || "",
        lastName: formData.get("lastName")?.toString() || "",
        company: formData.get("company")?.toString() || "",
        address1: formData.get("address1")?.toString() || "",
        address2: formData.get("address2")?.toString() || "",
        city: formData.get("city")?.toString() || "",
        province: formData.get("province")?.toString() || "",
        zip: formData.get("zip")?.toString() || "",
        country: formData.get("country")?.toString() || "India",
        phone: formData.get("phone")?.toString() || "",
      };
      const defaultAddress = formData.get("defaultAddress") === "on";

      const { data, errors } = await customerAccount.graphql(UPDATE_ADDRESS_MUTATION, {
        accessToken,
        variables: {
          addressId,
          address: addressInput,
          defaultAddress,
        },
      });

      if (errors && errors.length > 0) {
        return { success: false, error: errors[0].message };
      }
      const userErrors = data?.customerAddressUpdate?.userErrors ?? [];
      if (userErrors.length > 0) {
        return { success: false, error: userErrors.map((e: any) => e.message).join(", ") };
      }
      return { success: true, message: "Address updated successfully." };
    }

    return { success: false, error: "Invalid action intent." };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An error occurred while managing addresses.",
    };
  }
}

export default function AccountAddresses({ loaderData }: Route.ComponentProps) {
  const addresses = loaderData?.addresses ?? [];
  const defaultAddressId = loaderData?.defaultAddressId;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);

  return (
    <div>
      {/* SECTION HEADING */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 className="kissa-section-title">My Addresses</h2>
          <p className="kissa-section-desc">
            Manage your delivery addresses for faster checkout.
          </p>
        </div>

        {!isAdding && !editingAddress && (
          <button
            type="button"
            onClick={() => {
              setIsAdding(true);
              setEditingAddress(null);
            }}
            className="kissa-btn-primary"
          >
            + Add New Address
          </button>
        )}
      </div>

      {/* SUCCESS NOTIFICATION */}
      {actionData?.success && (
        <div className="kissa-alert-success" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{actionData.message}</span>
        </div>
      )}

      {/* ERROR NOTIFICATION */}
      {actionData?.error && (
        <div className="kissa-alert-error" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{actionData.error}</span>
        </div>
      )}

      {/* ADD ADDRESS FORM */}
      {isAdding && (
        <div className="kissa-card" style={{ marginBottom: "36px" }}>
          <div className="kissa-card-header">
            <h3 className="kissa-card-title">Add New Address</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="kissa-btn-secondary kissa-btn-sm"
            >
              Cancel
            </button>
          </div>

          <Form
            method="post"
            onSubmit={() => {
              setIsAdding(false);
            }}
          >
            <input type="hidden" name="intent" value="create" />

            <div className="kissa-form-grid kissa-form-grid-2">
              <div className="kissa-form-group">
                <label className="kissa-label">First Name</label>
                <input name="firstName" required className="kissa-input" placeholder="e.g. John" />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">Last Name</label>
                <input name="lastName" required className="kissa-input" placeholder="e.g. Smith" />
              </div>
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Company (Optional)</label>
              <input name="company" className="kissa-input" placeholder="Company or apartment name" />
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Address Line 1</label>
              <input name="address1" required className="kissa-input" placeholder="Street address or P.O. Box" />
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Address Line 2 (Optional)</label>
              <input name="address2" className="kissa-input" placeholder="Apartment, suite, unit, building, floor" />
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
              <label className="kissa-label">Phone Number</label>
              <input name="phone" type="tel" className="kissa-input" placeholder="Contact number for delivery" />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}>
                <input type="checkbox" name="defaultAddress" />
                <span>Set as default delivery address</span>
              </label>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={isSubmitting} className="kissa-btn-primary">
                {isSubmitting ? "Saving..." : "Save Address"}
              </button>
              <button type="button" onClick={() => setIsAdding(false)} className="kissa-btn-secondary">
                Cancel
              </button>
            </div>
          </Form>
        </div>
      )}

      {/* EDIT ADDRESS FORM */}
      {editingAddress && (
        <div className="kissa-card" style={{ marginBottom: "36px" }}>
          <div className="kissa-card-header">
            <h3 className="kissa-card-title">Edit Address</h3>
            <button
              type="button"
              onClick={() => setEditingAddress(null)}
              className="kissa-btn-secondary kissa-btn-sm"
            >
              Cancel
            </button>
          </div>

          <Form
            method="post"
            onSubmit={() => {
              setEditingAddress(null);
            }}
          >
            <input type="hidden" name="intent" value="update" />
            <input type="hidden" name="addressId" value={editingAddress.id} />

            <div className="kissa-form-grid kissa-form-grid-2">
              <div className="kissa-form-group">
                <label className="kissa-label">First Name</label>
                <input
                  name="firstName"
                  defaultValue={editingAddress.firstName || ""}
                  required
                  className="kissa-input"
                />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">Last Name</label>
                <input
                  name="lastName"
                  defaultValue={editingAddress.lastName || ""}
                  required
                  className="kissa-input"
                />
              </div>
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Company (Optional)</label>
              <input
                name="company"
                defaultValue={editingAddress.company || ""}
                className="kissa-input"
              />
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Address Line 1</label>
              <input
                name="address1"
                defaultValue={editingAddress.address1 || ""}
                required
                className="kissa-input"
              />
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Address Line 2 (Optional)</label>
              <input
                name="address2"
                defaultValue={editingAddress.address2 || ""}
                className="kissa-input"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px" }}>
              <div className="kissa-form-group">
                <label className="kissa-label">City</label>
                <input
                  name="city"
                  defaultValue={editingAddress.city || ""}
                  required
                  className="kissa-input"
                />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">State / Province</label>
                <input
                  name="province"
                  defaultValue={editingAddress.province || ""}
                  required
                  className="kissa-input"
                />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">Postal / Zip Code</label>
                <input
                  name="zip"
                  defaultValue={editingAddress.zip || ""}
                  required
                  className="kissa-input"
                />
              </div>
              <div className="kissa-form-group">
                <label className="kissa-label">Country</label>
                <input
                  name="country"
                  defaultValue={editingAddress.country || "India"}
                  required
                  className="kissa-input"
                />
              </div>
            </div>

            <div className="kissa-form-group">
              <label className="kissa-label">Phone Number</label>
              <input
                name="phone"
                type="tel"
                defaultValue={editingAddress.phone || ""}
                className="kissa-input"
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}>
                <input
                  type="checkbox"
                  name="defaultAddress"
                  defaultChecked={editingAddress.id === defaultAddressId}
                />
                <span>Set as default delivery address</span>
              </label>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={isSubmitting} className="kissa-btn-primary">
                {isSubmitting ? "Updating..." : "Update Address"}
              </button>
              <button type="button" onClick={() => setEditingAddress(null)} className="kissa-btn-secondary">
                Cancel
              </button>
            </div>
          </Form>
        </div>
      )}

      {/* ADDRESS CARDS LIST */}
      {addresses.length === 0 ? (
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
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h3 className="kissa-empty-title">No Saved Addresses</h3>
          <p className="kissa-empty-desc">
            You don&apos;t have any saved addresses yet. Add your delivery address for faster checkout.
          </p>
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="kissa-btn-primary"
          >
            + Add New Address
          </button>
        </div>
      ) : (
        <div className="kissa-address-grid">
          {addresses.map((addr: any) => {
            const isDefault = addr.id === defaultAddressId;
            return (
              <div
                key={addr.id}
                className={`kissa-address-card ${isDefault ? "is-default" : ""}`}
              >
                {isDefault && (
                  <div style={{ marginBottom: "12px" }}>
                    <span className="kissa-badge kissa-badge-default">
                      Default Address
                    </span>
                  </div>
                )}

                <h3 className="kissa-address-name">
                  {addr.firstName} {addr.lastName}
                </h3>

                <div className="kissa-address-lines">
                  {addr.company && <div>{addr.company}</div>}
                  <div>{addr.address1}</div>
                  {addr.address2 && <div>{addr.address2}</div>}
                  <div>
                    {addr.city}, {addr.province} {addr.zip}
                  </div>
                  <div>{addr.country}</div>
                  {addr.phone && <div style={{ marginTop: "4px" }}>Tel: {addr.phone}</div>}
                </div>

                <div className="kissa-address-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAddress(addr);
                      setIsAdding(false);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className="kissa-btn-secondary kissa-btn-sm"
                  >
                    Edit
                  </button>

                  {!isDefault && (
                    <Form method="post">
                      <input type="hidden" name="intent" value="setDefault" />
                      <input type="hidden" name="addressId" value={addr.id} />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="kissa-btn-secondary kissa-btn-sm"
                      >
                        Set as Default
                      </button>
                    </Form>
                  )}

                  <Form
                    method="post"
                    onSubmit={(e) => {
                      if (!confirm("Are you sure you want to delete this address?")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="addressId" value={addr.id} />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="kissa-btn-danger-outline"
                    >
                      Delete
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
