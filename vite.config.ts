import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { oxygen } from "@shopify/mini-oxygen/vite";

export default defineConfig({
    plugins: [
        oxygen(),
        reactRouter(),
    ],

    build: {
        assetsInlineLimit: 0,
    },

    ssr: {
        optimizeDeps: {
            include: [
                "react",
                "react/jsx-runtime",
                "react/jsx-dev-runtime",
                "react-dom",
                "react-dom/server",
                "react-router > set-cookie-parser",
                "react-router > cookie",
                "react-router",
            ],
        },
    },
});
