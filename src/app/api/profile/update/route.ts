

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";

export async function POST(request: Request) {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    return NextResponse.json(
      { success: false, message: "API is missing." },
      { status: 500 },
    );
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json(
        { success: false, message: "You must be signed in." },
        { status: 401 },
      );
    }

    const payload = await request.json();
    const apiBase = baseUrl.replace(/\/+$/, "");

    const response = await fetch(`${apiBase}/api/profile/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const responseText = await response.text();
    let result = {};

    if (responseText) {
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { message: responseText };
      }
    }

    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not update your profile." },
      { status: 502 },
    );
  }
}