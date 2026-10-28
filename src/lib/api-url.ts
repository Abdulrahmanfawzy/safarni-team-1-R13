/** Returns the backend origin from API, normalized for server-side fetch calls. */
export function getApiBaseUrl() {
  const value = process.env.API?.trim().replace(/^['"]|['"]$/g, "").trim();

  if (!value) {
    throw new Error("API is not configured. Set API in the server environment.");
  }

  return value.replace(/\/+$/, "");
}
