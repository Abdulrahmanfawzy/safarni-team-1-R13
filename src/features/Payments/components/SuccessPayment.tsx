import { CheckCircle2 } from "lucide-react";

export function SuccessScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 className="size-10 text-emerald-500" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Booking Confirmed!</h2>
        <p className="mt-2 text-sm text-slate-500">
          Your flight has been booked successfully. Check your email for details.
        </p>
      </div>
      <button
        type="button"
        onClick={onDone}
        className="h-12 rounded-xl bg-primary px-8 text-sm font-semibold text-white transition hover:bg-primary/90 active:scale-[0.99]"
      >
        Back to Home
      </button>
    </div>
  );
}
