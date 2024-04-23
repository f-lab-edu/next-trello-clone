/** @jsxImportSource @emotion/react */
import React, { useState, FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { AddButtonParams } from "DataSubmitForm";

const Container = styled("div")`
  display: inline-block,
  flex-shrink: 0,
  min-width: 20vw,
`;

const DataSubmitForm: FC<AddButtonParams> = ({
  data,
  children,
  onConfirm,
  onChange,
}) => {
  const [openSubmit, setOpenSubmit] = useState(false);

  const handleAddClick = () => {
    setOpenSubmit(true);
  };

  // post api 변경
  const handleSubmit = async () => {
    onConfirm();
    setOpenSubmit(false);
  };

  const handleCancelClick = () => {
    setOpenSubmit(false);
  };

  if (openSubmit) {
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
          value={data}
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
