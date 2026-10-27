


import { getFlights } from "../../service/flight.service";
import { Iflight } from "../../types/flight.types";

type Flight = {
  id: number;
  booking_code: string;
  start_at: string;
  end_at: string;
  status: string;
  total_amount: string;
  currency: string;
  adults: number;
  children: number;
  infants: number;
};



const formatTime = (value: string) =>
  new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(value));

const formatFlightDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

const getDuration = (start: string, end: string) => {
  const minutes = Math.max(
    0,
    Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000),
  );

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}h${String(remainingMinutes).padStart(2, "0")}`;
};




export default async function Flight() {
  const data:Iflight[] = await getFlights();

  return (
    <main className="mx-auto max-w-4xl px-4 py-3">
      <div className="space-y-4">
      


{data.map((flight) => (
  <section
    key={flight.id}
    className="rounded-lg border border-[#B22459] px-6 py-4 text-xs text-slate-800"
  >
   
    <div className="grid grid-cols-3 items-center">
      <div>
        <p className="font-medium">✈ Flight</p>
        <p className="mt-3 font-semibold">{formatTime(flight.start_at)}</p>
        <p className="mt-1 text-[10px] text-slate-500">Departure</p>
      </div>

      <div className="text-center text-slate-500">
        <span aria-hidden="true">✈</span>
        <p className="mt-1 text-[10px]">
          {getDuration(flight.start_at, flight.end_at)}
        </p>
      </div>

      <div className="text-right">
        <p>{formatFlightDate(flight.end_at)}</p>
        <p className="mt-3 font-semibold">{formatTime(flight.end_at)}</p>
        <p className="mt-1 text-[10px] text-slate-500">Arrival</p>
      </div>
    </div>

   
    <div className="mt-3 grid grid-cols-4 border-t pt-3 text-center">
      {[
        { value: flight.booking_code, label: "Booking" },
        { value: flight.status, label: "Status" },
        {
          value: `${flight.adults + flight.children + flight.infants}`,
          label: "Travelers",
        },
        { value: `${flight.total_amount} ${flight.currency}`, label: "Total" },
      ].map(({ value, label }) => (
        <div key={label} className="min-w-0 px-1">
          <p className="truncate text-slate-500">{value}</p>
          <p className="mt-1 text-[10px]">{label}</p>
        </div>
      ))}
    </div>
  </section>
))}



      </div>
    </main>
  );
}