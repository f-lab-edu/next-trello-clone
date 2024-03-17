"use client";

import { useEffect } from "react";
import DragDrop from "@/components/DragDrop";
import { useDragStore } from "@/stores/useDragStore";
import { todoList } from "@/api/todoList";
import { useQuery } from "react-query";

const Home = () => {
  const { todos, lists, setTodos, setLists } = useDragStore();
  const { data, isError, isLoading } = useQuery("todos", todoList);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setTodos(data.todos);
      setLists(data.lists);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error has occurred</div>;
  }

  return (
    <div>
      {/* 외부 컴포넌트 적용 */}
      <DragDrop />
    </div>
  );
};

// export
export default Home;
