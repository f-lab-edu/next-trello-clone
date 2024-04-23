"use client";

import { useEffect, useState } from "react";
import DragDrop from "@/app/_components/TodoListDragAndDrop";
import { useTodoListInfiniteQuery } from "@/api/todoList";
import { useInView } from "react-intersection-observer";
import { TodoListProps } from "TodoListDragAndDrop";

const Home = () => {
  const [todoList, setTodoList] = useState<TodoListProps | undefined>();
  const [ref, inView] = useInView();
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useTodoListInfiniteQuery();

  useEffect(() => {
    if (inView) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
    if (data) {
      const allTodos = data.pages.flatMap((page) => page.todos);
      const allLists = data.pages.flatMap((page) => page.lists);

      setTodoList({ todos: allTodos, lists: allLists });
    }
  }, [inView, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error has occurred</div>;
  }

  return (
    <div>
      {todoList ? (
        <DragDrop todoListData={todoList}>
          <div ref={ref}></div>
        </DragDrop>
      ) : null}
    </div>
  );
};

export default Home;
