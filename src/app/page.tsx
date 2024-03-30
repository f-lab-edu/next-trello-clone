"use client";

import { useEffect } from "react";
import DragDrop from "@/app/_components/TodoListDragAndDrop";
import { useDragStore } from "@/stores/useDragStore";
import { useTodoListInfiniteQuery } from "@/api/todoList";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { todos, lists, setTodos, setLists } = useDragStore();
  const [ref, inView] = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } =
    useTodoListInfiniteQuery();

  useEffect(() => {
    if (inView) {
      // useInfiniteQuery enabled:false 해제
      refetch();
      if (hasNextPage) {
        fetchNextPage();
        if (data) {
          console.log("next data", data);
          const allTodos = data.pages.flatMap((page) => page.todos);
          setTodos(allTodos);

          const allLists = data.pages.flatMap((page) => page.lists);
          setLists(allLists);
        }
      }
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error has occurred</div>;
  }

  return (
    <div>
      {/* 외부 컴포넌트 적용 */}
      <DragDrop
        todos={todos}
        lists={lists}
        setTodos={setTodos}
        setLists={setLists}
      >
        <div ref={ref}></div>
      </DragDrop>
    </div>
  );
};

// export
export default Home;
