

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { service_type, service_item_id } = await request.json();
    const baseUrl = process.env.API_BASE_URL;
    const token = process.env.TOKEN;

    if (!baseUrl || !token) {
      return NextResponse.json(
        { message: "API settings on the server are incomplete." },
        { status: 500 },
      );
    }

    const response = await fetch(`${baseUrl}favorites/toggle`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ service_type, service_item_id }),
      cache: "no-store",
    });

    

    const result = await response.json();
    console.log("External API status:", response.status);
// console.log("External API response:", result);
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json(
      { message:" An error occurred while updating the favorites. "},
      { status: 500 },
    );
  }
}