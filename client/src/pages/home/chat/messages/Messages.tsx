import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { Chat } from "../../../../interfaces";
import { Message } from "./Message";
import styled from "@emotion/styled";

interface Props {
  chat: Chat;
  email: string;
}

const Container = styled(Box)({
  width: "100%",
  display: "flex",
  padding: "5px",
  flexDirection: "column",
  justifyContent: "flex-start",
  overflowY: "scroll",
  gap: "5px",
  "& .from": {
    alignSelf: "flex-end",
  },
  "& .to": {
    alignSelf: "flex-start",
  },
});

export const Messages: React.FC<Props> = ({ chat, email }) => {
  const messages = useMemo(() => chat.messages, [chat]);
  return (
    <Container>
      {messages.map((message, i) => (
        <Message message={message} email={email} key={i} />
      ))}
    </Container>
  );
};
