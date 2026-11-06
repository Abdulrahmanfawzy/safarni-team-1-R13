"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getFlights } from "../constants/MockData";
import { Flight, PropsDepartureDate } from "../types/TypesFlights";
import { DateHeader } from "./DateHeader";
import FlightCard from "./FlightCard";
import { cn } from "@/lib/utils";
import { extractFlights } from "../utils/flightSearch";

const toDisplayText = (value: unknown, fallback: string): string => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const city = record.city;
    const code = record.airport_code ?? record.code;
    const name = record.airport_name ?? record.name;
    const parts = [city, code, name].filter(
      (part): part is string | number =>
        typeof part === "string" || typeof part === "number",
    );
    if (parts.length) return [...new Set(parts.map(String))].join(" · ");
  }

  return fallback;
};

const normalizeFlight = (raw: any, index: number, dateKey: string): Flight => ({
  id: toDisplayText(raw.id, `${dateKey}-${index + 1}`),
  planeId:
    raw.plane_id != null
      ? String(raw.plane_id)
      : raw.planeId != null
        ? String(raw.planeId)
        : raw.plane?.id != null
          ? String(raw.plane.id)
          : undefined,
  departTime: toDisplayText(
    raw.departTime || raw.departure_time || raw.depart_time,
    "7:05 AM",
  ),
  arriveTime: toDisplayText(
    raw.arriveTime || raw.arrival_time || raw.arrive_time,
    "8:55 PM",
  ),
  from: toDisplayText(
    raw.location || raw.from || raw.origin || raw.departure_airport || raw.from_city,
    "YUL",
  ),
  to: toDisplayText(
    raw.dest || raw.destination || raw.to || raw.arrival_airport || raw.to_city,
    "YUL",
  ),
  duration: toDisplayText(raw.duration || raw.flight_duration, "18:55"),
  layover: toDisplayText(raw.layover, "1 layover: YYZ (3:55)"),
  airline: toDisplayText(raw.airline || raw.airline_name, "Scoot"),
  price: Number(raw.price || raw.ticket_price || raw.amount || 1300),
});

const FlightsDialog = ({
  open,
  onOpenChange,
  departureDate,
  onSelect,
  selectedDepartureFlightId: propDepartureId,
  apiFlights,
}: PropsDepartureDate) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDepartureFlightId =
    propDepartureId ?? searchParams.get("departureFlight");
  const legs = departureDate
    ? [{ key: "departure" as const, date: departureDate }]
    : [];
  const canProceed = Boolean(selectedDepartureFlightId);

  // Normalize API flights if returned from action
  const getLegFlights = (
    dateKey: string,
    leg: "departure" | "return",
  ): Flight[] => {
    const parsedApiFlights = extractFlights(apiFlights, leg);
    if (parsedApiFlights !== null) {
      return parsedApiFlights.map((item, idx) =>
        normalizeFlight(item, idx, dateKey),
      );
    }
    return getFlights(dateKey);
  };

  const handleSelect = (flight: Flight, leg: "departure" | "return") => {
    onSelect?.(flight, leg);
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      leg === "departure" ? "departureFlight" : "returnFlight",
      flight.id,
    );
    if (leg === "departure") params.delete("planeId");
    router.replace(`/flights?${params.toString()}`, { scroll: false });
  };

  const handleContinue = () => {
    if (!canProceed) return;
    onOpenChange(false);
    router.push(
      `/flights/seats?id=${encodeURIComponent(selectedDepartureFlightId!)}`,
    );
  };

  // Compute selected flight objects for pricing and display
  const departureDateKey =
    departureDate instanceof Date
      ? format(departureDate, "yyyy-MM-dd")
      : String(departureDate ?? "default");
  const departureList = getLegFlights(departureDateKey, "departure");

  const selectedDeparture = departureList.find(
    (f) => f.id === selectedDepartureFlightId,
  );
  const totalPrice = selectedDeparture?.price ?? 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full overflow-y-auto max-h-[90vh] h-[90%] bg-gray-50 p-6 md:max-w-7xl md:h-[85%] flex flex-col justify-between">
        <DialogTitle className="sr-only">Available flights</DialogTitle>

        <div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Back"
            className="size-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer mb-2"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div
            className={
              legs.length > 1
                ? "grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
                : "grid grid-cols-1 max-w-xl mx-auto w-full gap-6 mt-4"
            }
          >
            {legs.map((leg) => {
              const dateKey =
                leg.date instanceof Date
                  ? format(leg.date, "yyyy-MM-dd")
                  : String(leg.date ?? "default");
              const flights = getLegFlights(dateKey, leg.key);
              const isLegDeparture = leg.key === "departure";
              const isLegSelected = Boolean(selectedDepartureFlightId);

              return (
                <div key={leg.key} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {isLegDeparture ? "Departure Flight" : "Return Flight"}
                    </span>
              {isLegSelected && (
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Selected
                      </span>
                    )}
                  </div>
                  <DateHeader date={leg.date} />
                  {flights.map((flight) => {
                    const isSelected = selectedDepartureFlightId === flight.id;

                    return (
                      <FlightCard
                        key={flight.id}
                        flight={flight}
                        isSelected={isSelected}
                        onSelect={(f) => handleSelect(f, leg.key)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-gray-50/95 backdrop-blur-xs py-2">
          <div className="text-sm">
            {canProceed ? (
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-vivid-green" />
                <span className="text-gray-900 font-medium">
                  "Flight selected"
                </span>
                {totalPrice > 0 && (
                  <span className="text-gray-500 text-xs ml-1">
                    (Total: <span className="font-semibold text-primary">${totalPrice.toLocaleString()}</span>)
                  </span>
                )}
              </div>
            ) : (
              <span className="text-gray-500 text-xs sm:text-sm">
                "Please select a departure flight to proceed"
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={!canProceed}
            onClick={handleContinue}
            className={cn(
              "w-full sm:w-auto px-8 h-11 rounded-xl bg-primary text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2",
              canProceed
                ? "cursor-pointer hover:bg-primary/90 hover:shadow-md active:scale-[0.99]"
                : "opacity-50 cursor-not-allowed"
            )}
          >
            <span>Continue to Seats</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightsDialog;
