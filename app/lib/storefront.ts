import {
    createShopifyRequestContext,
    createStorefrontClient,
    type CacheInstance,
} from "@shopify/hydrogen";

export function createRequestStorefrontClient(
    request: Request,
    env: Env,
    cache?: CacheInstance,
    waitUntil?: ExecutionContext["waitUntil"],
) {
    const buyerIp =
        request.headers.get("oxygen-buyer-ip") ||
        request.headers.get("cf-connecting-ip") ||
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
                cache,
                waitUntil,
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
            cache,
            waitUntil,
        },
    });
}
