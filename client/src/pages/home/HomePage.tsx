import { Grid2, Paper } from "@mui/material";
import React from "react";
import { Chats } from "./chats";
import styled from "@emotion/styled";

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
