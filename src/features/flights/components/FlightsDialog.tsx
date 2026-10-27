"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getFlights } from "../constants/MockData";
import { PropsDepartureDate } from "../types/TypesFlights";
import { DateHeader } from "./DateHeader";
import FlightCard from "./FlightCard";
import { cn } from "@/lib/utils";

const toDateKey = (date: Date | string | undefined) =>
  date instanceof Date ? format(date, "yyyy-MM-dd") : String(date ?? "default");

const FlightsDialog = ({
  open,
  onOpenChange,
  departureDate,
  returnDate,
  onSelect,
  selectedDepartureFlightId,
  selectedReturnFlightId,
  passengerCount = "1",
}: PropsDepartureDate) => {
  const router = useRouter();

  const legs = [
    ...(departureDate ? [{ key: "departure" as const, date: departureDate }] : []),
    ...(returnDate ? [{ key: "return" as const, date: returnDate }] : []),
  ];

  const hasReturnLeg = legs.some((leg) => leg.key === "return");
  const canProceed = hasReturnLeg
    ? Boolean(selectedDepartureFlightId && selectedReturnFlightId)
    : Boolean(selectedDepartureFlightId);

  const handleContinue = () => {
    if (!canProceed) return;
    onOpenChange(false);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPassengers", String(passengerCount));
    }

    const params = new URLSearchParams({ passengers: String(passengerCount) });
    if (selectedDepartureFlightId) params.set("departureFlight", selectedDepartureFlightId);
    if (selectedReturnFlightId) params.set("returnFlight", selectedReturnFlightId);

    router.push(`/flights/seats?${params.toString()}`);
  };

  const getPrice = (date: Date | undefined, id: string | null | undefined) => {
    if (!date || !id) return 0;
    return getFlights(toDateKey(date)).find((f) => f.id === id)?.price ?? 0;
  };

  const totalPrice =
    getPrice(departureDate, selectedDepartureFlightId) +
    getPrice(returnDate, selectedReturnFlightId);

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
              const selectedId =
                leg.key === "departure" ? selectedDepartureFlightId : selectedReturnFlightId;

              return (
                <div key={leg.key} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {leg.key === "departure" ? "Departure Flight" : "Return Flight"}
                    </span>
                    {selectedId && (
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Selected
                      </span>
                    )}
                  </div>
                  <DateHeader date={leg.date} />
                  {getFlights(toDateKey(leg.date)).map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      isSelected={selectedId === flight.id}
                      onSelect={(f) => onSelect?.(f.id, leg.key)}
                    />
                  ))}
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
                  {hasReturnLeg ? "Both flights selected" : "Flight selected"}
                </span>
                {totalPrice > 0 && (
                  <span className="text-gray-500 text-xs ml-1">
                    (Total:{" "}
                    <span className="font-semibold text-primary">
                      ${totalPrice.toLocaleString()}
                    </span>
                    )
                  </span>
                )}
              </div>
            ) : (
              <span className="text-gray-500 text-xs sm:text-sm">
                {hasReturnLeg
                  ? !selectedDepartureFlightId && !selectedReturnFlightId
                    ? "Please select departure and return flights to proceed"
                    : !selectedDepartureFlightId
                      ? "Please select a departure flight"
                      : "Please select a return flight"
                  : "Please select a departure flight to proceed"}
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
                : "opacity-50 cursor-not-allowed",
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