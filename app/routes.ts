import {
  index,
  layout,
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
  route("faqs", "routes/faqs.tsx"),
  route("faq", "routes/faqs.tsx", { id: "faq" }),
  route("collections/all", "routes/collections-all.tsx"),

  // Customer Account Dashboard Routes (under /account)
  layout("routes/account/layout.tsx", [
    route("account", "routes/account/index.tsx"),
    route("account/orders", "routes/account/orders.tsx"),
    route("account/profile", "routes/account/profile.tsx"),
    route("account/addresses", "routes/account/addresses.tsx"),
    route("account/wishlist", "routes/account/wishlist.tsx"),
  ]),

  // Final catch-all splat route: ensures root middleware runs for Shopify handler paths
  // (/account/authorize, /account/login, /account/refresh, /account/logout, /.well-known/ucp, /api/cart)
  // and enables post-routing handleShopifyRedirects on 404.
  route("*", "routes/catchall.tsx"),
] satisfies RouteConfig;
