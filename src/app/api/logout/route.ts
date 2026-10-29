

import { getAccessToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  const baseUrl = process.env.API;
  const token = await getAccessToken();

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API_BASE_URL is missing from .env.local" },
      { status: 500 },
    );
  }

  if (!token) {
    return NextResponse.json(
      { message: "TOKEN is missing from .env.local" },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${baseUrl}api/profile/logout`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const result = await response.json();

  return NextResponse.json(result, { status: response.status });
}