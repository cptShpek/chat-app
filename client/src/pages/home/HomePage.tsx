import { Grid2, Paper } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Chats } from "./chats";
import styled from "@emotion/styled";
import { useUserContext } from "../../providers/user";
import { useFetch } from "../../hooks";
import { ApiRoutes } from "../../constants/routes";

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
  const { user } = useUserContext();

  const fetchChats = useCallback(
    async (id: string) => {
      const response = await appFetch(ApiRoutes.CHAT, {
        method: "POST",
        reqBody: { id },
      });
      console.log("CHATS: ", { response });
    },
    [appFetch]
  );

  useEffect(() => {
    if (user.isActive) {
      fetchChats(user._id);
    }
  }, [user, fetchChats]);

  return (
    <Container container spacing={1} padding={0.5}>
      <Grid2 size={2}>
        <Item>
          <Chats />
        </Item>
      </Grid2>
      <Grid2 size={10}>
        <Item>
          <h1>hello</h1>
        </Item>
      </Grid2>
    </Container>
  );
};
