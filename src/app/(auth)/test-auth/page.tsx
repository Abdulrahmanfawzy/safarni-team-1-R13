import { getAccessToken } from "@/lib/auth";



export default async function TestAuthPage() {
  try {
    const accessToken = await getAccessToken();

    return (
      <main className="p-6">
        <h1>Auth Test</h1>
        <p>getAccessToken() works successfully!</p>
        <p>Token retrieved: {Boolean(accessToken) ? "Yes" : "No"}</p>
        <p>{accessToken}</p>
      </main>
    );
  } catch {
    return (
      <main className="p-6">
        <h1>Auth Test</h1>
        <p>Failed to retrieve access token.</p>
      </main>
    );
  }
}
