
export async function logout() {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const body = await response.text();

  let result: { message?: string } = {};

  try {
    result = body ? JSON.parse(body) : {};
  } catch {
    throw new Error(
      `Expected JSON, received HTML or invalid response (${response.status}): ${body.slice(0, 200)}`,
    );
  }

  if (!response.ok) {
    throw new Error(result.message || `Logout failed: ${response.status}`);
  }

  return result;
}