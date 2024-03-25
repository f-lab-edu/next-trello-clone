"use client";

<<<<<<< HEAD
import DragDrop from "@/components/DragDrop";
=======
import { useEffect } from "react";
import DragDrop from "@/app/_TodoListDragAndDrop";
import { useDragStore } from "@/stores/useDragStore";
import { useTodoListInfiniteQuery } from "@/api/todoList";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
>>>>>>> 04a0201 ([refact] : infiniteQuery 수정)

// component
const Home = () => {
<<<<<<< HEAD
=======
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

>>>>>>> 04a0201 ([refact] : infiniteQuery 수정)
  return (
    <div>
      {/* 외부 컴포넌트 적용 */}
      <DragDrop />
    </div>
  );
};

// export
export default Home;
