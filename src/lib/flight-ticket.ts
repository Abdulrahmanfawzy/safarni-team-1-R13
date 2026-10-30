import { createHmac, timingSafeEqual } from "node:crypto";
import type { Iflight } from "@/app/(app)/profile/types/flight.types";

export type FlightTicketData = {
  bookingId: number;
  bookingCode: string;
  status: string;
  flightId: number;
  departureAt: string;
  arrivalAt: string;
  adults: number;
  children: number;
  infants: number;
  totalAmount: string;
  currency: string;
};

function getSigningSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET is required to create flight ticket links.");
  return secret;
}

export function createFlightTicketToken(flight: Iflight) {
  const ticket: FlightTicketData = {
    bookingId: flight.id,
    bookingCode: flight.booking_code,
    status: flight.status,
    flightId: flight.service_item_id,
    departureAt: flight.start_at,
    arrivalAt: flight.end_at,
    adults: flight.adults,
    children: flight.children,
    infants: flight.infants,
    totalAmount: flight.total_amount,
    currency: flight.currency,
  };

  const encoded = Buffer.from(JSON.stringify(ticket)).toString("base64url");
  const signature = createHmac("sha256", getSigningSecret())
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyFlightTicketToken(token: string): FlightTicketData | null {
  const [encoded, providedSignature, ...extra] = token.split(".");
  if (!encoded || !providedSignature || extra.length > 0) return null;

  const expectedSignature = createHmac("sha256", getSigningSecret())
    .update(encoded)
    .digest();
  let suppliedSignature: Buffer;
  try {
    suppliedSignature = Buffer.from(providedSignature, "base64url");
  } catch {
    return null;
  }
  if (
    suppliedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(suppliedSignature, expectedSignature)
  ) {
    return null;
  }

  try {
    const ticket = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as FlightTicketData;
    if (
      typeof ticket.bookingId !== "number" ||
      typeof ticket.bookingCode !== "string" ||
      typeof ticket.departureAt !== "string" ||
      typeof ticket.arrivalAt !== "string" ||
      typeof ticket.totalAmount !== "string" ||
      typeof ticket.currency !== "string"
    ) {
      return null;
    }
    return ticket;
  } catch {
    return null;
  }
}
