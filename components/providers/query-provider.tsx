"use client";

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { toast } from "sonner";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (query.meta?.errorMessage) {
              toast.error(query.meta.errorMessage as string);
            } else {
              toast.error(`Terjadi kesalahan: ${error.message}`);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            if (mutation.options.meta?.errorMessage) {
              toast.error(mutation.options.meta.errorMessage as string);
            } else {
              toast.error(`Gagal menyimpan data: ${error.message}`);
            }
          },
          onSuccess: (_data, _variables, _context, mutation) => {
            if (mutation.options.meta?.successMessage) {
              toast.success(mutation.options.meta.successMessage as string);
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
