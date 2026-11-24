import { Form, useActionData, useNavigation } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/profile";
import { storefrontContext } from "../../lib/context";
import { envContext } from "../../lib/server-context";
import { requireCustomerAccount } from "../../lib/customer-account.server";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Personal Information | KISSA" },
    { name: "description", content: "View and update your personal account information." },
  ];
};

const CUSTOMER_PROFILE_QUERY = gql(`
  query CustomerProfile {
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
    }
  }
`);

const CUSTOMER_UPDATE_MUTATION = gql(`
  mutation CustomerProfileUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        firstName
        lastName
      }
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

  let customer = null;
  try {
    const { data, errors } = await customerAccount.graphql(CUSTOMER_PROFILE_QUERY, {
      accessToken,
    });

    if (errors && errors.length > 0) {
      console.warn("Customer profile GraphQL errors:", errors);
    }
    customer = data?.customer ?? null;
  } catch (err) {
    console.error("Failed to query customer profile:", err);
  }

  return {
    customer,
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
  const firstName = formData.get("firstName")?.toString()?.trim() || "";
  const lastName = formData.get("lastName")?.toString()?.trim() || "";

  try {
    const { data, errors } = await customerAccount.graphql(
      CUSTOMER_UPDATE_MUTATION,
      {
        accessToken,
        variables: {
          input: {
            firstName,
            lastName,
          },
        },
      }
    );

    if (errors && errors.length > 0) {
      return {
        success: false,
        error: errors[0].message || "Failed to update profile.",
      };
    }

    const userErrors = data?.customerUpdate?.userErrors ?? [];
    if (userErrors.length > 0) {
      return {
        success: false,
        error: userErrors.map((e: any) => e.message).join(", "),
      };
    }

    return {
      success: true,
      error: null,
      message: "Your personal information has been updated successfully.",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred while saving your profile.",
      message: null,
    };
  }
}

export default function AccountProfile({ loaderData }: Route.ComponentProps) {
  const customer = loaderData?.customer;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div style={{ maxWidth: "680px" }}>
      {/* SECTION HEADING */}
      <div className="kissa-section-header">
        <h2 className="kissa-section-title">Personal Information</h2>
        <p className="kissa-section-desc">
          View and update your account information.
        </p>
      </div>

      {/* SUCCESS NOTIFICATION */}
      {actionData?.success && (
        <div className="kissa-alert-success" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{actionData.message || "Your personal information has been updated successfully."}</span>
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

      {/* PROFILE FORM CARD */}
      <div className="kissa-card">
        <Form method="post">
          <div className="kissa-form-grid kissa-form-grid-2">
            <div className="kissa-form-group">
              <label htmlFor="firstName" className="kissa-label">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                defaultValue={customer?.firstName || ""}
                className="kissa-input"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="kissa-form-group">
              <label htmlFor="lastName" className="kissa-label">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                defaultValue={customer?.lastName || ""}
                className="kissa-input"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="kissa-form-group">
            <label htmlFor="email" className="kissa-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              readOnly
              disabled
              value={customer?.emailAddress?.emailAddress || ""}
              className="kissa-input"
            />
            <span className="kissa-input-help">
              Your email is managed by your Shopify Customer Account authentication.
            </span>
          </div>

          <div className="kissa-form-group">
            <label htmlFor="phone" className="kissa-label">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              readOnly
              disabled
              value={customer?.phoneNumber?.phoneNumber || "No phone number added"}
              className="kissa-input"
            />
            <span className="kissa-input-help">
              Phone number provided during checkout or in your delivery addresses.
            </span>
          </div>

          <div style={{ marginTop: "28px" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="kissa-btn-primary"
            >
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
