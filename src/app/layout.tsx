import { AppProviders } from "@/components/providers/app-providers";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";

export const instant = false;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className} ${cairo.variable} h-full antialiased`}>
      <body className="min-h-full app-container">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
