import { Plan } from "../types/typescars";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
export default function PlanOption({
  plan,
  selected,
}: {
  plan: Plan;
  selected: boolean;
}) {
  const Icon = plan.icon;

  return (
    <Label
      htmlFor={`plan-${plan.id}`}
      className={cn(
        "flex w-full cursor-pointer items-stretch overflow-hidden rounded-lg border bg-white p-0 font-normal transition-colors",
        "focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2",
        selected ? "border-indigo-400" : "border-slate-200"
      )}
    >
      <RadioGroupItem
        id={`plan-${plan.id}`}
        value={plan.id}
        className="sr-only"
      />

      {/* Price column */}
      <div
        className={cn(
          "flex w-24 shrink-0 flex-col items-center justify-center gap-1 py-4",
          selected ? "bg-blue-100 text-primary-900" : "bg-slate-100 text-slate-500"
        )}
      >
        <Icon className="size-3.5" aria-hidden />
        <span className="text-lg font-medium">${plan.price}</span>
      </div>

      {/* Details column */}
      <div className="flex flex-col justify-center gap-1 px-4 py-4">
        <span className="text-base font-medium text-slate-900">
          {plan.title}
        </span>
        <span className="text-xs text-slate-500">{plan.description}</span>
      </div>
    </Label>
  );
}
