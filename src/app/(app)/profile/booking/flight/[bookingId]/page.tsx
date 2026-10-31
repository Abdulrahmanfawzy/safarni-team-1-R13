import Link from "next/link";
import { notFound } from "next/navigation";
import FlightTicketCard from "@/app/(app)/profile/_components/Flight/FlightTicketCard";
import { getFlights } from "@/app/(app)/profile/service/flight.service";
import { createFlightTicketToken } from "@/lib/flight-ticket";

export default async function FlightTicketPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const flights = await getFlights();
  const flight = flights.find((booking) => String(booking.id) === bookingId);

  if (!flight) notFound();

  return (
    <main className="mx-auto max-w-4xl space-y-5 px-4 py-12">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Your flight ticket</h1>
        <p className="mt-2 text-sm text-slate-600">
          Payment is complete. Save your ticket PDF or scan its QR code to download it.
        </p>
      </div>
      <FlightTicketCard flight={flight} ticketToken={createFlightTicketToken(flight)} />
      <Link href="/profile/booking" className="inline-flex text-sm font-medium text-[#B22459] hover:underline">
        Back to my bookings
      </Link>
    </main>
  );
}
