"use server";

import { getAccessToken } from "@/lib/auth";

export type CreateInternalTourBookingPayload = {
  schedule_id: number;
  adults: number;
  children: number;
  infants: number;
};

type BookingResult =
  | { error: string }
  | { success: true; bookingId: string | number; bookingCode?: string };

export type CreateInternalTourPayPalPayload = {
  full_name: string;
  email: string;
};

type PayPalOrderResult = { error: string } | { success: true; approvalUrl: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getApiBaseUrl() {
  return process.env.API?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
}

export async function CreateInternalTourBooking(
  tourId: string | number,
  payload: CreateInternalTourBookingPayload,
): Promise<BookingResult> {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return { error: "The tours service is not configured." };

  try {
    const token = await getAccessToken();
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    };

    const encodedTourId = encodeURIComponent(String(tourId));
    const endpoints = [
      `${apiBaseUrl}/api/tours/${encodedTourId}/bookings`,
      `${apiBaseUrl}/tours/${encodedTourId}/bookings`,
    ];

    let response: Response | undefined;
    for (const endpoint of endpoints) {
      response = await fetch(endpoint, requestOptions);
      if (response.status !== 404) break;
    }

    const result: unknown = await response?.json().catch(() => null);
    if (!response?.ok || !isRecord(result) || result.success !== true) {
      const message = isRecord(result) && typeof result.message === "string"
        ? result.message
        : `Tour booking failed (${response?.status ?? "unknown"} ${response?.statusText ?? ""}).`;
      return { error: message };
    }

    const data = isRecord(result.data) ? result.data : undefined;
    const booking = data && isRecord(data.booking) ? data.booking : undefined;
    const bookingId = data?.booking_id ?? data?.id ?? booking?.id ?? result.booking_id;
    if ((typeof bookingId !== "number" && typeof bookingId !== "string") || !String(bookingId)) {
      return { error: "The booking was created, but the response did not include a booking ID." };
    }

    const bookingCode = data?.booking_code ?? booking?.booking_code;
    return {
      success: true,
      bookingId,
      bookingCode: typeof bookingCode === "string" ? bookingCode : undefined,
    };
  } catch (error) {
    console.error("Internal tour booking request failed:", error);
    return {
      error: error instanceof Error && error.message.includes("Unauthorized")
        ? "Please sign in before booking this tour."
        : "Unable to connect to the tour booking service.",
    };
  }
}

export async function CreateInternalTourPayPalOrder(
  bookingId: string | number,
  payload: CreateInternalTourPayPalPayload,
): Promise<PayPalOrderResult> {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return { error: "The tours service is not configured." };

  try {
    const token = await getAccessToken();
    const encodedBookingId = encodeURIComponent(String(bookingId));
    const response = await fetch(
      `${apiBaseUrl}/api/bookings/${encodedBookingId}/paypal/order`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const result: unknown = await response.json().catch(() => null);
    if (!response.ok || !isRecord(result) || result.success !== true) {
      const message = isRecord(result) && typeof result.message === "string"
        ? result.message
        : `PayPal order creation failed (${response.status} ${response.statusText}).`;
      return { error: message };
    }

    const data = isRecord(result.data) ? result.data : undefined;
    const approvalUrl = data?.approval_url;
    if (typeof approvalUrl !== "string" || !approvalUrl.trim()) {
      return { error: "PayPal did not return an approval link." };
    }

    try {
      const parsedApprovalUrl = new URL(approvalUrl);
      if (
        parsedApprovalUrl.protocol !== "https:" ||
        !["www.sandbox.paypal.com", "www.paypal.com"].includes(parsedApprovalUrl.hostname)
      ) {
        return { error: "PayPal returned an invalid approval link." };
      }
    } catch {
      return { error: "PayPal returned an invalid approval link." };
    }

    return { success: true, approvalUrl };
  } catch (error) {
    console.error("Tour PayPal order request failed:", error);
    return {
      error: error instanceof Error && error.message.includes("Unauthorized")
        ? "Please sign in before paying for this tour."
        : "Unable to connect to PayPal checkout.",
    };
  }
}
