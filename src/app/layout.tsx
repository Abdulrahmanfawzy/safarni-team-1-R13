import { QueryProvider } from "@/components/providers/query-provider";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full app-container">
        <QueryProvider>
          <Navbar/>
            {children}
            <Toaster  position="top-right" richColors/>
            </QueryProvider>
      </body>
    </html>
  );
}
