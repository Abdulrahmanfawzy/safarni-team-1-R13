
import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth";

export async function POST() {
  try {
    const baseUrl = process.env.API_BASE_URL;

    if (!baseUrl) {
      return NextResponse.json(
        { success: false, message: "API_BASE_URL is not present in the project settings." },
        { status: 500 },
      );
    }

    // const token = await getAccessToken();
 const token = process.env.TOKEN;

    const response = await fetch(`${baseUrl}/profile/deactivate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const responseText = await response.text();
    let result;

    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      result = { message: responseText };
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred while disabling the account.";

    return NextResponse.json(
      { success: false, message },
      { status: message.startsWith("Unauthorized") ? 401 : 500 },
    );
  }
}