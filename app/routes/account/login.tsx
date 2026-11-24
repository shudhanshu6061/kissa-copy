import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { getCustomerAuthState } from "../../lib/customer-account.server";
import { MainLayout } from "../../layouts/MainLayout";
import "../../styles/account.css";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Sign In — KISSA Atelier Member Concierge" },
    {
      name: "description",
      content:
        "Access your KISSA botanical fragrance sanctuary, order archives, and bespoke flacon allocations.",
    },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { isLoggedIn } = await getCustomerAuthState(request);
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("return_to") || "/account";

  if (isLoggedIn) {
    throw redirect(returnTo);
  }

  return {
    returnTo,
  };
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const returnTo = loaderData?.returnTo || "/account";
  // Direct full-document URL handled by Hydrogen Customer Account server handlers
  const authUrl = `/account/login?return_to=${encodeURIComponent(returnTo)}`;

  return (
    <MainLayout showAnnouncement={false}>
      <div className="kissa-login-gate">
        <div style={{ marginBottom: "20px" }}>
          <img
            src="/kissa-logo.png"
            alt="KISSA"
            className="kissa-login-logo"
          />
        </div>

        <span className="kissa-account-pretitle">
          Private Sanctuary &amp; Concierge
        </span>

        <h1 className="kissa-account-title" style={{ fontSize: "2.2rem" }}>
          Atelier Member Sign-In
        </h1>

        <p
          className="kissa-account-subtitle"
          style={{ marginBottom: "32px", fontSize: "1.05rem", lineHeight: "1.6" }}
        >
          Enter the sanctuary of wild botanical extracts and living watercolors.
          Authenticate seamlessly with Shopify&apos;s official passwordless customer portal.
        </p>

        {/* Full document link is required by Hydrogen Customer Account OAuth redirects */}
        <div style={{ marginBottom: "24px" }}>
          <a
            href={authUrl}
            className="kissa-btn-primary"
            style={{ width: "100%", padding: "16px 28px" }}
          >
            Authenticate with Shopify
          </a>
        </div>

        <div style={{ borderTop: "1px solid var(--kissa-border)", paddingTop: "20px" }}>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--kissa-brown-light)",
              fontFamily: "Inter, sans-serif",
              margin: "0 0 16px",
            }}
          >
            No password required. A secure one-time code will be dispatched to your email address or Shop account.
          </p>

          <a
            href="/shop"
            className="kissa-btn-secondary"
            style={{ fontSize: "0.8rem", padding: "10px 20px" }}
          >
            Return to Herbarium Shop
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
