import { createCookieSessionStorage } from "react-router";
import type { WritableCustomerSessionManager } from "@shopify/hydrogen/customer-account";

/**
 * Creates a request-scoped session manager for Shopify routes and Customer Account API.
 * Reads secrets from the Worker `env` binding passed by the Oxygen runtime.
 */
export async function createAppSessionManager(
  request: Request,
  env: Env,
): Promise<WritableCustomerSessionManager> {
  const sessionSecret = env.SESSION_SECRET || "fallback_dev_secret_change_me";

  const sessionStorage = createCookieSessionStorage({
    cookie: {
      name: "__kissa_session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecret],
      secure: true,
    },
  });

  const cookieHeader = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookieHeader);

  return {
    async getSessionOrigin(): Promise<string> {
      if (env.PUBLIC_CUSTOMER_ACCOUNT_API_URL) {
        // Derive origin from the configured URL
        try {
          const url = new URL(env.PUBLIC_CUSTOMER_ACCOUNT_API_URL);
          return url.origin;
        } catch {
          // fall through
        }
      }

      let host =
        request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
        request.headers.get("host");

      if (host) {
        if (host.startsWith("localhost")) {
          host = host.replace("localhost", "local.tryhydrogen.dev");
        } else if (host.startsWith("127.0.0.1")) {
          host = host.replace("127.0.0.1", "local.tryhydrogen.dev");
        }
        return `https://${host}`;
      }

      try {
        const url = new URL(request.url);
        let h = url.host;
        if (h.startsWith("localhost")) {
          h = h.replace("localhost", "local.tryhydrogen.dev");
        } else if (h.startsWith("127.0.0.1")) {
          h = h.replace("127.0.0.1", "local.tryhydrogen.dev");
        }
        return `https://${h}`;
      } catch {
        return "https://local.tryhydrogen.dev:5173";
      }
    },

    getSessionItem(key: string): unknown {
      return session.get(key);
    },

    setSessionItem(key: string, value: unknown): void {
      session.set(key, value);
    },

    removeSessionItem(key: string): void {
      session.unset(key);
    },

    async commit(): Promise<HeadersInit | void> {
      const cookie = await sessionStorage.commitSession(session);
      return {
        "Set-Cookie": cookie,
      };
    },
  };
}
