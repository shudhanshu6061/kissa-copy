import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import path from "node:path";

export default defineConfig({
    plugins: [reactRouter()],

    resolve: {
        alias: [
            {
                find: "@designcodeio/threeui/style.css",
                replacement: path.resolve(
                    import.meta.dirname,
                    "src/shaders/threeui.css"
                ),
            },
            {
                find: "@designcodeio/threeui",
                replacement: path.resolve(
                    import.meta.dirname,
                    "src/index.ts"
                ),
            },
        ],
    },

    server: {
        port: 5173,
        host: true,
    },
});
