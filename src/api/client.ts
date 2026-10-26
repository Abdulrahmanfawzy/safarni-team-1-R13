const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch<T>(
     endpoint: string,
  options?: RequestInit
): Promise<T>{
    if(!API_BASE_URL){
        throw new Error("API base URL is not configured");
    }

    const response = await fetch(
        `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`,
        options
    );
      if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}