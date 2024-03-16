"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { useDragStore } from "@/stores/useDragStore";
import AddList from "./AddList";
import AddTodo from "./AddTodo";
import { useMutation } from "react-query";
import { todoList } from "@/utils/todoList";

const DragDrop = () => {
  const { todos, lists, setTodos, setLists } = useDragStore();
  const [draggingItemId, setDraggingItemId] = useState<number | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<number | null>(null);
  const [draggingCardId, setDraggingCardId] = useState<number | null>(null);
  const [dragOverCardId, setDragOverCardId] = useState<number | null>(null);

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

  // Todo 리스트 요소 컨트롤
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
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
  };

  const handleDragCardEnd = () => {
    setDraggingCardId(null);
    setDragOverCardId(null);
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
          onDragStart={(e) => handleDragCardStart(e, list.id)}
          onDragOver={(e) => handleDragCardOver(e, list.id)}
          onDrop={(e) => handleDropOnCard(e, list.id)}
          onDragEnd={handleDragCardEnd}
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
          <h2 style={{ color: "#eee" }}>{list.listName}</h2>
          <div>
            {todos
              .filter((todo) => todo.list === list.todoList)
              .map((todo, index) => (
                <div
                  key={todo.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, todo.id)}
                  onDragOver={(e) => handleDragOver(e, todo.id)}
                  onDrop={(e) => handleDropOnItem(e, list.id)}
                  onDragEnd={handleDragEnd}
                  style={{
                    userSelect: "none",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    backgroundColor:
                      draggingItemId === todo.id ? "#555" : "#eee",
                  }}
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
