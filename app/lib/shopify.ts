import {
  handleShopifyRedirects,
  handleShopifyRoutes,
  createCartServerHandlers,
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
  ) => Promise<Response>
): Promise<Response> {
  const { customerSession } = createRequestCustomerSession(env);
  const customerAccountHandlers = createCustomerAccountServerHandlers({
    customerSession,
  });

  let storefrontClient: StorefrontClient | null = null;
  let requestContext: any = null;
  let sessionManager: WritableCustomerSessionManager | null = null;
  let customerAccount: CustomerAccountClient | null = null;
  let isLoggedIn = false;

  try {
    storefrontClient = createRequestStorefrontClient(request, env);
    requestContext = storefrontClient.requestContext;
    sessionManager = await createAppSessionManager(request, env);
  } catch (err) {
    console.error("Failed to initialize Storefront or Session:", err);
  }

  if (storefrontClient && requestContext && sessionManager) {
    try {
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
    } catch (routeErr) {
      console.error("Error in handleShopifyRoutes:", routeErr);
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

  let response = await next(
    request,
    storefrontClient as StorefrontClient,
    customerContextValue,
  );

  // Handle Shopify redirects after 404
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

  // Commit session changes
  if (sessionManager?.commit) {
    try {
      const commitHeaders = await sessionManager.commit();
      if (commitHeaders) {
        const headers = new Headers(commitHeaders);
        headers.forEach((value, name) => {
          response.headers.append(name, value);
        });
      }
    } catch (commitErr) {
      console.error("Error committing session headers:", commitErr);
    }
  }

  if (requestContext) {
    try {
      requestContext.applyResponseHeaders(response.headers);
    } catch (headerErr) {
      console.error("Error applying response headers:", headerErr);
    }
  }

  return response;
}
