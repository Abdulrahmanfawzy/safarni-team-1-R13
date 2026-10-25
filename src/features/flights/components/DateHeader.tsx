import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

const formatDate = (date: Date | string | undefined) => {
  if (!date) return "";
  if (date instanceof Date) {
    return isNaN(date.getTime()) ? "" : format(date, "MMM do, yyyy");
  }
  try {
    const parsed = new Date(date.includes("T") ? date : `${date}T00:00:00`);
    if (!isNaN(parsed.getTime())) {
      return format(parsed, "MMM do, yyyy");
    }
    const direct = new Date(date);
    if (!isNaN(direct.getTime())) {
      return format(direct, "MMM do, yyyy");
    }
  } catch {
    return String(date);
  }
  return String(date);
};

const DateHeader = ({ date }: { date: Date | string | undefined }) => (
  <div className="flex items-center justify-center gap-2 h-12 bg-white rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-sm text-gray-800">
    <CalendarDays className="size-4" />
    {formatDate(date)}
  </div>
);
export {DateHeader};
