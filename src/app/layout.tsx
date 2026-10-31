import { AppProviders } from "@/components/providers/app-providers";
import { Poppins, Cairo } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const instant = false;

export const metadata: Metadata = {
  metadataBase: new URL("https://safarni-team-1-r13-hg3b-tau.vercel.app"),
  title: {
    default: "Safarni | Travel your way",
    template: "%s | Safarni",
  },
  description: "Discover tours, flights, hotels, and car rentals with Safarni.",
  applicationName: "Safarni",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Safarni",
    title: "Safarni | Travel your way",
    description: "Discover tours, flights, hotels, and car rentals with Safarni.",
    url: "https://safarni-team-1-r13-hg3b-tau.vercel.app",
    images: ["/icon.svg"],
  },
};

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
