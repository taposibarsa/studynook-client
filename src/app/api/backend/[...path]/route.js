import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

async function proxy(request, context) {
  const { path } = await context.params;
  const segments = Array.isArray(path) ? path.join("/") : path;
  const incoming = new URL(request.url);
  const target = `${API_URL}/api/${segments}${incoming.search}`;

  const headers = new Headers();
  const cookie = request.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const init = {
    method: request.method,
    headers,
    cache: "no-store",
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const upstream = await fetch(target, init);
  const responseHeaders = new Headers();

  const setCookies =
    typeof upstream.headers.getSetCookie === "function"
      ? upstream.headers.getSetCookie()
      : [];

  for (const c of setCookies) {
    responseHeaders.append("set-cookie", c);
  }

  if (REDIRECT_STATUSES.has(upstream.status)) {
    const location = upstream.headers.get("location");
    if (location) {
      // OAuth callback sends Set-Cookie on a 302; must forward or new users stay logged out.
      return NextResponse.redirect(location, {
        status: upstream.status,
        headers: responseHeaders,
      });
    }
  }

  const contentTypeRes = upstream.headers.get("content-type");
  if (contentTypeRes) responseHeaders.set("content-type", contentTypeRes);

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
