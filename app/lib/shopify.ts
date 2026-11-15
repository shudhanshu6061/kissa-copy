import {
    handleShopifyRedirects,
    handleShopifyRoutes,
    type StorefrontClient,
} from "@shopify/hydrogen";

import { routeTemplates } from "./route-templates";
import { createRequestStorefrontClient } from "./storefront";

export async function handleRequest(
    request: Request,
    next: (
        request: Request,
        storefrontClient: StorefrontClient | null
    ) => Promise<Response>
): Promise<Response> {
    let storefrontClient: StorefrontClient | null = null;
    let requestContext: any = null;

    try {
        storefrontClient = createRequestStorefrontClient(request);
        requestContext = storefrontClient.requestContext;
    } catch (err) {
        console.error("Failed to initialize Storefront client:", err);
    }

    if (storefrontClient && requestContext) {
        try {
            // Handle Shopify-owned routes
            const shopifyResponse = handleShopifyRoutes({
                request,
                requestContext,
                storefrontClient,
                routeTemplates,
                handlers: [],
            });

            if (shopifyResponse) {
                return shopifyResponse;
            }
        } catch (routeErr) {
            console.error("Error in handleShopifyRoutes:", routeErr);
        }
    }

    // Continue to React Router
    let response = await next(request, storefrontClient as StorefrontClient);

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

    if (requestContext) {
        try {
            requestContext.applyResponseHeaders(response.headers);
        } catch (headerErr) {
            console.error("Error applying response headers:", headerErr);
        }
    }

    return response;
}
