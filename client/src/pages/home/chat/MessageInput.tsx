import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useHandleInputChange } from "../../../hooks";

interface Props {
  onSubmit: (value: string) => void;
}

export const MessageInput: React.FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleValueChange = useHandleInputChange(setValue);

  const handleSubmit = useCallback(() => {
    onSubmit(value);
    setValue("");
  }, [onSubmit, value]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        value={value}
        onChange={handleValueChange}
        multiline
        maxRows={4}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type message"
        inputProps={{ "aria-label": "type message" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="submit"
        disabled={!value}
        onClick={handleSubmit}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};
