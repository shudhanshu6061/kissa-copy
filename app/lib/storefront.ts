import {
    createShopifyRequestContext,
    createStorefrontClient,
} from "@shopify/hydrogen";

export function createRequestStorefrontClient(request: Request) {
    const buyerIp = request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim();

    if (!buyerIp && process.env.NODE_ENV === "production") {
        throw new Error("Missing trusted buyer IP address.");
    }

    const requestContext = createShopifyRequestContext({
        request,
        i18n: {
            country: "IN",
            language: "EN",
        },
        buyerIp: buyerIp || "127.0.0.1",
    });

    return createStorefrontClient({
        type: "private",
        requestContext,
        config: {
            storeDomain: process.env.PUBLIC_STORE_DOMAIN!,
            privateStorefrontToken:
                process.env.PRIVATE_STOREFRONT_API_TOKEN!,
            storefrontId: process.env.PUBLIC_STOREFRONT_ID,
        },
    });
}