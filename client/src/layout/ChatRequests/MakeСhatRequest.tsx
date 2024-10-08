import React, { useCallback } from "react";
import { User } from "../../interfaces";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  user: User;
  onSubmit: () => void;
}

export const MakeChatRequest: React.FC<Props> = ({ user, onSubmit }) => {
  const handleSubmit = useCallback(() => onSubmit(), [onSubmit]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
      }}
    >
      <Typography>{(user && user.email) || "no user found"}</Typography>
      <Button size="small" onClick={handleSubmit}>
        submit request
      </Button>
    </Box>
  );
};
