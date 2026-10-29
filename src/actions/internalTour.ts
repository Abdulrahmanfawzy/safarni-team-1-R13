export const InternalTour = async () => {
    console.log(`${process.env.API}api/tours?per_page=10`);
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
        
        return await response.json();

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
        
        return await response.json();

    } catch (error) {
        console.error("Tours  API fetch error:", error);
        return { error: "Unable to connect to the tours service." };

    }
}
}
