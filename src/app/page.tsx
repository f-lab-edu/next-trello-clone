"use client";

import { useEffect } from "react";
import DragDrop from "@/components/DragDrop";
import { useDragStore } from "@/stores/useDragStore";

import { todoList } from "@/utils/todoList";
import { useMutation } from "react-query";

const Home = () => {
  const { todos, lists, setTodos, setLists } = useDragStore();
  const initialMutation = useMutation(todoList, {
    onSuccess: (data) => {
      setTodos(data.todos);
      setLists(data.lists);
      console.log(data);
    },
  });
  useEffect(() => {
    initialMutation.mutate();
  }, []);

  return (
    <div>
      {/* 외부 컴포넌트 적용 */}
      <DragDrop
        todos={todos}
        lists={lists}
        setTodos={setTodos}
        setLists={setLists}
      />
    </div>
  );
};

// export
export default Home;
