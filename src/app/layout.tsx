
import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "@/app/globals.css";
import { AppProviders } from "@/components/providers/app-providers";

export const instant = false;

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Safarni",
  description: "Explore destinations and book your next trip with Safarni.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} ${cairo.variable} h-full antialiased`}
    >
      <body className="app-container min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
