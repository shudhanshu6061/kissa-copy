import { redirect } from "react-router";
import {
  createCustomerSession,
  createCustomerAccountClient,
  type CustomerAccountClient,
} from "@shopify/hydrogen/customer-account";
import {
  createShopifyRequestContext,
  type ShopifyRequestContext,
} from "@shopify/hydrogen";
import { createAppSessionManager } from "./session.server";

const shopId =
  process.env.SHOP_ID ||
  "102184911161";

const customerAccountApiClientId =
  process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID ||
  "";

function normalizeCustomerAccountApiUrl(rawUrl?: string, id?: string): string | undefined {
  if (!rawUrl && !id) return undefined;
  if (!rawUrl && id) return `https://shopify.com/authentication/${id}`;
  if (rawUrl) {
    const trimmed = rawUrl.trim().replace(/\/$/, "");
    if (!trimmed.includes("/authentication/")) {
      return trimmed.replace("shopify.com/", "shopify.com/authentication/");
    }
    return trimmed;
  }
  return undefined;
}

const customerAccountApiUrl = normalizeCustomerAccountApiUrl(
  process.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
  shopId
);

// Official singleton CustomerSession instance configured with Shopify Store details
export const customerSession = createCustomerSession({
  shopId,
  customerAccountApiClientId,
  customerAccountApiUrl,
});

/**
 * Creates a Customer Account GraphQL client bound to the current request context.
 */
export function createRequestCustomerAccountClient(
  requestContext: ShopifyRequestContext
): CustomerAccountClient {
  return createCustomerAccountClient({
    shopId,
    requestContext,
  });
}

/**
 * Validates authentication on protected routes.
 * Redirects to /account/login if unauthenticated.
 * Redirects to /account/refresh if access token requires a refresh.
 */
export async function requireCustomerAccount(
  request: Request,
  requestContext: ShopifyRequestContext
) {
  const sessionManager = await createAppSessionManager(request);
  const loggedIn = await customerSession.isLoggedIn(sessionManager, requestContext);
  const url = new URL(request.url);
  const returnTo = url.pathname + url.search;

  if (!loggedIn) {
    throw redirect(`/account/login?return_to=${encodeURIComponent(returnTo)}`);
  }

  const accessToken = await customerSession.getAccessToken(sessionManager, requestContext);

  if (!accessToken) {
    // If we already refreshed once and still have no token, break potential loop
    if (url.searchParams.get("refreshed") === "1") {
      throw redirect(`/account/login?return_to=${encodeURIComponent(url.pathname)}`);
    }

    const refreshTarget = `/account/refresh?return_to=${encodeURIComponent(
      `${url.pathname}?refreshed=1`
    )}`;
    throw redirect(refreshTarget);
  }

  const customerAccount = createRequestCustomerAccountClient(requestContext);

  return {
    sessionManager,
    accessToken,
    customerAccount,
  };
}

/**
 * Safe read-only auth inspector for public layouts & navbar.
 */
export async function getCustomerAuthState(
  request: Request,
  requestContext?: ShopifyRequestContext
) {
  try {
    const sessionManager = await createAppSessionManager(request);
    const reqCtx =
      requestContext ||
      createShopifyRequestContext({
        request,
        i18n: { country: "IN", language: "EN" },
      });
    const isLoggedIn = await customerSession.isLoggedIn(sessionManager, reqCtx);
    return {
      isLoggedIn,
      sessionManager,
    };
  } catch (err) {
    console.error("Failed to read customer auth state:", err);
    return {
      isLoggedIn: false,
      sessionManager: null,
    };
  }
}
