import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import { storefrontContext } from "./lib/context";
import { handleRequest } from "./lib/shopify";

import "../src/index.css";

// Hydrogen Middleware
export const middleware: Route.MiddlewareFunction[] = [
    ({ request, context }, next) =>
        handleRequest(request, async (_request, storefrontClient) => {
            context.set(storefrontContext, storefrontClient);

            return next();
        }),
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

// Main Application
export default function App() {
    return <Outlet />;
}