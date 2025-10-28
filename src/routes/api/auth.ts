import type { Route } from "../../+types/root";
import { getAuth } from "@/lib/auth";

export async function loader({ context, request }: Route.LoaderArgs) {
  const auth = getAuth(context.cloudflare.env);
  return auth.handler(request);
}
export async function action({ context, request }: Route.LoaderArgs) {
    const auth = getAuth(context.cloudflare.env);

  return auth.handler(request);
}
