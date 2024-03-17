/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { css } from "@emotion/react";
import AddList from "./AddList";
import AddTodo from "./AddTodo";
import { useUpdateTodoListMutation } from "@/api/todoList";
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
}

const StyledTodoDiv = (draggingTodoId: number | null, id: number) => css`
  user-select: none;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: ${draggingTodoId === id ? "#555" : "#eee"};
`;

const StyledListDiv = () => css`
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
}) => {
  const [draggingTodoId, setDraggingTodoId] = useState<number | null>(null);
  const [dragOverTodoId, setDragOverTodoId] = useState<number | null>(null);
  const [draggingListId, setDraggingListId] = useState<number | null>(null);
  const [dragOverListId, setDragOverListId] = useState<number | null>(null);
  const updateTodoList = useUpdateTodoListMutation();

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
    setDraggingItemId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    setDragOverItemId(id);
  };

  const handleDropOnItem = (
    e: React.DragEvent<HTMLDivElement>,
    targetList: number,
  ) => {
    e.preventDefault();
    if (draggingItemId) {
      const newTodoList = [...todos];
      const draggingItemIndex = newTodoList.findIndex(
        (todo) => todo.id === draggingItemId,
      );
      const dragOverItemIndex = newTodoList.findIndex(
        (todo) => todo.id === dragOverItemId,
      );
      const draggingItemContent = newTodoList[draggingItemIndex];
      draggingItemContent.list = targetList;
      newTodoList.splice(draggingItemIndex, 1);
      newTodoList.splice(dragOverItemIndex, 0, draggingItemContent);

      setDraggingItemId(null);
      setDragOverItemId(null);
      setTodos(newTodoList);
    }
  };

  const handleDragEnd = () => {
    setDraggingItemId(null);
    setDragOverItemId(null);
  };

  // Card Todo List 드레그 앤 드롭 컨트롤
  const handleDragCardStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: number,
  ) => {
    e.stopPropagation();
    setDraggingCardId(id);
  };

  const handleDragCardOver = (
    e: React.DragEvent<HTMLDivElement>,
    id: number,
  ) => {
    e.preventDefault();
    setDragOverCardId(id);
  };

  const handleDropOnCard = (
    e: React.DragEvent<HTMLDivElement>,
    targetList: number,
  ) => {
    // Item
    e.preventDefault();
    if (draggingItemId) {
      handleDropOnItem(e, targetList);
    }

    // card
    if (draggingCardId) {
      const newList = [...lists];
      const draggingCardIndex = newList.findIndex(
        (list) => list.id === draggingCardId,
      );
      const dragOverCardIndex = newList.findIndex(
        (list) => list.id === dragOverCardId,
      );
      const draggingCardContent = newList[draggingCardIndex];
      newList.splice(draggingCardIndex, 1);
      newList.splice(dragOverCardIndex, 0, draggingCardContent);

      setDraggingCardId(null);
      setDragOverCardId(null);
      setLists(newList);
    }
    // updateTodoList.mutate({ todos, lists });
    // console.log("drag and drop");
  };

  const handleDragCardEnd = () => {
    setDraggingCardId(null);
    setDragOverCardId(null);
  };

  return (
    <div css={StyledListDiv}>
      {lists.map((list) => (
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
          <h2
            css={css`
              color: #eee;
            `}
          >
            {list.title}
          </h2>
          <div>
            {todos
              .filter((todo) => todo.list === list.todoList)
              .map((todo, index) => (
                <div
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
                  css={StyledTodoDiv(draggingTodoId, todo.id)}
                >
                  {todo.text}
                </div>
              ))}
            <AddTodo listNum={list.todoList} />
          </div>
        </Card>
      ))}
      <AddList />
    </div>
  );
};

export default DragDrop;
