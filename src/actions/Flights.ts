"use server";

import { getAccessToken } from "@/lib/auth";
import { headers } from "next/headers";

type SearchFlightsData = {
    type?: string;
    tripType?: string;
    location?: string;
    dest?: string;
    destination?: string;
    departure?: string | Date;
    return?: string | Date;
    returnDate?: string | Date;
};

export type FlightBookingPayload = {
    flight_id: string | number;
    passengers: Array<{
        full_name: string;
        age: number;
        gender: string;
        passport_number: string;
        seat_id: string | number;
    }>;
};

const getApiAuthorizationHeader = async (): Promise<
    Record<string, string> | null
> => {
    try {
        const accessToken = await getAccessToken();
        return { Authorization: `Bearer ${accessToken}` };
    } catch {
        return null;
    }
};


const formatDateForApi = (value?: string | Date): string => {
    if (!value) return "";

    if (value instanceof Date) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, "0");
        const day = String(value.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // Keep date-only values unchanged. For timestamps, use the date portion
    // supplied in the form rather than converting it to UTC.
    return value.slice(0, 10);
};

 const getApiBaseUrl = () => {
    const rawApi =
        process.env.API || "https://safarni-round-13.huma-volve.com";

    return rawApi.trim().replace(/^["']|["']$/g, "").trim().replace(/\/+$/, "");
};

export const SearchFlightsAction = async (data: SearchFlightsData) => {
    try {
        const tripType = data.type || data.tripType || "round_trip";

        let apiType = "round_trip";
        if (tripType === "one-way" || tripType === "one_way" || tripType === "oneway") {
            apiType = "one_way";
        } else if (tripType === "multi" || tripType === "multi_city") {
            apiType = "multi";
        }

        const payload: Record<string, string> = {
            type: apiType,
            location: data.location?.trim() ?? "",
            ...(apiType === "round_trip"
                ? { return: formatDateForApi(data.return || data.returnDate) }
                : {}),
            dest: (data.dest || data.destination)?.trim() ?? "",
            departure: formatDateForApi(data.departure),
        };

        const apiBaseUrl = getApiBaseUrl();

        let response = await fetch(`${apiBaseUrl}/api/flights`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            body: JSON.stringify(payload),
            cache: "no-store",
        });
        if (response.status === 404) {
            response = await fetch(`${apiBaseUrl}/flights`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            });
        }

        if (!response.ok) {
            const responseDetails = await response.text().catch(() => "");
            console.error(
                `Flights API error: ${response.status} ${response.statusText}`,
                responseDetails,
            );
            return {
                error: `Flight search failed (${response.status} ${response.statusText}).`,
            };
        }

        return await response.json();
    } catch (error) {
        console.error("Flights API fetch error:", error);
        return { error: "Unable to connect to the flight search service." };
    }
};

export const GetFlightSeatsAction = async (id: string | number) => {
    try {
        const apiBaseUrl = getApiBaseUrl();

        const response = await fetch(`${apiBaseUrl}/api/flights/${encodeURIComponent(String(id))}/seats`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (!response.ok) {
            const responseDetails = await response.text().catch(() => "");
            console.error(
                `Flight seats API error: ${response.status} ${response.statusText}`,
                responseDetails,
            );
                return {
                    error: `Seat request failed (${response.status} ${response.statusText}).`,
                };
        }

        return await response.json();
    } catch (error) {
        console.error("Flight seats API fetch error:", error);
        return { error: "Unable to connect to the flight seats service." };
    }
};

export const CreateFlightBookingAction = async (payload: FlightBookingPayload) => {
    try {
        const apiBaseUrl = getApiBaseUrl();
        const authorization = await getApiAuthorizationHeader();
        if (!authorization) {
            return { error: "You must be logged in to create a booking." };
        }

        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...authorization,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        };

        let response = await fetch(`${apiBaseUrl}/api/bookings`, requestOptions);
        if (response.status === 404) {
            response = await fetch(`${apiBaseUrl}/bookings`, requestOptions);
        }

        const result = await response.json().catch(() => null);
        if (!response.ok || result?.success === false) {
            const message = result?.message || `${response.status} ${response.statusText}`;
            console.error("Flight booking API error:", message, result?.errors);
            return { error: `Booking failed: ${message}` };
        }

        return result ?? { success: true };
    } catch (error) {
        console.error("Flight booking API fetch error:", error);
        return { error: "Unable to connect to the bookings service." };
    }
};
export const FlightPayment = async (id: string | number) => {
    try {
        const apiBaseUrl = getApiBaseUrl();
        const authorization = await getApiAuthorizationHeader();

        if (!authorization) {
            return { error: "You must be logged in to start payment." };
        }

        const requestHeaders = await headers();
        const forwardedHost = requestHeaders.get("x-forwarded-host");
        const host = forwardedHost || requestHeaders.get("host");
        const protocol = requestHeaders.get("x-forwarded-proto") || "https";
        const origin = process.env.NEXTAUTH_URL || (host ? `${protocol}://${host}` : "");
        if (!origin) {
            return { error: "Could not determine the return address for flight checkout." };
        }
        const bookingId = encodeURIComponent(String(id));
        const successUrl = new URL(
            `/profile/booking/flight/${bookingId}`,
            origin,
        ).toString();
        const cancelUrl = new URL("/profile/booking?payment=cancelled", origin).toString();

        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...authorization,
            },
            body: JSON.stringify({ success_url: successUrl, cancel_url: cancelUrl }),
            cache: "no-store",
        };

        let response = await fetch(`${apiBaseUrl}/api/bookings/${bookingId}/payment/checkout`, requestOptions);
        if (response.status === 404) {
            response = await fetch(`${apiBaseUrl}/bookings/${bookingId}/payment/checkout`, requestOptions);
        }

        const result = await response.json().catch(() => null);
        if (!response.ok || result?.success === false) {
            const message = result?.message || `${response.status} ${response.statusText}`;
            console.error("Flight checkout API error:", message, result?.errors);
            return { error: `Payment checkout failed: ${message}` };
        }

        return result ?? { success: true };
    } catch (error) {
        console.error("Flight checkout API fetch error:", error);
        return { error: "Unable to connect to the payment service." };
    }
};
