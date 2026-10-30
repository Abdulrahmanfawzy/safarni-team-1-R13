"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/Navbar";
import NextTopLoader from "nextjs-toploader";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <NextTopLoader color="#1E429F" showSpinner={false} />
        <Navbar />
        {children}
        <Toaster position="top-right" richColors />
      </SessionProvider>
    </QueryClientProvider>
  );
}

