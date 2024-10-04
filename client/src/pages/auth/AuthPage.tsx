import React, { useCallback, useMemo, useState } from "react";
import { Login } from "./login";
import styled from "@emotion/styled";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { SignUp } from "./signUp";
import { useActivateUser, useLogin, useSignUp } from "../../hooks";
import { UserInput } from "../../interfaces/userInput.interface";
import { ConfirmCode } from "./confirmCode";
import { ActivateUser } from "../../interfaces";

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
  const [isLogin, setIsLogin] = useState(true);
  const { loading: loginLoading, login } = useLogin();
  const { loading: signUpLoading, codeSend, setCodeSend, signUp } = useSignUp();
  const { loading: activateLoading, activateUser } = useActivateUser();
  const loading = useMemo(
    () => loginLoading || signUpLoading || activateLoading,
    [signUpLoading, loginLoading, activateLoading]
  );

  const handleLogin = useCallback(
    (input: { email: string; password: string }) => login(input),
    [login]
  );

  const handleSignUp = useCallback(
    (input: UserInput) => signUp(input),
    [signUp]
  );

  const handleCodeConfirm = useCallback(
    async (input: ActivateUser) => {
      const { success } = await activateUser(input);
      if (success) {
        setIsLogin(true);
        setCodeSend(false);
      }
    },
    [setIsLogin, setCodeSend, activateUser]
  );

  const handleModeChange = useCallback(() => {
    setIsLogin((v) => !v);
    setCodeSend(false);
  }, [setCodeSend]);

  return (
    <Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Paper>
        {isLogin && !codeSend && <Login onLogin={handleLogin} />}
        {!isLogin && !codeSend && <SignUp onSignUp={handleSignUp} />}
        {codeSend && <ConfirmCode onCodeConfirm={handleCodeConfirm} />}
        {!codeSend && (
          <Button fullWidth variant="outlined" onClick={handleModeChange}>
            {isLogin ? "SignUp" : "Log in with existing account"}
          </Button>
        )}
      </Paper>
    </Container>
  );
};
