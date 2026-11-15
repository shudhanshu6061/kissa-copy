import {
    index,
    route,
    type RouteConfig,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("shop", "routes/shop.tsx"),
    route("gifting", "routes/gifting.tsx"),
    route("about", "routes/about.tsx"),
    route("about-us", "routes/about.tsx", { id: "about-us" }),
    route("contact", "routes/contact.tsx"),
    route("contact-us", "routes/contact.tsx", { id: "contact-us" }),
    route("collections/all", "routes/collections-all.tsx"),
] satisfies RouteConfig;
