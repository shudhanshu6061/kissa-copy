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

  // Customer Account Authentication & Dashboard Routes
  route("account/login", "routes/account/login.tsx"),
  layout("routes/account/layout.tsx", [
    route("account", "routes/account/index.tsx"),
    route("account/orders", "routes/account/orders.tsx"),
    route("account/profile", "routes/account/profile.tsx"),
    route("account/addresses", "routes/account/addresses.tsx"),
  ]),
] satisfies RouteConfig;
