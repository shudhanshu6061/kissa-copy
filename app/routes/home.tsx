import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { useNavigate } from "react-router";
import { gql } from "@shopify/hydrogen";
import type { Route } from "./+types/home";
import { storefrontContext } from "../lib/context";

const PRODUCTS_QUERY = gql(`
    query Products {
        products(first: 8) {
            nodes {
                id
                title
                handle
                featuredImage {
                    url
                    altText
                }
                priceRange {
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
            }
        }
    }
`);

export async function loader({ context }: Route.LoaderArgs) {
    const storefront = context.get(storefrontContext);
    const { data } = await storefront.graphql(PRODUCTS_QUERY);

    return {
        products: data?.products.nodes ?? [],
    };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const [Scene, setScene] = useState<ComponentType | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleMsg = (e: MessageEvent) => {
            if (e.data && e.data.type === "navigate" && typeof e.data.url === "string") {
                navigate(e.data.url);
            }
        };
        window.addEventListener("message", handleMsg);
        return () => window.removeEventListener("message", handleMsg);
    }, [navigate]);

    useEffect(() => {
        const sendProducts = () => {
            if (
                iframeRef.current &&
                iframeRef.current.contentWindow &&
                loaderData.products &&
                loaderData.products.length > 0
            ) {
                iframeRef.current.contentWindow.postMessage(
                    { type: "shopify_products", products: loaderData.products },
                    "*"
                );
            }
        };

        const el = iframeRef.current;
        if (el) {
            el.addEventListener("load", sendProducts);
            sendProducts();
            return () => el.removeEventListener("load", sendProducts);
        }
    }, [loaderData.products]);

    useEffect(() => {
        let active = true;

        import("../../src/App")
            .then(({ default: SceneComponent }) => {
                if (active) {
                    setScene(() => SceneComponent);
                }
            })
            .catch((err) => {
                console.error("Error loading interactive scene:", err);
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <main
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                margin: 0,
                padding: 0,
                background: "#F8F4E7",
            }}
        >
            {Scene ? (
                <Scene />
            ) : (
                <iframe
                    ref={iframeRef}
                    src="/landing-pages/meng-to-sketchbook.html"
                    title="KISSA Parfums — The Botanical Fragrance Herbarium"
                    style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                        display: "block",
                        position: "absolute",
                        inset: 0,
                        background: "#F8F4E7",
                    }}
                />
            )}
        </main>
    );
}
