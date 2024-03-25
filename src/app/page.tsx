"use client";

import { useEffect } from "react";
import DragDrop from "@/app/_DragDrop";
import { useDragStore } from "@/stores/useDragStore";
import { todoList } from "@/api/todoList";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

const Home = () => {
  return (
    <div>
      {/* 외부 컴포넌트 적용 */}
      <DragDrop />
    </div>
  );
};

// export
export default Home;
