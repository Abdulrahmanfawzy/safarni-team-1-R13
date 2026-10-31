"use client";

import { useUpdateSearchParams } from "@/hooks/UpdateSearchParam";
import { formatDate, normalizeTripType, parseDate, TripType } from "@/features/flights/utils/flightSearch";

export type FlightLeg = "departure" | "return";

export const useFlightSearch = () => {
    const { updateSearchParams, searchParams } = useUpdateSearchParams();

    const tripTypeParam = searchParams.get("type") ?? searchParams.get("tripType");
    const tripType: TripType = normalizeTripType(tripTypeParam);

    const departure = parseDate(searchParams.get("departure"));
    const returnDate =
        tripType === "round"
            ? parseDate(searchParams.get("return") ?? searchParams.get("returnDate"))
            : undefined;

    const location = searchParams.get("location") ?? "";
    const dest = searchParams.get("dest") ?? searchParams.get("destination") ?? "";

    const selectedFlightIds = {
        departure: searchParams.get("departureFlight"),
        return: searchParams.get("returnFlight"),
    };
    const isDialogOpen = searchParams.get("open") === "true";

    const canSearch = tripType === "round" ? !!(departure && returnDate) : !!departure;

    // ---- actions ----
    const setTripType = (type: TripType) => {
        const apiType = type === "round" ? "round_trip" : type === "one-way" ? "one_way" : "multi";
        updateSearchParams({
            type: apiType,
            tripType: null,
            ...(type !== "round" && { return: null, returnDate: null, returnFlight: null }),
        });
    };

    // Changing a date invalidates the flight picked for that leg
    const setDeparture = (date?: Date) =>
        updateSearchParams({
            departure: formatDate(date),
            departureFlight: null,
            ...(date && returnDate && date > returnDate
                ? { return: null, returnDate: null, returnFlight: null }
                : {}),
        });

    const setReturnDate = (date?: Date) =>
        updateSearchParams({ return: formatDate(date), returnDate: null, returnFlight: null });

    const setLocation = (val: string) =>
        updateSearchParams({ location: val ? val : null });

    const setDestination = (val: string) =>
        updateSearchParams({ dest: val ? val : null, destination: null });

    // const selectFlight = (flightId: string, leg: FlightLeg) => {
    //     const key = leg === "departure" ? "departureFlight" : "returnFlight";
    //     updateSearchParams({
    //         [key]: selectedFlightIds[leg] === flightId ? null : flightId,
    //     });
    // };

    const setDialogOpen = (value: boolean) =>
        updateSearchParams({ open: value ? "true" : null });

    return {
        tripType,
        departure,
        returnDate,
        location,
        dest,
        destination: dest,
        selectedFlightIds,
        isDialogOpen,
        canSearch,
        setTripType,
        setDeparture,
        setReturnDate,
        setLocation,
        setDestination,
        setDialogOpen,
    };
};
