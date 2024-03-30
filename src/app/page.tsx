"use client";

import { useEffect, useState } from "react";
import DragDrop from "@/app/_components/TodoListDragAndDrop";
import { useDragStore } from "@/stores/useDragStore";
import { useTodoListInfiniteQuery } from "@/api/todoList";
import { useInView } from "react-intersection-observer";

interface DataValues {
  id: number;
  title: string;
  listNum: number;
  Seq: number;
}
interface TodoList {
  todos: DataValues[];
  lists: DataValues[];
}
const Home = () => {
  const { todos, lists, setTodos, setLists } = useDragStore();
  const [todoList, setTodoList] = useState<TodoList | undefined>();
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
      setTodos(allTodos);

      const allLists = data.pages.flatMap((page) => page.lists);
      setLists(allLists);
      setTodoList({ todos: allTodos, lists: allLists });
      console.log("inview", todoList);
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
      {/* 외부 컴포넌트 적용 */}
      {todoList ? (
        <DragDrop
          todoListData={todoList}
          todos={todos}
          lists={lists}
          setTodos={setTodos}
          setLists={setLists}
        >
          <div ref={ref}></div>
        </DragDrop>
      ) : null}
    </div>
  );
};

// export
export default Home;
