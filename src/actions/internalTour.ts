type TourListItem = {
    id: number;
    image: string | null;
    title: string;
    adventure_style: string;
    rating: number | null;
    duration_text: string;
    price: string | number;
};

type TourListResult =
    | { data: { items: TourListItem[] } }
    | { error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

export const InternalTour = async (): Promise<TourListResult> => {
    try {
        const response = await fetch(`${process.env.API}api/tours?per_page=10`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        })
        if (!response.ok) {
            const responseTours = await response.text().catch(() => "");
            console.error(
                `Tour  API error: ${response.status} ${response.statusText}`,
                responseTours,
            );
            return {
                error: `Seat request failed (${response.status} ${response.statusText}).`,
            };

        }
        
        const payload: unknown = await response.json();
        if (!isRecord(payload)) {
            return { error: "The tours service returned an invalid response." };
        }

        const payloadData = payload.data;
        const items = Array.isArray(payloadData)
            ? payloadData
            : isRecord(payloadData) && Array.isArray(payloadData.items)
              ? payloadData.items
              : Array.isArray(payload.items)
                ? payload.items
                : null;

        if (!items) {
            return { error: "The tours service response did not include a tour list." };
        }

        return { data: { items: items as TourListItem[] } };

    } catch (error) {
        console.error("Tours  API fetch error:", error);
        return { error: "Unable to connect to the tours service." };

    }
}
export const GetTourById = async (id: number) => {
    try {
        const response = await fetch(`${process.env.API}api/tours/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        })
        if (!response.ok) {
            const responseTours = await response.text().catch(() => "");
            console.error(
                `Tour  API error: ${response.status} ${response.statusText}`,
                responseTours,
            );
            return {
                error: `Seat request failed (${response.status} ${response.statusText}).`,
            };

        }
        
        return await response.json() ;

    } catch (error) {
        console.error("Tours  API fetch error:", error);
        return { error: "Unable to connect to the tours service." };

    }
}

