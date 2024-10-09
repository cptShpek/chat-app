import React, { useMemo } from "react";
import { Chat } from "../interfaces";
import { Typography } from "@mui/material";

interface Props {
  chat: Chat;
  email: string;
}

export const useLastMessage: React.FC<Props> = ({ chat, email }) => {
  const message = useMemo(() => {
    if (!chat) {
      return "No chat selected";
    }
    const { messages } = chat;
    if (!messages || messages.length === 0) {
      return <Typography variant="body2">No messages yet</Typography>;
    }
    const { text, fromEmail } = messages.reduce((a, b) =>
      a.createdAt > b.createdAt ? a : b
    );

    return (
      <Typography variant="body2">
        {fromEmail === email ? "" : "To you: "}
        {text}
      </Typography>
    );
  }, [chat, email]);

  return <>{message}</>;
};
