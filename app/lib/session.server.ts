import { createCookieSessionStorage } from "react-router";
import type { WritableCustomerSessionManager } from "@shopify/hydrogen/customer-account";

const sessionSecret =
  process.env.SESSION_SECRET ||
  "kissa_botanical_perfume_default_secure_secret_2026_change_in_prod";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__kissa_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

/**
 * Creates a request-scoped session manager for Shopify routes and Customer Account API.
 */
export async function createAppSessionManager(
  request: Request
): Promise<WritableCustomerSessionManager> {
  const cookieHeader = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookieHeader);

  return {
    async getSessionOrigin(): Promise<string> {
      if (process.env.PUBLIC_CUSTOMER_ACCOUNT_ORIGIN) {
        return process.env.PUBLIC_CUSTOMER_ACCOUNT_ORIGIN;
      }

      // Check proxy / forwarded headers
      let host =
        request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
        request.headers.get("host");

      if (host) {
        // Shopify Customer Account API forbids 'localhost' as an OAuth redirect origin.
        // It officially requires a non-localhost domain such as 'local.tryhydrogen.dev'.
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
