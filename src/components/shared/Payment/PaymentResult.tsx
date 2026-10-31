import Link from "next/link";
import { CircleCheck, CircleX } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

type PaymentResultProps = {
  status: "success" | "failed";
};

export default function PaymentResult({ status }: PaymentResultProps) {
  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-3xl items-center justify-center px-4 py-12">
        <section className="w-full rounded-3xl border border-slate-100 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          {isSuccess ? (
            <CircleCheck
              aria-hidden="true"
              className="mx-auto size-20 text-emerald-500"
              strokeWidth={1.6}
            />
          ) : (
            <CircleX
              aria-hidden="true"
              className="mx-auto size-20 text-rose-500"
              strokeWidth={1.6}
            />
          )}

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            {isSuccess ? "Payment successful" : "Payment failed"}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-slate-600">
            {isSuccess
              ? "Your payment was completed. You can review your booking details in your profile."
              : "We couldn’t complete your payment. You can return to your bookings and try again."}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/profile/booking"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1E429F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E429F]/90"
            >
              View my bookings
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Back to home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
