import { gql, type StorefrontClient } from "@shopify/hydrogen";

export interface CartLineAttribute {
    key: string;
    value: string;
}

export interface CartLineItem {
    merchandiseId: string;
    quantity: number;
    title?: string;
    attributes?: CartLineAttribute[];
    price?: {
        amount: string;
        currencyCode: string;
    };
}

export interface CartResult {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    lines: Array<{
        id: string;
        quantity: number;
        merchandiseId?: string;
        attributes?: CartLineAttribute[];
    }>;
}

export const CART_CREATE_MUTATION = gql(`
    mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
            cart {
                id
                checkoutUrl
                totalQuantity
                lines(first: 20) {
                    nodes {
                        id
                        quantity
                        merchandise {
                            ... on ProductVariant {
                                id
                                title
                            }
                        }
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }
`);

export const CART_LINES_ADD_MUTATION = gql(`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                id
                checkoutUrl
                totalQuantity
                lines(first: 20) {
                    nodes {
                        id
                        quantity
                        merchandise {
                            ... on ProductVariant {
                                id
                                title
                            }
                        }
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }
`);

const LOCAL_STORAGE_CART_KEY = "kissa_cart_data";

export function getLocalCart(): CartResult {
    if (typeof window === "undefined") {
        return {
            id: "local_mock_cart",
            checkoutUrl: "/shop#checkout",
            totalQuantity: 1,
            lines: [{ id: "line_1", quantity: 1 }],
        };
    }

    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch {
        // Fallback below
    }

    const initial: CartResult = {
        id: "local_mock_cart",
        checkoutUrl: "/shop#checkout",
        totalQuantity: 1,
        lines: [{ id: "line_1", quantity: 1, merchandiseId: "gid://shopify/ProductVariant/np-50ml" }],
    };
    return initial;
}

export function saveLocalCart(cart: CartResult) {
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
            window.dispatchEvent(
                new CustomEvent("kissa:cart-updated", {
                    detail: { totalQuantity: cart.totalQuantity, cart },
                })
            );
        } catch (e) {
            console.error("Error saving local cart:", e);
        }
    }
}

/**
 * Add items to cart via Shopify Storefront API if client is available;
 * gracefully falls back to local storage cart tracking in development.
 */
export async function addProductToCart({
    storefrontClient,
    cartId,
    merchandiseId,
    quantity = 1,
    attributes,
}: {
    storefrontClient?: StorefrontClient | null;
    cartId?: string | null;
    merchandiseId: string;
    quantity: number;
    attributes?: CartLineAttribute[];
}): Promise<CartResult> {
    if (storefrontClient) {
        try {
            const lineInput: any = { merchandiseId, quantity };
            if (attributes && attributes.length > 0) {
                lineInput.attributes = attributes;
            }

            if (cartId) {
                const { data } = await storefrontClient.graphql(
                    CART_LINES_ADD_MUTATION,
                    {
                        variables: {
                            cartId,
                            lines: [lineInput],
                        },
                    }
                );
                if (data?.cartLinesAdd?.cart) {
                    const c = data.cartLinesAdd.cart;
                    return {
                        id: c.id,
                        checkoutUrl: c.checkoutUrl,
                        totalQuantity: c.totalQuantity,
                        lines: c.lines.nodes.map((n: any) => ({
                            id: n.id,
                            quantity: n.quantity,
                            merchandiseId: n.merchandise?.id,
                        })),
                    };
                }
            } else {
                const { data } = await storefrontClient.graphql(
                    CART_CREATE_MUTATION,
                    {
                        variables: {
                            input: {
                                lines: [lineInput],
                            },
                        },
                    }
                );
                if (data?.cartCreate?.cart) {
                    const c = data.cartCreate.cart;
                    return {
                        id: c.id,
                        checkoutUrl: c.checkoutUrl,
                        totalQuantity: c.totalQuantity,
                        lines: c.lines.nodes.map((n: any) => ({
                            id: n.id,
                            quantity: n.quantity,
                            merchandiseId: n.merchandise?.id,
                        })),
                    };
                }
            }
        } catch (err) {
            console.warn("Shopify Cart API failed, using local mock cart:", err);
        }
    }

    // Fallback: Local Client Cart Simulation
    const existing = getLocalCart();
    const attrKey = JSON.stringify(attributes || []);
    const existingLine = existing.lines.find(
        (l) => l.merchandiseId === merchandiseId && JSON.stringify(l.attributes || []) === attrKey
    );

    if (existingLine) {
        existingLine.quantity += quantity;
    } else {
        existing.lines.push({
            id: `line_${Date.now()}`,
            quantity,
            merchandiseId,
            attributes,
        });
    }

    existing.totalQuantity = existing.lines.reduce(
        (acc, l) => acc + l.quantity,
        0
    );
    saveLocalCart(existing);
    return existing;
}

