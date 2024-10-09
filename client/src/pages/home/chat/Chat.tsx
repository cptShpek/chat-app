import React, { useCallback, useEffect, useMemo } from "react";
import { Chat as ChatInterface } from "../../../interfaces";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { MessageInput } from "./MessageInput";
import { Messages } from "./messages";
import styled from "@emotion/styled";

interface Props {
  selectedChat: ChatInterface | null;
  email: string;
  onSubmit: (value: string) => void;
}

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 90px)",
  maxHeight: "calc(100vh - 90px)",
});

export const Chat: React.FC<Props> = ({ selectedChat, email, onSubmit }) => {
  const messages = useMemo(() => selectedChat?.messages || [], [selectedChat]);

  const handleSubmit = useCallback(
    (value: string) => onSubmit(value),
    [onSubmit]
  );

  return (
    <>
      {!selectedChat && <PlaceHolder text="Select Chat to Start" />}
      {selectedChat && (
        <Wrapper>
          {(!messages || messages.length === 0) && (
            <PlaceHolder text="No Messages Yet" />
          )}
          {messages && messages.length > 0 && (
            <Messages chat={selectedChat} email={email} />
          )}
          <MessageInput onSubmit={handleSubmit} />
        </Wrapper>
      )}
    </>
  );
};

const PlaceHolder: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexGrow={2}
      alignItems="center"
      minHeight="100%"
    >
      <Typography variant="h5">{text}</Typography>
    </Box>
  );
};
