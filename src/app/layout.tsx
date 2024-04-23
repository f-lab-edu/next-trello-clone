"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import { setupWorker } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
import { handlers } from "@/mocks/handlers";
import styled from "@emotion/styled";

const Body = styled("body")`
  margin: 0px;
`;

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // msw mocking
  useEffect(() => {
    if (typeof window !== "undefined") {
      const worker = setupWorker(...handlers);
      worker.start();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <Body>
          <Header />
          <main>{children}</main>
        </Body>
      </html>
    </QueryClientProvider>
  );
};

// export
export default RootLayout;
