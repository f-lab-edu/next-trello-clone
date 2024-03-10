/* / 루트 page 컴포넌트 */
"use client";
// import

import DragDrop from "@/components/DragDrop";
import { QueryClient, QueryClientProvider } from "react-query";

// react-query 세팅
const queryClient = new QueryClient();

// component
const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 외부 컴포넌트 적용 */}
      <DragDrop />
    </QueryClientProvider>
  );
};

// export
export default Home;
