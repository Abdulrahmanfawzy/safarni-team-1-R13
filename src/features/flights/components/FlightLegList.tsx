import { Plane } from "lucide-react";
import type { Flight } from "../types/TypesFlights";

type FlightLegListProps = {
  departure: Flight;
  returnDate?: Date | string | undefined;
};

export const FlightLegList = ({
  departure,
  returnDate,
}: FlightLegListProps) => {
  const allFlights = [departure];

  if (returnDate) {
    allFlights.push(departure);
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">
      {allFlights.map((flight, index) => (
        <div
          key={index}
          className="flex items-center gap-2 relative text-gray-700 text-sm"
        >
          {/* Plane icon */}
          <Plane className="size-4 shrink-0" />

          {/* Trip summary */}
          <div className="flex-1">
            <p className="flex items-baseline gap-1">
              <span>{flight.departTime}</span>
              <span className="text-gray-400">→</span>
              <span>{flight.arriveTime}</span>
            </p>

            <p className="text-xs text-gray-500">
              {index === 0 ? "Departure flight" : "Return flight"}
            </p>
          </div>

          {/* Divider line */}
          {index < allFlights.length - 1 && (
            <div className="absolute left-2 top-5 bottom-[-24px] w-px bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
};
