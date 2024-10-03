import styled from "@emotion/styled";
import React, { useCallback, useMemo, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { getInputValue } from "../../utils";
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

export const LoginPage: React.FC = () => {
  const { loading, login } = useLogin();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const empty = useMemo(() => !password || !email, [password, email]);

  const handleMouseDownUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e: any) => {
    const value = getInputValue(e);
    setPassword(value);
  };

  const handleUsernameChange = (e: any) => {
    const value = getInputValue(e);
    setEmail(value);
  };

  const handleSubmit = useCallback(
    () => login({ email, password }),
    [email, password, login]
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
        <Typography variant="h2">Login</Typography>
        <FormControl fullWidth required>
          <InputLabel htmlFor="email">Username</InputLabel>
          <Input
            id="email"
            placeholder="email"
            value={email}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={show ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShow((v) => !v)}
                  onMouseDown={handleMouseDownUpPassword}
                  onMouseUp={handleMouseDownUpPassword}
                  edge="end"
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          disabled={empty}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </Paper>
    </Container>
  );
};
