import {
    createShopifyRequestContext,
    createStorefrontClient,
} from "@shopify/hydrogen";

export function createRequestStorefrontClient(request: Request) {
    const buyerIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        request.headers.get("x-vercel-forwarded-for") ||
        "127.0.0.1";

    const storeDomain =
        process.env.PUBLIC_STORE_DOMAIN ||
        process.env.VITE_PUBLIC_STORE_DOMAIN ||
        "tnbqyv-es.myshopify.com";

    const privateToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;

    const publicToken =
        process.env.PUBLIC_STOREFRONT_API_TOKEN ||
        process.env.VITE_PUBLIC_STOREFRONT_API_TOKEN;

    const storefrontId =
        process.env.PUBLIC_STOREFRONT_ID ||
        process.env.VITE_PUBLIC_STOREFRONT_ID;

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
