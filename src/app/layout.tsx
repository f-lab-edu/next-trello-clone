"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import { setupWorker } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
import { handlers, todoHandlers } from "@/mocks/handlers";

// react-query 세팅
const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // msw mocking
  useEffect(() => {
    const worker = setupWorker(...handlers, ...todoHandlers);
    worker.start();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body style={{ margin: "0px" }}>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  );
};

// export
export default RootLayout;
