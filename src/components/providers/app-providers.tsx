"use client";

import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/Navbar";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <Toaster position="top-right" richColors />
      </SessionProvider>
    </QueryClientProvider>
  );
}

