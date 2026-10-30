import Navbar from "@/components/ui/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <AuthSessionProvider>
        {/* <Navbar /> */}

        {children}

        <Toaster position="top-right" richColors />
      </AuthSessionProvider>
    </QueryProvider>
  );
}