

import { NextResponse } from "next/server";

export async function POST() {
  const baseUrl = process.env.API_BASE_URL;
  const token = process.env.TOKEN;

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
    `${baseUrl}/profile/logout`,
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