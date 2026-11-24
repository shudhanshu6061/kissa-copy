import { createRequestHandler, RouterContextProvider } from "react-router";
import * as serverBuild from "virtual:react-router/server-build";

import { createAppLoadContext } from "./app/lib/server-context";

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ) {
    const handleRequest = createRequestHandler(
      serverBuild,
      import.meta.env.MODE,
    );
    const context = await createAppLoadContext(
      request,
      env,
      executionContext,
      new RouterContextProvider(),
    );

    return handleRequest(request, context);
  },
};
