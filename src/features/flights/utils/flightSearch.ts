export type TripType = "round" | "multi" | "one-way";

export const isTripType = (v: string | null): v is TripType =>
  v === "round" ||
  v === "round_trip" ||
  v === "multi" ||
  v === "multi_city" ||
  v === "one-way" ||
  v === "one_way" ||
  v === "oneway";

export const normalizeTripType = (v: string | null): TripType => {
  if (v === "multi" || v === "multi_city") return "multi";
  if (v === "one-way" || v === "one_way" || v === "oneway") return "one-way";
  return "round";
};

export const extractFlights = (
  value: unknown,
  leg: "departure" | "return" = "departure",
): unknown[] | null => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "object" || value === null) return null;

  const record = value as Record<string, unknown>;
  const legKeys =
    leg === "departure"
      ? ["outbound_flights", "outboundFlights", "departure_flights", "departureFlights"]
      : ["return_flights", "returnFlights", "inbound_flights", "inboundFlights"];

  for (const key of [...legKeys, "flights", "results", "items", "data"]) {
    if (!(key in record)) continue;
    const flights = extractFlights(record[key], leg);
    if (flights) return flights;
  }
  return null;
};

export const parseDate = (value: string | null): Date | undefined => {
  if (!value) return undefined;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? undefined : date;
};

export const formatDate = (date?: Date): string | null => {
  if (!date) return null;
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${mm}-${dd}`;
};
