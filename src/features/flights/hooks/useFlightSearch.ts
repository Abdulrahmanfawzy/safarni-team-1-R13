"use client";

import { useUpdateSearchParams } from "@/hooks/UpdateSearchParam";
import { formatDate, isTripType, parseDate, TripType } from "@/features/flights/utils/flightSearch";

export type FlightLeg = "departure" | "return";

export const useFlightSearch = () => {
    const { updateSearchParams, searchParams } = useUpdateSearchParams();

    const tripTypeParam = searchParams.get("tripType");
    const tripType: TripType = isTripType(tripTypeParam) ? tripTypeParam : "round";

    const departure = parseDate(searchParams.get("departure"));
    const returnDate =
        tripType === "round" ? parseDate(searchParams.get("returnDate")) : undefined;

    const passengerCount = searchParams.get("passengers") ?? "1";
    const selectedFlightIds = {
        departure: searchParams.get("departureFlight"),
        return: searchParams.get("returnFlight"),
    };
    const isDialogOpen = searchParams.get("open") === "true";

    const canSearch = tripType === "round" ? !!(departure && returnDate) : !!departure;

    // ---- actions ----
    const setTripType = (type: TripType) =>
        updateSearchParams({
            tripType: type,
            ...(type !== "round" && { returnDate: null, returnFlight: null }),
        });

    // Changing a date invalidates the flight picked for that leg
    const setDeparture = (date?: Date) =>
        updateSearchParams({ departure: formatDate(date), departureFlight: null });

    const setReturnDate = (date?: Date) =>
        updateSearchParams({ returnDate: formatDate(date), returnFlight: null });

    const setPassengerCount = (value: string) => {
        updateSearchParams({ passengers: value });
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedPassengers", value);
        }
    };

    const selectFlight = (flightId: string, leg: FlightLeg) => {
        const key = leg === "departure" ? "departureFlight" : "returnFlight";
        updateSearchParams({
            [key]: selectedFlightIds[leg] === flightId ? null : flightId,
        });
    };

    const setDialogOpen = (value: boolean) =>
        updateSearchParams({ open: value ? "true" : null });

    return {
        tripType,
        departure,
        returnDate,
        passengerCount,
        selectedFlightIds,
        isDialogOpen,
        canSearch,
        setTripType,
        setDeparture,
        setReturnDate,
        setPassengerCount,
        selectFlight,
        setDialogOpen,
    };
};