import type { CacheInstance } from "@shopify/hydrogen";
import { createContext } from "react-router";
import type { RouterContextProvider } from "react-router";

export const envContext = createContext<Env>();
export const waitUntilContext =
  createContext<ExecutionContext["waitUntil"]>();
export const cacheContext = createContext<CacheInstance>();

export async function createAppLoadContext(
  _request: Request,
  env: Env,
  executionContext: ExecutionContext,
  provider: RouterContextProvider,
): Promise<RouterContextProvider> {
  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const cache = await caches.open("hydrogen");

  provider.set(envContext, env);
  provider.set(waitUntilContext, waitUntil);
  provider.set(cacheContext, cache);
  return provider;
}
