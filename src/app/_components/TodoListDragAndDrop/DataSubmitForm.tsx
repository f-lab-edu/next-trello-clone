/** @jsxImportSource @emotion/react */
import React, { useState, FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { AddButtonParams } from "AddButton";

const Container = styled("div")`
  display: inline-block,
  flex-shrink: 0,
  min-width: 20vw,
`;

const DataSubmitForm: FC<AddButtonParams> = ({
  addData,
  children,
  handleClickConfirm,
  onChange,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  // post api 변경
  const handleSubmit = async () => {
    handleClickConfirm();
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
            backgroundColor: "#eee",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
          value={addData}
          onChange={(e) => onChange(e.target.value)}
        />
        <div>
          <Button
            sx={{ mr: 1, flexShrink: 0 }}
            variant="contained"
            onClick={handleSubmit}
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
      {children}
    </Button>
  );
};

export default DataSubmitForm;
