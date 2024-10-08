import React, { useMemo } from "react";
import { Chat as ChatInterface } from "../../../interfaces";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

interface Props {
  selectedChat: ChatInterface | null;
}

export const Chat: React.FC<Props> = ({ selectedChat }) => {
  const messages = useMemo(() => selectedChat?.messages || [], [selectedChat]);
  return (
    <>
      {!selectedChat && <PlaceHolder />}
      {selectedChat && <Typography variant="h3">chat selected</Typography>}
    </>
  );
};

const PlaceHolder: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
    >
      <Typography variant="h4">Select Chat to Start</Typography>
    </Box>
  );
};
