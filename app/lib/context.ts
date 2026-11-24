import type { StorefrontClient } from "@shopify/hydrogen";
import type {
  CustomerAccountClient,
  CustomerSession,
  ReadonlyCustomerSessionManager,
} from "@shopify/hydrogen/customer-account";
import { createContext } from "react-router";

export const storefrontContext = createContext<StorefrontClient>();

export interface CustomerContextValue {
  isLoggedIn: boolean;
  customerSession: CustomerSession;
  sessionManager: ReadonlyCustomerSessionManager;
  customerAccount: CustomerAccountClient;
}

export const customerAccountContext = createContext<CustomerContextValue>();
