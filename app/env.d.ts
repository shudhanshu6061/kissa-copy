/// <reference types="vite/client" />
/// <reference types="@shopify/oxygen-workers-types" />

interface Env {
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  PRIVATE_STOREFRONT_API_TOKEN?: string;
  PUBLIC_STOREFRONT_ID?: string;
  SESSION_SECRET: string;
  SHOP_ID: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
}
