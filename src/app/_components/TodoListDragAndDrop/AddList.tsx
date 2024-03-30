/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDragStore } from "@/stores/useDragStore";
import { useCreateListMutation } from "@/api/todoList";
import styled from "@emotion/styled";

const Container = styled("div")`
  display: inline-block;
  flex-shrink: 0;
  min-width: 20vw;
  margin: 8px;
`;

const AddList = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState("");
  const { addList } = useDragStore();
  const addListMutation = useCreateListMutation();

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleConfirmClick = () => {
    addListMutation.mutate({ title: listName });
    addList(listName);
    setIsAdding(false);
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
            borderRadius: "8px",
            marginBottom: "8px",
          }}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
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
      sx={{ mt: 1, mr: 1, flexShrink: 0, minWidth: "20vw" }}
      variant="contained"
      onClick={handleAddClick}
    >
      + Add List
    </Button>
  );
};

export default AddList;
