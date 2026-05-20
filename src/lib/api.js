import { API_URL } from "./constants";

function getApiBase() {
  if (typeof window !== "undefined") {
    return "/api/backend";
  }
  return API_URL;
}

export async function apiFetch(path, options = {}) {
  const base = getApiBase();
  const urlPath =
    base === "/api/backend" ? path.replace(/^\/api/, "") || "/" : path;
  const res = await fetch(`${base}${urlPath}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    const error = new Error(data?.message || "Request failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}
