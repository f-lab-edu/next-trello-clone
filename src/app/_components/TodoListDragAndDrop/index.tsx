/** @jsxImportSource @emotion/react */
import React, { useState, ReactNode } from "react";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import AddButton from "./AddButton";
import {
  todoParams,
  listParams,
  TodoListParams,
  DragAndDropParams,
  TodoContainerParams,
} from "TodoListDragAndDrop";

import {
  useEditTodoListMutation,
  useCreateListMutation,
  useCreateTodoMutation,
} from "@/api/todoList";

const TodoContainer = styled("div")<TodoContainerParams>`
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

const DragDrop: React.FC<DragAndDropParams> = ({ todoListData, children }) => {
  const [draggingTodoId, setDraggingTodoId] = useState<number | null>(null);
  const [dragOverTodoId, setDragOverTodoId] = useState<number | null>(null);
  const [draggingListId, setDraggingListId] = useState<number | null>(null);
  const [dragOverListId, setDragOverListId] = useState<number | null>(null);

  const updateTodoList = useEditTodoListMutation();

  // list add functions
  const addListMutation = useCreateListMutation();
  const [listName, setListName] = useState("");
  const handleListConfirmClick = () => {
    addListMutation.mutate({ title: listName });
    setListName("");
  };
  const handleOnChange = (params: string) => {
    setListName(params);
  };

  // todo add functions
  const addTodoMutation = useCreateTodoMutation();
  const [todoName, setTodoName] = useState("");
  const handleTodoConfirmClick = (id: number) => {
    addTodoMutation.mutate({ title: todoName, listNum: id });
    setTodoName("");
  };
  const handleOnChangeTodo = (params: string) => {
    setTodoName(params);
  };

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
    todos: todoParams[],
    lists: listParams[],
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

      updateTodoList.mutate({ todos: newTodoList, lists: lists });
    }
  };

  const handleDropOnList = (
    e: React.DragEvent<HTMLDivElement>,
    targetList: number,
    todos: todoParams[],
    lists: listParams[],
  ) => {
    // todo
    e.preventDefault();
    if (draggingTodoId) {
      handleDropOnTodo(e, targetList, todos, lists);
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

      updateTodoList.mutate({ todos: todos, lists: newList });
    }
  };

  return (
    <ListContainer>
      {todoListData.lists.map((list) => (
        <Card
          key={list.id}
          draggable
          onDragStart={(e) => handleDragStart(e, list.id, setDraggingListId)}
          onDragOver={(e) => handleDragOver(e, list.id, setDragOverListId)}
          onDrop={(e) =>
            handleDropOnList(e, list.id, todoListData.todos, todoListData.lists)
          }
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
            {todoListData.todos &&
              todoListData.todos
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
                    onDrop={(e) =>
                      handleDropOnTodo(
                        e,
                        list.id,
                        todoListData.todos,
                        todoListData.lists,
                      )
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
            <AddButton
              addData={todoName}
              handleClickConfirm={() => handleTodoConfirmClick(list.listNum)}
              onChange={handleOnChangeTodo}
            >
              + Add Todo
            </AddButton>
          </div>
        </Card>
      ))}
      {children}
      <AddButton
        addData={listName}
        handleClickConfirm={handleListConfirmClick}
        onChange={handleOnChange}
      >
        + Add List
      </AddButton>
    </ListContainer>
  );
};

export default DragDrop;
