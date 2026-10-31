import { Spec } from "../types/typescars";

export default function SpecItem({ label, value }: Spec) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-md border bg-white px-1.5 py-2 text-center sm:px-2">
      <span className="text-xs font-medium text-slate-900 sm:text-sm">{label}</span>
      <span className="break-words text-[10px] text-slate-500 sm:text-xs">{value === null ? "N/A" : value}</span>
    </div>
  );
}
