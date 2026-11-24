import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import { storefrontContext, customerAccountContext } from "./lib/context";
import { envContext, cacheContext, waitUntilContext } from "./lib/server-context";
import { handleRequest } from "./lib/shopify";
import { CartProvider } from "./context/CartContext";

import "./styles/global.css";

// Hydrogen Middleware
export const middleware: Route.MiddlewareFunction[] = [
    ({ request, context }, next) => {
        const env = context.get(envContext);
        const cache = context.get(cacheContext);
        const waitUntil = context.get(waitUntilContext);
        return handleRequest(
            request,
            env,
            async (_request, storefrontClient, customerContext) => {
                if (storefrontClient) {
                    context.set(storefrontContext, storefrontClient);
                }
                if (customerContext) {
                    context.set(customerAccountContext, customerContext);
                }
                return next();
            },
            cache,
            waitUntil
        );
    },
];

// Document Layout
export function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" type="image/png" href="/kissa-logo-transparent.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <Meta />
                <Links />
            </head>

            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

// Error Boundary for resilient failure handling
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Sanctuary Temporarily Unavailable";
    let details =
        "An unexpected interruption occurred while preparing this olfactory chapter. Please refresh or return to the main entrance.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message =
            error.status === 404
                ? "Chapter Not Found (404)"
                : `Archive Interruption (${error.status})`;
        details =
            error.status === 404
                ? "The botanical archive or fragrance flacon you are seeking could not be found."
                : error.statusText || details;
    } else if (error instanceof Error) {
        if (import.meta.env.DEV) {
            details = error.message;
            stack = error.stack;
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2.5rem 1.5rem",
                textAlign: "center",
                background: "var(--paper, #F8F4E7)",
                color: "var(--ink, #4E342E)",
                fontFamily: "var(--font, serif)",
            }}
        >
            <span
                style={{
                    fontFamily: "var(--sans, sans-serif)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    opacity: 0.6,
                    marginBottom: "1.25rem",
                }}
            >
                KISSA · Botanical Herbarium
            </span>
            <h1
                style={{
                    fontFamily: "var(--display, 'Instrument Serif', Georgia, serif)",
                    fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.01em",
                }}
            >
                {message}
            </h1>
            <p
                style={{
                    maxWidth: "520px",
                    lineHeight: 1.6,
                    fontSize: "1.05rem",
                    opacity: 0.8,
                    marginBottom: "2.5rem",
                }}
            >
                {details}
            </p>
            {stack && (
                <pre
                    style={{
                        maxWidth: "800px",
                        width: "100%",
                        padding: "1rem",
                        background: "rgba(78, 52, 46, 0.05)",
                        border: "1px solid rgba(78, 52, 46, 0.15)",
                        borderRadius: "6px",
                        textAlign: "left",
                        overflowX: "auto",
                        fontSize: "0.8rem",
                        marginBottom: "2rem",
                    }}
                >
                    {stack}
                </pre>
            )}
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <a
                    href="/"
                    style={{
                        padding: "0.85rem 1.75rem",
                        background: "var(--ink, #4E342E)",
                        color: "var(--paper, #F8F4E7)",
                        borderRadius: "9999px",
                        textDecoration: "none",
                        fontFamily: "var(--sans, sans-serif)",
                        fontSize: "0.85rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease",
                    }}
                >
                    Return to Entrance
                </a>
                <button
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            window.location.reload();
                        }
                    }}
                    style={{
                        padding: "0.85rem 1.75rem",
                        border: "1px solid var(--ink, #4E342E)",
                        color: "var(--ink, #4E342E)",
                        borderRadius: "9999px",
                        fontFamily: "var(--sans, sans-serif)",
                        fontSize: "0.85rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                    }}
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}

// Main Application
export default function App() {
    return (
        <CartProvider>
            <Outlet />
        </CartProvider>
    );
}
