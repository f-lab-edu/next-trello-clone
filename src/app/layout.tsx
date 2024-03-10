// Client Side rendering
"use client";

//import
import { useEffect } from "react";
import Header from "@/components/Header";
import { setupWorker } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
import { handlers } from "./mocks/handlers";

// react-query 세팅
const queryClient = new QueryClient();

// component 생성
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // msw mocking
  useEffect(() => {
    const worker = setupWorker(...handlers);
    worker.start();
  }, []);

  return (
    // react-query QueryClientProvider 사용을 위한 상위 컴포넌트에 지정
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body style={{ margin: "0px" }}>
          <Header />
          {/* Layout UI */}
          <main>{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  );
};

// export
export default RootLayout;
