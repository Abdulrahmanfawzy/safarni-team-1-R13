import { Plane } from "lucide-react";
import { Flight } from "../types/TypesFlights";
import { cn } from "@/lib/utils";

const FlightCard = ({
  flight,
  isSelected = false,
  onSelect,
}: {
  flight: Flight;
  isSelected?: boolean;
  onSelect?: (flight: Flight) => void;
}) => (
  <button
    type="button"
    onClick={() => onSelect?.(flight)}
    className={cn(
      "relative w-full text-left bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] px-5 py-4 hover:shadow-md transition-all cursor-pointer border-2",
      isSelected
        ? "border-vivid border-app-vivid-green shadow-md ring-1 ring-vivid-green/30"
        : "border-transparent"
    )}
  >
    {/* ticket notches */}
    <span className="absolute -left-2 top-[62%] size-4 rounded-full bg-gray-50 shadow-inner" />
    <span className="absolute -right-2 top-[62%] size-4 rounded-full bg-gray-50 shadow-inner" />

    <div className="flex items-start justify-between">
      <div>
        <p className="text-base font-medium text-gray-900">{flight.departTime}</p>
        <p className="text-sm text-gray-500">{flight.from}</p>
      </div>

      <div className="flex flex-col items-center text-xs text-gray-700">
        <Plane className="size-3 rotate-45" />
        <span>{flight.duration}</span>
      </div>

      <div className="text-right">
        <p className="text-base font-medium text-gray-900">{flight.arriveTime}</p>
        <p className="text-sm text-gray-500">{flight.to}</p>
      </div>
    </div>

    <p className="mt-2 text-[10px] text-gray-500">{flight.layover}</p>

    <div className="flex items-center justify-between mt-2">
      <p className="text-base font-medium text-gray-900">{flight.airline}</p>
      <p className="text-base font-medium text-gray-900">$ {flight.price.toLocaleString()}</p>
    </div>
  </button>
);
export default FlightCard