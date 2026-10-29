
"use server";

import { getAccessToken } from "@/lib/auth";

export type CarCheckoutPayload = {
    rental_type: "hourly" | "daily";
    start_at: string;
    end_at: string;
    pickup_address: string;
    notes: string;
};

type CarPaymentResult =
    | { error: string }
    | { success: true; message?: string; checkoutUrl: string };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

const getApiBaseUrl = () =>
    process.env.API?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");

const RequestCarBookingDetailsAction = async (id: string) => {
    console.log(`${process.env.API}api/cars/${id}`);
    try {
        const response = await fetch(`${process.env.API}api/cars/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",

        })
        if (!response.ok) {
            const responseDetails = await response.text().catch(() => "");
            console.error(
                `Cars seats API error: ${response.status} ${response.statusText}`,
                responseDetails,

            );
            return {
                error: `Cars request failed (${response.status} ${response.statusText}).`,
            };
        }
        

        const data = await response.json()
        return data?.data

    } catch (error) {
        console.error("Cars  API fetch error:", error);
        return { error: "Unable to connect to the  Cars service." };
    }
}

export const CarPayment = async (
    id: string | number,
    payload: CarCheckoutPayload,
): Promise<CarPaymentResult> => {
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) return { error: "The Cars service is not configured." };
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

        const carId = encodeURIComponent(String(id));
        const endpoints = [
            `${apiBaseUrl}/api/cars/${carId}/checkout`,
        ];

        let response: Response | undefined;
        for (const endpoint of endpoints) {
            response = await fetch(endpoint, requestOptions);
            if (response.status !== 404) break;
        }

        const result: unknown = await response?.json().catch(() => null);
        if (!response?.ok || !isRecord(result) || result.success !== true) {
            const apiErrors = isRecord(result) && Array.isArray(result.errors)
                ? result.errors.find((item): item is string => typeof item === "string")
                : undefined;
            return {
                error: (isRecord(result) && typeof result.message === "string" && result.message)
                    || apiErrors
                    || `Car checkout failed (${response?.status ?? "unknown"} ${response?.statusText ?? ""}).`,
            };
        }

        const data = isRecord(result.data) ? result.data : undefined;
        const payment = data && isRecord(data.payment) ? data.payment : undefined;
        const checkoutUrl =
            (data && typeof data.checkout_url === "string" && data.checkout_url.trim())
            || (payment && typeof payment.checkout_url === "string" && payment.checkout_url.trim())
            || (typeof result.checkout_url === "string" && result.checkout_url.trim());

        if (!checkoutUrl) {
            return { error: "The payment service did not return a checkout URL." };
        }

        try {
            if (new URL(checkoutUrl).protocol !== "https:") {
                return { error: "The payment service returned an invalid checkout URL." };
            }
        } catch {
            return { error: "The payment service returned an invalid checkout URL." };
        }

        return {
            success: true,
            message: typeof result.message === "string" ? result.message : undefined,
            checkoutUrl,
        };
    } catch (error) {
        console.error("Car checkout API request failed:", error);
        return {
            error: error instanceof Error && error.message.includes("Unauthorized")
                ? "Please sign in before booking a car."
                : "Unable to connect to the Cars checkout service.",
        };
    }
};

export default RequestCarBookingDetailsAction;
