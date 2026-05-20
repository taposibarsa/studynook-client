import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";

function getHandlers() {
  return toNextJsHandler(getAuth());
}

export async function GET(request) {
  return getHandlers().GET(request);
}

export async function POST(request) {
  return getHandlers().POST(request);
}
