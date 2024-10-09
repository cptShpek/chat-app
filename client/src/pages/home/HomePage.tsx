import { Grid2, Paper } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChatList } from "./chatList";
import styled from "@emotion/styled";
import { useUserContext } from "../../providers/user";
import { useFetch } from "../../hooks";
import { ApiRoutes } from "../../constants/routes";
import { Chat as ChartInterface } from "../../interfaces";
import { Chat } from "./chat";

const Container = styled(Grid2)({
  height: "calc(100vh - 70px)",
  maxHeight: "calc(100vh - 70px)",
});

const Item = styled(Paper)({
  backgroundColor: "#fff",
  padding: "5px",
  textAlign: "center",
  height: "100%",
  minHeight: "100%",
});

export const HomePage: React.FC = () => {
  const [loading, appFetch] = useFetch();
  const [chats, setChats] = useState<ChartInterface[]>([]);
  const chatContainerRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState<ChartInterface | null>(null);
  const { user } = useUserContext();

  const fetchChats = useCallback(
    async (id: string) => {
      const { data } = await appFetch(ApiRoutes.CHAT, {
        method: "POST",
        reqBody: { id },
      });
      setChats(data);
    },
    [appFetch, setChats]
  );

  const handleChatClicked = useCallback(
    (id: string) =>
      setSelectedChat(() => chats.find((v) => v._id === id) || null),
    [chats]
  );

  const handleMessageSubmit = useCallback(
    async (text: string) => {
      if (selectedChat) {
        const chatId = selectedChat._id;
        const fromEmail = user.email;
        const { data, success } = await appFetch(
          ApiRoutes.CHAT + "/" + chatId,
          {
            method: "POST",
            reqBody: {
              text,
              fromEmail,
            },
          }
        );
        if (success) {
          setSelectedChat((v) => {
            v?.messages.push(data);
            return v;
          });
        }
      }
    },
    [selectedChat, user, appFetch, setSelectedChat]
  );

  useEffect(() => {
    if (user.isActive) {
      fetchChats(user._id);
    }
  }, [user, fetchChats]);

  return (
    <Container container spacing={1} padding={0.5}>
      <Grid2 size={3}>
        <Item>
          <ChatList
            chats={chats}
            selectedChatId={selectedChat?._id || ""}
            userEmail={user.email}
            onClick={handleChatClicked}
          />
        </Item>
      </Grid2>
      <Grid2 size={9} ref={chatContainerRef}>
        <Item>
          <Chat
            selectedChat={selectedChat}
            onSubmit={handleMessageSubmit}
            email={user.email}
          />
        </Item>
      </Grid2>
    </Container>
  );
};
