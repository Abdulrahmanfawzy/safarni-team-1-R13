import { cn } from "@/lib/utils";
import { tripTypes } from "../constants/MockData";
import { TripType } from "@/features/flights/utils/flightSearch";

interface Props {
  value: TripType;
  onChange: (type: TripType) => void;
}

const TripTypeTabs = ({ value, onChange }: Props) => (
  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
    {tripTypes.map(({ id, label, icon: Icon }) => (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id as TripType)}
        className={cn(
          "flex items-center justify-center shrink-0 gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer",
          value === id
            ? "bg-primary text-white shadow-xs"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900",
        )}
      >
        <Icon className="size-3.5 sm:size-4" />
        <span>{label}</span>
      </button>
    ))}
  </div>
);

export default TripTypeTabs;