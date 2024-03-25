"use client";
/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import Header from "@/components/Header";
import { setupWorker } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
import { handlers } from "@/mocks/handlers";
import styled from "@emotion/styled";

// styled
const Body = styled("body")`
  margin: 0px;
`;
// react-query 세팅
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
