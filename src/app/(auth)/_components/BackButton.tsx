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
      className="mb-4 rounded-full bg-gray-100 p-4 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <ChevronLeft aria-hidden="true" />
    </Link>
  );
}
