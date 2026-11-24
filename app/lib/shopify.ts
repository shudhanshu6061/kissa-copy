import {
  handleShopifyRedirects,
  handleShopifyRoutes,
  createCartServerHandlers,
  type CacheInstance,
  type StorefrontClient,
} from "@shopify/hydrogen";
import {
  createCustomerAccountServerHandlers,
  type CustomerAccountClient,
  type WritableCustomerSessionManager,
} from "@shopify/hydrogen/customer-account";

import { routeTemplates } from "./route-templates";
import { createRequestStorefrontClient } from "./storefront";
import {
  createRequestCustomerSession,
  createRequestCustomerAccountClient,
} from "./customer-account.server";
import { createAppSessionManager } from "./session.server";
import type { CustomerContextValue } from "./context";

// Create server handlers for Hydrogen routes and Customer Account API
const cartHandlers = createCartServerHandlers();

export async function handleRequest(
  request: Request,
  env: Env,
  next: (
    request: Request,
    storefrontClient: StorefrontClient | null,
    customerContext: CustomerContextValue | null
  ) => Promise<Response>,
  cache?: CacheInstance,
  waitUntil?: ExecutionContext["waitUntil"]
): Promise<Response> {
  const { customerSession } = createRequestCustomerSession(env);
  const customerAccountHandlers = createCustomerAccountServerHandlers({
    customerSession,
    defaultPostLoginRedirectPathname: "/account",
    loginFailedRedirectPath: "/account?login=failed",
    postLogoutRedirectUri: "/",
  });

  let storefrontClient: StorefrontClient | null = null;
  let requestContext: any = null;
  let sessionManager: WritableCustomerSessionManager | null = null;
  let customerAccount: CustomerAccountClient | null = null;
  let isLoggedIn = false;

  try {
    storefrontClient = createRequestStorefrontClient(
      request,
      env,
      cache,
      waitUntil
    );
    requestContext = storefrontClient.requestContext;
    sessionManager = await createAppSessionManager(request, env);
  } catch (err) {
    console.error("Failed to initialize Storefront or Session:", err);
  }

  if (storefrontClient && requestContext && sessionManager) {
    // 1. handleShopifyRoutes intercepts Hydrogen routes before framework routing:
    // /account/login, /account/authorize, /account/refresh, /account/logout, /.well-known/ucp, /api/cart
    const shopifyResponse = handleShopifyRoutes({
      request,
      requestContext,
      storefrontClient,
      sessionManager,
      routeTemplates,
      handlers: [customerAccountHandlers, cartHandlers],
    });

    if (shopifyResponse) {
      return await shopifyResponse;
    }

    try {
      isLoggedIn = await customerSession.isLoggedIn(
        sessionManager,
        requestContext,
      );
      customerAccount = createRequestCustomerAccountClient(
        requestContext,
        env,
      );
    } catch (caErr) {
      console.error("Error checking customer auth state:", caErr);
    }
  }

  const customerContextValue: CustomerContextValue | null =
    customerAccount && sessionManager
      ? {
          isLoggedIn,
          customerSession,
          sessionManager,
          customerAccount,
        }
      : null;

  // 2. Delegate to React Router framework routing
  let response = await next(
    request,
    storefrontClient as StorefrontClient,
    customerContextValue,
  );

  // 3. Post-routing 404 handler for Shopify redirects (/admin, URL redirects, etc.)
  if (response.status === 404 && storefrontClient) {
    try {
      const redirect = await handleShopifyRedirects({
        request,
        storefrontClient,
        routeTemplates,
      });

      if (redirect) {
        return redirect;
      }
    } catch (redirectErr) {
      console.error("Error in handleShopifyRedirects:", redirectErr);
    }
  }

  response = new Response(response.body, response);

  // Commit session changes to response headers
  if (sessionManager?.commit) {
    try {
      const commitHeaders = await sessionManager.commit();
      if (commitHeaders) {
        const headers = new Headers(commitHeaders);
        for (const [name, value] of headers) {
          response.headers.append(name, value);
        }
      }
    } catch (commitErr) {
      console.error("Error committing session headers:", commitErr);
    }
  }

  // Apply request context response headers (cache-control, personalized state, etc.)
  if (requestContext) {
    try {
      requestContext.applyResponseHeaders(response.headers);
    } catch (headerErr) {
      console.error("Error applying response headers:", headerErr);
    }
  }

  return response;
}
