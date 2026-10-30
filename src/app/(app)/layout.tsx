import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/ui/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import AuthSessionProvider from "@/components/providers/SessionProvider";

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
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="app-container flex flex-col">
        <QueryProvider>
          <AuthSessionProvider>
            <Navbar />
            {children}
          </AuthSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
