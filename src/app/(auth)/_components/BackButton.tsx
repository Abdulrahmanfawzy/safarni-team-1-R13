"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
 
interface BackButtonProps {
  hrefName: string;
}

export function BackButton({ hrefName }: BackButtonProps) {
  return (
    <Link
      href={hrefName}
      aria-label="Go back"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-14"
    >
      <ChevronLeft aria-hidden="true" className="size-5 text-[#0D0D0D] sm:size-6" />
    </Link>
  );
}
