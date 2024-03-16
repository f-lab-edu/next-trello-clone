import React, { useState } from "react";
import { Card } from "@mui/material";
import AddList from "./AddList";
import AddTodo from "./AddTodo";

interface DataValues {
  id: number;
  title: string;
  listNum: number;
}

interface DragDropValues {
  todos: DataValues[];
  lists: DataValues[];
  setTodos: (props: DataValues[]) => void;
  setLists: (props: DataValues[]) => void;
}

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
    <div
      style={{
        display: "flex",
        height: "90vh",
        alignItems: "flex-start",
        overflowX: "auto",
      }}
    >
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
          style={{
            minHeight: "50px",
            minWidth: "20vw",
            margin: "8px",
            padding: "10px",
            backgroundColor: "#333",
            display: "inline-block",
            flexShrink: 0,
          }}
        >
          <h2 style={{ color: "#eee" }}>{list.title}</h2>
          <div>
            {todos
              .filter((todo) => todo.listNum === list.listNum)
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
                  style={{
                    userSelect: "none",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    backgroundColor:
                      draggingTodoId === todo.id ? "#555" : "#eee",
                  }}
                >
                  {todo.title}
                </div>
              ))}
            <AddTodo listNum={list.listNum} />
          </div>
        </Card>
      ))}
      <AddList />
    </div>
  );
};

export default DragDrop;
