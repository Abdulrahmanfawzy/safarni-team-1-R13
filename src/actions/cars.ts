
"use server";

import { getAccessToken } from "@/lib/auth";

export type CarCheckoutPayload = {
    rental_type: "hourly" | "daily";
    start_at: string;
    end_at: string;
    pickup_address: string;
    coupon_id: string | null;
};

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

export const CreateCarCheckoutAction = async (
    id: string | number,
    payload: CarCheckoutPayload,
) => {
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
        let response = await fetch(`${apiBaseUrl}/api/cars/${carId}/checkout`, requestOptions);
        if (response.status === 404) {
            response = await fetch(`${apiBaseUrl}/cars/${carId}/checkout`, requestOptions);
        }

        const result = await response.json().catch(() => null);
        if (!response.ok || result?.success === false) {
            return {
                error: result?.message || `Car checkout failed (${response.status} ${response.statusText}).`,
            };
        }
        return result ?? { success: true };
    } catch (error) {
        console.error("Car checkout API request failed:", error);
        return { error: "Unable to connect to the Cars checkout service." };
    }
};

export default RequestCarBookingDetailsAction;
