import type { Metadata } from "next";
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
          <Navbar />
          {children}
      </div>
    </QueryProvider>
  );
}
