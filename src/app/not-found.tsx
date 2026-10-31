import Link from "next/link";
import { Compass, SearchX } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <section className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white px-6 py-10 text-center shadow-sm sm:px-12 sm:py-14">
          <div className="relative mx-auto flex size-24 items-center justify-center rounded-full bg-blue-50 text-[#1E429F]">
            <Compass className="size-12" strokeWidth={1.5} aria-hidden="true" />
            <SearchX className="absolute -bottom-1 -right-1 size-8 rounded-full bg-white p-1 text-slate-500" aria-hidden="true" />
          </div>

          <p className="mt-7 text-sm font-bold tracking-[0.2em] text-[#1E429F]">ERROR 404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
            We couldn’t find the page you’re looking for. It may have moved or the address may be incorrect.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1E429F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E429F]/90"
            >
              Go to homepage
            </Link>
            <Link
              href="/flights"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Explore flights
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
