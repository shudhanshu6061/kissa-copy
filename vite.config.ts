import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { localHttps } from "@shopify/hydrogen/vite";
import path from "node:path";

export default defineConfig({
    plugins: [
        reactRouter(),
        localHttps({
            enabled: process.env.NODE_ENV !== "production" && process.env.npm_lifecycle_event !== "build",
        }),
    ],

    resolve: {
        alias: {
            "~": path.resolve(import.meta.dirname, "app"),
        },
    },

    server: {
        port: 5173,
        host: true,
    },
});
