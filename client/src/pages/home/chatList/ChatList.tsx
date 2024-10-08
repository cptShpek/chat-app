import React, { useCallback } from "react";
import { Chat } from "../../../interfaces";
import { ChatPreview } from "./ChatPreview";

interface Props {
  chats: Chat[];
  userEmail: string;
  onClick: (id: string) => void;
}

export const ChatList: React.FC<Props> = ({ chats, userEmail, onClick }) => {
  const handleClick = useCallback((id: string) => onClick(id), [onClick]);

  return (
    <>
      {chats.map((chat, i) => (
        <ChatPreview
          chat={chat}
          key={i}
          userEmail={userEmail}
          onClick={handleClick}
        />
      ))}
    </>
  );
};
