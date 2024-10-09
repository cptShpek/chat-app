import React, { useCallback, useMemo } from "react";
import { Chat } from "../../../interfaces";
import { Card, CardActionArea, CardHeader, styled } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLastMessage } from "../../../hooks";

const StyledCard = styled(Card)({
  "&.active": {
    background: "#1976D2",
    color: "#ffffff",
    "& .MuiCardHeader-subheader": {
      color: "lightgray",
    },
  },
});

interface Props {
  chat: Chat;
  selectedChatId: string;
  userEmail: string;
  onClick: (id: string) => void;
}
export const ChatPreview: React.FC<Props> = ({
  chat,
  selectedChatId,
  userEmail,
  onClick,
}) => {
  const lastMessage = useLastMessage({ chat, email: userEmail });
  const fromEmail = useMemo(() => {
    const { users } = chat;
    return users.filter((user) => user.email !== userEmail)[0].email;
  }, [chat, userEmail]);

  const handleClick = useCallback(() => onClick(chat._id), [chat, onClick]);

  return (
    <StyledCard className={selectedChatId === chat._id ? "active" : ""}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          align="start"
          avatar={<AccountCircleOutlinedIcon />}
          title={fromEmail}
          subheader={lastMessage}
        ></CardHeader>
      </CardActionArea>
    </StyledCard>
  );
};
