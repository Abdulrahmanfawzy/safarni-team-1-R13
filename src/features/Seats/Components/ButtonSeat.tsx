import { cn } from "@/lib/utils";

function Seat({
  seatId,
  number,
  selected,
  onToggle,
  isAvailable = true,
}: {
  seatId: string;
  number: string;
  selected: boolean;
  onToggle: (n: string) => void;
  isAvailable?: boolean;
}) {
  const disabled = !isAvailable;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Seat ${number}, ${disabled ? "unavailable" : selected ? "selected" : "available"}`}
      onClick={() => onToggle(seatId)}
      className={cn(
        "flex size-10 items-center justify-center rounded-[5px] text-[11px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2e3192]",
        disabled && "cursor-not-allowed bg-[#e6e7eb] text-neutral-600",
        !disabled && !selected && "bg-primary text-white hover:bg-[#25277a]",
        selected && "bg-[#03D947] text-neutral-900"
      )}
    >
      {number}
    </button>
  );
}
export default Seat;
