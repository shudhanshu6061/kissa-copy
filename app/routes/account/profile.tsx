import { Form, useActionData, useNavigation } from "react-router";
import { gql } from "@shopify/hydrogen/customer-account";
import type { Route } from "./+types/profile";
import { storefrontContext } from "../../lib/context";
import { requireCustomerAccount } from "../../lib/customer-account.server";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Member Profile — KISSA Atelier" },
    { name: "description", content: "Manage your KISSA connoisseur profile and contact records." },
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

  const { customerAccount, accessToken } = await requireCustomerAccount(
    request,
    storefront.requestContext
  );

  const { data, errors } = await customerAccount.graphql(CUSTOMER_PROFILE_QUERY, {
    accessToken,
  });

  if (errors && errors.length > 0) {
    console.warn("Customer profile GraphQL errors:", errors);
  }

  return {
    customer: data?.customer ?? null,
  };
}

export async function action({ request, context }: Route.ActionArgs) {
  const storefront = context.get(storefrontContext);
  if (!storefront) {
    throw new Response("Storefront context not initialized", { status: 500 });
  }

  const { customerAccount, accessToken } = await requireCustomerAccount(
    request,
    storefront.requestContext
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
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred while saving profile.",
    };
  }
}

export default function AccountProfile({
  loaderData,
}: Route.ComponentProps) {
  const customer = loaderData?.customer;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div style={{ maxWidth: "680px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 className="kissa-card-title" style={{ fontSize: "2rem", marginBottom: "8px" }}>
          Connoisseur Profile
        </h2>
        <p className="kissa-account-subtitle">
          Your personal identity within the KISSA fragrance ledger.
        </p>
      </div>

      {actionData?.success && (
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
          Your profile details have been preserved at the atelier.
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

      <div className="kissa-card">
        <Form method="post">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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
                placeholder="e.g. Alistair"
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
                placeholder="e.g. Vance"
              />
            </div>
          </div>

          <div className="kissa-form-group">
            <label htmlFor="email" className="kissa-label">
              Email Address (Shopify Verified)
            </label>
            <input
              id="email"
              type="email"
              readOnly
              disabled
              value={customer?.emailAddress?.emailAddress || ""}
              className="kissa-input"
              style={{ background: "rgba(78, 52, 46, 0.04)", cursor: "not-allowed" }}
            />
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--kissa-brown-light)",
                display: "block",
                marginTop: "6px",
              }}
            >
              Your email is anchored to your Shopify Customer Account authentication.
            </span>
          </div>

          <div className="kissa-form-group">
            <label htmlFor="phone" className="kissa-label">
              Contact Phone
            </label>
            <input
              id="phone"
              type="text"
              readOnly
              disabled
              value={customer?.phoneNumber?.phoneNumber || "No phone registered"}
              className="kissa-input"
              style={{ background: "rgba(78, 52, 46, 0.04)", cursor: "not-allowed" }}
            />
          </div>

          <div style={{ marginTop: "28px" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="kissa-btn-primary"
            >
              {isSubmitting ? "Preserving Changes..." : "Save Profile Details"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
