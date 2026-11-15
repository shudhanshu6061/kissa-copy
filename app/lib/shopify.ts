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
        storefrontClient: StorefrontClient
    ) => Promise<Response>
): Promise<Response> {

    const storefrontClient = createRequestStorefrontClient(request);

    const { requestContext } = storefrontClient;

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

    // Continue to React Router
    let response = await next(request, storefrontClient);

    // Handle Shopify redirects after 404
    if (response.status === 404) {
        const redirect = await handleShopifyRedirects({
            request,
            storefrontClient,
            routeTemplates,
        });

        if (redirect) {
            return redirect;
        }
    }

    response = new Response(response.body, response);

    requestContext.applyResponseHeaders(response.headers);

    return response;
}