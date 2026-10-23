import { cn } from "@/lib/utils";
import { SeatStatus } from "../types/setsTypes";

function Seat({
  number,
  selected,
  onToggle,
}: {
  number: number;
  selected: boolean;
  onToggle: (n: number) => void;
}) {
    const AVAILABLE_SEATS = new Set([4, 8, 9, 10, 16, 17, 20, 24, 26, 28, 29]);

    const getStatus = (n: number): SeatStatus =>
  AVAILABLE_SEATS.has(n) ? "available" : "unavailable";

  const status = getStatus(number);
  const disabled = status === "unavailable";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Seat ${number}, ${disabled ? "unavailable" : selected ? "selected" : "available"}`}
      onClick={() => onToggle(number)}
      className={cn(
        "flex size-10 items-center justify-center rounded-[5px] text-[11px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2e3192]",
        disabled && "cursor-not-allowed bg-[#e6e7eb] text-neutral-600",
        !disabled && !selected && "bg-primary text-white hover:bg-[#25277a]",
        selected && "bg-vivid-green text-neutral-900"
      )}
    >
      {number}
    </button>
  );
}
export default Seat;