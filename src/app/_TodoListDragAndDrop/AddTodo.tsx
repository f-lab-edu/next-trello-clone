/** @jsxImportSource @emotion/react */
import React, { useState, FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useCreateTodoMutation } from "@/api/todoList";
import styled from "@emotion/styled";

interface AddTodoProps {
  listNum: number;
}

const Container = styled("div")`
  display: inline-block,
  flex-shrink: 0,
  min-width: 20vw,
`;

const AddTodo: FC<AddTodoProps> = ({ listNum }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [todoName, setTodoName] = useState("");
  const addTodoMutation = useCreateTodoMutation();

  const handleAddClick = () => {
    setIsAdding(true);
  };
  // post api 변경
  const handleConfirmClick = async () => {
    addTodoMutation.mutate({ title: todoName, listNum: listNum });
    setIsAdding(false);
    setTodoName("");
  };

  const handleCancelClick = () => {
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <Container>
        <TextField
          sx={{
            flexShrink: 0,
            minWidth: "20vw",
            backgroundColor: "#eee",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <div>
          <Button
            sx={{ mr: 1, flexShrink: 0 }}
            variant="contained"
            onClick={handleConfirmClick}
          >
            Confirm
          </Button>
          <Button variant="contained" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Button
      sx={{ mt: 1, flexShrink: 0, minWidth: "20vw" }}
      variant="contained"
      onClick={handleAddClick}
    >
      + Add Todo
    </Button>
  );
};

export default AddTodo;
