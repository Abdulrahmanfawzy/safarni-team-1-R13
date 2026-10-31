import FlightTicketCard from "./FlightTicketCard";
import { getFlights } from "../../service/flight.service";
import { createFlightTicketToken } from "@/lib/flight-ticket";
import type { Iflight } from "../../types/flight.types";

export default async function Flight() {
  const data: Iflight[] = await getFlights();

  return (
    <main className="mx-auto max-w-4xl px-4 py-3">
      <div className="space-y-4">
        {data.map((flight) => (
          <FlightTicketCard
            key={flight.id}
            flight={flight}
            ticketToken={createFlightTicketToken(flight)}
          />
        ))}
      </div>
    </main>
  );
}
