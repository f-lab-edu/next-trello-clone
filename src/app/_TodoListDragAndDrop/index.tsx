/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, ReactNode } from "react";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

import AddList from "./AddList";
import AddTodo from "./AddTodo";
import { useEditTodoListMutation } from "@/api/todoList";

interface DataValues {
  id: number;
  title: string;
  listNum: number;
  Seq?: number;
}

interface DragDropValues {
  todos: DataValues[];
  lists: DataValues[];
  setTodos: (props: DataValues[]) => void;
  setLists: (props: DataValues[]) => void;
  children?: ReactNode;
}

interface TodoContainerProps {
  draggingTodoId: number | null;
  todoId: number;
}

const TodoContainer = styled("div")<TodoContainerProps>`
  user-select: none;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.draggingTodoId === props.todoId ? "#555" : "#eee"};
`;

const ListContainer = styled("div")`
  display: flex;
  height: 90vh;
  align-items: flex-start;
  overflow-x: auto;
`;

const DragDrop: React.FC<DragDropValues> = ({
  todos,
  lists,
  setTodos,
  setLists,
  children,
}) => {
  const [draggingTodoId, setDraggingTodoId] = useState<number | null>(null);
  const [dragOverTodoId, setDragOverTodoId] = useState<number | null>(null);
  const [draggingListId, setDraggingListId] = useState<number | null>(null);
  const [dragOverListId, setDragOverListId] = useState<number | null>(null);
  const updateTodoList = useEditTodoListMutation();

  useEffect(() => {
    updateTodoList.mutate({ todos, lists });
  }, [todos, lists]);

  // Drag&Drop 동작 함수
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: number,
    setDraggingId: (props: number) => void,
  ) => {
    e.stopPropagation();
    setDraggingId(id);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    id: number,
    setDragOverId: (props: number) => void,
  ) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    setDraggingId: (props: null) => void,
    setDragOverId: (props: null) => void,
  ) => {
    e.stopPropagation();
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDropOnTodo = (
    e: React.DragEvent<HTMLDivElement>,
    targetList: number,
  ) => {
    e.preventDefault();
    if (draggingTodoId) {
      const newTodoList = [...todos];
      const draggingItemIndex = newTodoList.findIndex(
        (todo) => todo.id === draggingTodoId,
      );
      const dragOverItemIndex = newTodoList.findIndex(
        (todo) => todo.id === dragOverTodoId,
      );
      const draggingItemContent = newTodoList[draggingItemIndex];
      draggingItemContent.listNum = targetList;
      newTodoList.splice(draggingItemIndex, 1);
      newTodoList.splice(dragOverItemIndex, 0, draggingItemContent);

      setDraggingTodoId(null);
      setDragOverTodoId(null);
      setTodos(newTodoList);
    }
  };

  const handleDropOnList = (
    e: React.DragEvent<HTMLDivElement>,
    targetList: number,
  ) => {
    // todo
    e.preventDefault();
    if (draggingTodoId) {
      handleDropOnTodo(e, targetList);
    }

    // list
    if (draggingListId) {
      const newList = [...lists];
      const draggingCardIndex = newList.findIndex(
        (list) => list.id === draggingListId,
      );
      const dragOverCardIndex = newList.findIndex(
        (list) => list.id === dragOverListId,
      );
      const draggingCardContent = newList[draggingCardIndex];
      newList.splice(draggingCardIndex, 1);
      newList.splice(dragOverCardIndex, 0, draggingCardContent);

      setDraggingListId(null);
      setDragOverListId(null);
      setLists(newList);
    }
  };

  return (
    <ListContainer>
      {lists &&
        lists.map((list) => (
          <Card
            key={list.id}
            draggable
            onDragStart={(e) => handleDragStart(e, list.id, setDraggingListId)}
            onDragOver={(e) => handleDragOver(e, list.id, setDragOverListId)}
            onDrop={(e) => handleDropOnList(e, list.id)}
            onDragEnd={(e) =>
              handleDragEnd(e, setDraggingListId, setDragOverListId)
            }
            sx={{
              minHeight: "50px",
              minWidth: "20vw",
              margin: "8px",
              padding: "10px",
              backgroundColor: "#333",
              display: "inline-block",
              flexShrink: 0,
            }}
          >
            <Typography variant="h6" sx={{ color: " #eee" }}>
              {list.title}
            </Typography>

            <div>
              {todos &&
                todos
                  .filter((todo) => todo.listNum === list.listNum)
                  .map((todo, _index) => (
                    <TodoContainer
                      key={todo.id}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, todo.id, setDraggingTodoId)
                      }
                      onDragOver={(e) =>
                        handleDragOver(e, todo.id, setDragOverTodoId)
                      }
                      onDragEnd={(e) =>
                        handleDragEnd(e, setDraggingTodoId, setDragOverTodoId)
                      }
                      draggingTodoId={draggingTodoId}
                      todoId={todo.id}
                    >
                      {todo.title}
                    </TodoContainer>
                  ))}
              <AddTodo listNum={list.listNum} />
            </div>
          </Card>
        ))}
      {children}
      <AddList />
    </ListContainer>
  );
};

export default DragDrop;
