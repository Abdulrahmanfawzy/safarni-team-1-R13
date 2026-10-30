
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";

import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Safarni",
  description: "Explore destinations and book your next trip with Safarni.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="app-container flex min-h-full flex-col">
        <QueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
