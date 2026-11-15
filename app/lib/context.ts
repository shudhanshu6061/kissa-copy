import type { StorefrontClient } from "@shopify/hydrogen";
import { createContext } from "react-router";

export const storefrontContext = createContext<StorefrontClient>();