export type TripType = "round" | "multi" | "one-way";

export const isTripType = (v: string | null): v is TripType =>
  v === "round" || v === "multi" || v === "one-way";

// "2026-11-05" -> local Date (avoids the UTC off-by-one from new Date(str))
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