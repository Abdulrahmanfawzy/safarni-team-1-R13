

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";

export async function DELETE() {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    return NextResponse.json(
      { success: false, message: "The account API is not configured." },
      { status: 500 },
    );
  }

  try {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to delete your account." },
        { status: 401 },
      );
    }

    const response = await fetch(
     `${baseUrl.replace(/\/+$/, "")}/api/profile/delete-account` ,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const responseText = await response.text();
    let result: unknown = {};

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
      { success: false, message: "Could not delete the account. Please try again." },
      { status: 502 },
    );
  }
}