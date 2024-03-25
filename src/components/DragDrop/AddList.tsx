import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDragStore } from "@/stores/useDragStore"; // 위에서 생성한 Zustand 스토어를 임포트합니다.
import { useCreateListMutation } from "@/api/todoList";

const StyledDiv = css`
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
    addList(listName);
    setIsAdding(false);
  };

  const handleCancelClick = () => {
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div
        style={{
          display: "inline-block",
          flexShrink: 0,
          minWidth: "20vw",
          margin: "8px",
        }}
      >
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
      </div>
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
