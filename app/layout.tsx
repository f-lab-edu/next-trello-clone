// useEffect 사용
"use client";

//import
import { useEffect } from "react";
import Link from "next/link";
import { setupWorker } from "msw";
import { handlers } from "../mocks/handlers";

// component 생성
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // msw mocking
  useEffect(() => {
    const worker = setupWorker(...handlers);
    worker.start();
  }, []);

  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">Home</Link>
          <Link href="/about">about</Link>
        </header>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  );
};

// export
export default RootLayout;
