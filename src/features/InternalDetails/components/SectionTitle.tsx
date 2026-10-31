import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  count?: number;
};

export function SectionTitle({ children, count }: SectionTitleProps) {
  return (
    <h2 className="text-base font-semibold text-foreground">
      {children}
      {count !== undefined && (
        <span className="text-primary">({count})</span>
      )}
    </h2>
  );
}