
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
export default RequestCarBookingDetailsAction;