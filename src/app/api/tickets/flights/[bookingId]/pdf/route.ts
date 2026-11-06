import { createFlightTicketPdf } from "@/lib/flight-ticket-pdf";
import { verifyFlightTicketToken } from "@/lib/flight-ticket";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const { bookingId } = await params;
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return new Response("Ticket not found", { status: 404 });

  let ticket;
  try {
    ticket = verifyFlightTicketToken(token);
  } catch {
    return new Response("Ticket not found", { status: 404 });
  }

  if (!ticket || String(ticket.bookingId) !== bookingId) {
    return new Response("Ticket not found", { status: 404 });
  }

  const ticketUrl = new URL(request.url);
  const pdf = createFlightTicketPdf(ticket, ticketUrl.toString());
  const safeBookingCode = ticket.bookingCode.replace(/[^a-zA-Z0-9-]/g, "-");

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="flight-ticket-${safeBookingCode}.pdf"`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
