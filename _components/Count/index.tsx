"use client";

// zustand Store 활용 컴포넌트
import React from "react";
import { useStore } from "../../_store";

const CountComponent = () => {
  // Zustand store 사용, 증가 함수만 사용
  const { count, increase } = useStore();

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increase}>Click me</button>
    </div>
  );
};

export default CountComponent;
