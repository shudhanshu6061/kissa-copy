import type { Route } from "./+types/catchall";

export async function loader({}: Route.LoaderArgs) {
  throw new Response("Not Found", { status: 404 });
}

export default function Catchall() {
  return null;
}
