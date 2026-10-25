import { Spec } from "../types/typescars";

export default function SpecItem({ label, value }: Spec) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 rounded-md border bg-white px-2 py-2 text-center">
      <span className="text-sm font-medium text-slate-900">{label}</span>
      <span className="text-[10px] text-slate-500">{value}</span>
    </div>
  );
}