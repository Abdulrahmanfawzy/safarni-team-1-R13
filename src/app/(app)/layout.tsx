import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/ui/Navbar";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Safarni",
  description: "Explore destinations and book your next trip with Safarni.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <QueryProvider>
      <div className="app-container flex min-h-full flex-col">
          <Suspense fallback={<div className="h-26 border-b border-gray-100 bg-white" aria-hidden="true" />}>
            <Navbar />
          </Suspense>
          {children}
      </div>
    </QueryProvider>
  );
}
