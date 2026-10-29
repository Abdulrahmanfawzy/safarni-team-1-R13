import { SectionTitle } from "./section-title";

type BestTimeToVisitProps = {
  text: string | null;
};

export function BestTimeToVisit({ text }: BestTimeToVisitProps) {
  if (!text) return null;

  return (
    <section className="space-y-3">
      <SectionTitle>Best Time to Visit</SectionTitle>
      <p className="rounded-lg border bg-background px-3 py-2.5 text-sm text-muted-foreground">
        {text}
      </p>
    </section>
  );
}