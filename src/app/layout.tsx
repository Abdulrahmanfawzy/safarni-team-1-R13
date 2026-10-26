import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
            {children}
            <Toaster  />
            </QueryProvider>
      </body>
    </html>
  );
}