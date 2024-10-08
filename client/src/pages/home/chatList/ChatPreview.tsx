import React, { useCallback, useMemo } from "react";
import { Chat } from "../../../interfaces";
import { Card, CardActionArea, CardHeader } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

interface Props {
  chat: Chat;
  userEmail: string;
  onClick: (id: string) => void;
}
export const ChatPreview: React.FC<Props> = ({ chat, userEmail, onClick }) => {
  const lastMessage = useMemo(() => {
    const { messages } = chat;
    return messages.length > 0 ? messages[0].text : "no messages yet";
  }, [chat]);
  const fromEmail = useMemo(() => {
    const { users } = chat;
    return users.filter((user) => user.email !== userEmail)[0].email;
  }, [chat, userEmail]);

  const handleClick = useCallback(() => onClick(chat._id), [chat, onClick]);

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          align="start"
          avatar={<AccountCircleOutlinedIcon />}
          title={fromEmail}
          subheader={lastMessage}
        ></CardHeader>
      </CardActionArea>
    </Card>
  );
};
