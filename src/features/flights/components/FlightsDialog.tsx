"use client";

import { CalendarDays, ChevronLeft, Plane } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Flight = {
  id: string;
  departTime: string;
  arriveTime: string;
  from: string;
  to: string;
  duration: string;
  layover: string;
  airline: string;
  price: number;
};

const getFlights = (date: string): Flight[] => [
  { id: `${date}-1`, departTime: "7:05 AM", arriveTime: "8:55 PM", from: "YUL", to: "YUL", duration: "18:55", layover: "1 layover: YYZ (3:55)", airline: "Scoot", price: 1300 },
  { id: `${date}-2`, departTime: "9:05 AM", arriveTime: "4:05 PM", from: "YUL", to: "YUL", duration: "18:55", layover: "1 layover: YYZ (3:55)", airline: "Scoot", price: 1400 },
  { id: `${date}-3`, departTime: "9:05 AM", arriveTime: "4:55 PM", from: "YUL", to: "YUL", duration: "18:55", layover: "1 layover: YYZ (3:55)", airline: "Scoot", price: 1300 },
];

const formatDate = (date: string) => format(new Date(`${date}T00:00:00`), "MMM do, yyyy");

const FlightCard = ({
  flight,
  onSelect,
}: {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}) => (
  <button
    type="button"
    onClick={() => onSelect(flight)}
    className="relative w-full text-left bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] px-5 py-4 hover:shadow-md transition-shadow"
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

    <div className="flex items-center justify-between">
      <p className="text-base font-medium text-gray-900">{flight.airline}</p>
      <p className="text-base font-medium text-gray-900">$ {flight.price.toLocaleString()}</p>
    </div>
  </button>
);

const DateHeader = ({ date }: { date: string }) => (
  <div className="flex items-center justify-center gap-2 h-12 bg-white rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-sm text-gray-800">
    <CalendarDays className="size-4" />
    {formatDate(date)}
  </div>
);

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departureDate: string;
  returnDate?: string;
  onSelect?: (flight: Flight, leg: "departure" | "return") => void;
};

const FlightsDialog = ({ open, onOpenChange, departureDate, returnDate, onSelect }: Props) => {
  const legs = [
    { key: "departure" as const, date: departureDate },
    ...(returnDate ? [{ key: "return" as const, date: returnDate }] : []),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-full overflow-y-auto h-[90%] bg-gray-50 p-6 md:max-w-7xl md:h-[80%]  ">
        <DialogTitle className="sr-only">Available flights</DialogTitle>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Back"
          className="size-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className={legs.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
          {legs.map((leg) => (
            <div key={leg.key} className="flex flex-col gap-4">
              <DateHeader date={leg.date} />
              {getFlights(leg.date).map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onSelect={(f) => onSelect?.(f, leg.key)}
                />
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightsDialog;