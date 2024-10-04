import React, { useCallback, useState } from "react";
import { Login } from "./login";
import styled from "@emotion/styled";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { SignUp } from "./signUp";
import { useLogin } from "../../hooks";

const Container = styled("div")({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Paper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "25px",
  justifyContent: "center",
  width: "500px",
  padding: "15px",
});

export const AuthPage: React.FC = () => {
  const loading = false;
  const [isLogin, setIsLogin] = useState(true);
  const { loading: loginLoading, login } = useLogin();

  const handleLogin = useCallback(
    (input: { email: string; password: string }) => login(input),
    [login]
  );

  return (
    <Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Paper>
        {isLogin ? <Login onLogin={handleLogin} /> : <SignUp />}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => setIsLogin((v) => !v)}
        >
          {isLogin ? "SignUp" : "Log in with existing account"}
        </Button>
      </Paper>
    </Container>
  );
};
