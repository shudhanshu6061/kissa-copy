import {
    createShopifyRequestContext,
    createStorefrontClient,
} from "@shopify/hydrogen";

export function createRequestStorefrontClient(request: Request, env: Env) {
    const buyerIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

    const storeDomain = env.PUBLIC_STORE_DOMAIN || "tnbqyv-es.myshopify.com";
    const privateToken = env.PRIVATE_STOREFRONT_API_TOKEN;
    const publicToken = env.PUBLIC_STOREFRONT_API_TOKEN;
    const storefrontId = env.PUBLIC_STOREFRONT_ID;

    const requestContext = createShopifyRequestContext({
        request,
        i18n: {
            country: "IN",
            language: "EN",
        },
        buyerIp,
    });

    if (privateToken) {
        return createStorefrontClient({
            type: "private",
            requestContext,
            config: {
                storeDomain,
                privateStorefrontToken: privateToken,
                storefrontId,
            },
        });
    }

    return createStorefrontClient({
        type: "public",
        requestContext,
        config: {
            storeDomain,
            publicStorefrontToken: publicToken,
            storefrontId,
        },
    });
}
