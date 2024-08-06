// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useState } from "react";

// export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
      })
  );

  useEffect(() => {
    return () => queryClient.clear();
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
