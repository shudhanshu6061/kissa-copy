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

/**
 * Creates a CustomerSession for the given env bindings.
 * Called per-request so it uses the correct env values from Oxygen.
 */
export function createRequestCustomerSession(env?: Partial<Env>) {
  const shopId = env?.SHOP_ID || "102184911161";
  const customerAccountApiClientId =
    env?.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID || "16c98fcb-0b9b-4f14-b7fa-6170b59a71f0";

  function normalizeCustomerAccountApiUrl(
    rawUrl?: string,
    id?: string,
  ): string | undefined {
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
    env?.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
    shopId,
  );

  const customerSession = createCustomerSession({
    shopId,
    customerAccountApiClientId,
    customerAccountApiUrl,
  });

  return { customerSession, shopId };
}

/**
 * Creates a Customer Account GraphQL client bound to the current request context.
 */
export function createRequestCustomerAccountClient(
  requestContext: ShopifyRequestContext,
  env?: Partial<Env>,
): CustomerAccountClient {
  const shopId = env?.SHOP_ID || "102184911161";
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
  requestContext: ShopifyRequestContext,
  env?: Env,
) {
  const { customerSession } = createRequestCustomerSession(env);
  const sessionManager = await createAppSessionManager(request, env);
  const loggedIn = await customerSession.isLoggedIn(
    sessionManager,
    requestContext,
  );
  const url = new URL(request.url);
  const returnTo = url.pathname + url.search;

  if (!loggedIn) {
    throw redirect(`/account/login?return_to=${encodeURIComponent(returnTo)}`);
  }

  const accessToken = await customerSession.getAccessToken(
    sessionManager,
    requestContext,
  );

  if (!accessToken) {
    if (url.searchParams.get("refreshed") === "1") {
      throw redirect(
        `/account/login?return_to=${encodeURIComponent(url.pathname)}`,
      );
    }

    const refreshTarget = `/account/refresh?return_to=${encodeURIComponent(
      `${url.pathname}?refreshed=1`,
    )}`;
    throw redirect(refreshTarget);
  }

  const customerAccount = createRequestCustomerAccountClient(
    requestContext,
    env,
  );

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
  env?: Env,
  requestContext?: ShopifyRequestContext,
) {
  try {
    const { customerSession } = createRequestCustomerSession(env);
    const sessionManager = await createAppSessionManager(request, env);
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
      customerSession,
    };
  } catch (err) {
    console.error("Failed to read customer auth state:", err);
    return {
      isLoggedIn: false,
      sessionManager: null,
      customerSession: null,
    };
  }
}
