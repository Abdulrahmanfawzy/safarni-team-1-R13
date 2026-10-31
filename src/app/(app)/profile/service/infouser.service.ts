import type { Iavatar } from "../types/infouser.types";

import { getAccessToken } from "@/lib/auth";

interface ProfileResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: Iavatar;
}

export async function getAvatar(): Promise<Iavatar> {
  const baseUrl = process.env.API;
  const token = await getAccessToken();

  if (!baseUrl) {
    throw new Error("API_BASE_URL is missing from .env.local");
  }

  const response = await fetch(`${baseUrl}api/profile/show`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load profile: ${response?.status}`);
  }

  const result = (await response.json()) as ProfileResponse;
  return result.data;
}
