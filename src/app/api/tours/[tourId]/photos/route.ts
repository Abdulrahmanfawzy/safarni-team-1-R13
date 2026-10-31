import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

type RouteContext = {
  params: Promise<{ tourId: string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { tourId } = await params;
    const incoming = await request.formData();
    const photo = incoming.get("image");

    if (!(photo instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Choose a photo to upload." },
        { status: 400 },
      );
    }

    const extension = photo.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_TYPES.has(photo.type) && !ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { success: false, message: "Choose a JPG, JPEG, PNG, or WEBP image." },
        { status: 415 },
      );
    }
    if (photo.size === 0 || photo.size > MAX_PHOTO_SIZE) {
      return NextResponse.json(
        { success: false, message: "The photo must be 5 MB or smaller." },
        { status: 413 },
      );
    }

    const apiBaseUrl = process.env.API?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
    if (!apiBaseUrl) {
      return NextResponse.json(
        { success: false, message: "The tours service is not configured." },
        { status: 500 },
      );
    }

    const token = await getAccessToken();
    const outgoing = new FormData();
    outgoing.append("image", photo, photo.name);

    const response = await fetch(
      `${apiBaseUrl}/api/tours/${encodeURIComponent(tourId)}/photos`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: outgoing,
        cache: "no-store",
      },
    );

    const responseText = await response.text();
    let result: unknown;
    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      result = { message: responseText || response.statusText };
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    const unauthorized = error instanceof Error && error.message.includes("Unauthorized");
    return NextResponse.json(
      {
        success: false,
        message: unauthorized ? "Please sign in to add a tour photo." : "Unable to upload the tour photo.",
      },
      { status: unauthorized ? 401 : 500 },
    );
  }
}
