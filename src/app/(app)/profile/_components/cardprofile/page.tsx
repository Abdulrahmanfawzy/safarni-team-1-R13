import Link from "next/link";

import { ReactNode } from "react";

type CardProfileProps = {
  icon: ReactNode;
  title: string;
  href: string;
};

export default function CardProfile({ icon, title , href }: CardProfileProps) {
  return (
    <Link
      href={href}
      className="flex w-full items-center justify-between p-2 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3F52B4]"
    >
      <span className="flex min-w-0 items-center gap-3 py-3 text-left sm:px-5 sm:py-4">
        {icon}
        <span className="text-sm text-gray-800 sm:text-base">{title}</span>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
        className="size-4 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </Link>
  );
}
