
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FilterHeading({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-sm font-semibold">
        {title}{" "}
        {hint && (
          <span className="font-normal text-muted-foreground">
            {hint}
          </span>
        )}
      </h3>
      {action}
    </div>
  );
}

export function Pill({
  selected,
  onClick,
  className,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-auto rounded-full px-4 py-2.5 text-xs font-medium",
        selected
          ? "border-[#1E429F] bg-[#1E429F]/10 text-[#1E429F] hover:bg-[#1E429F]/15 hover:text-[#1E429F]"
          : "border-border bg-background text-muted-foreground hover:border-[#1E429F]/50 hover:bg-background",
        className,
      )}
    >
      {children}
    </Button>
  );
}
