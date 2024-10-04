import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { getInputValue } from "../../../utils";
import { PasswordInput } from "../../../components/enhanced";

interface Props {
  onLogin: (input: { email: string; password: string }) => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const empty = useMemo(() => !password || !email, [password, email]);

  const handlePasswordChange = (e: any) => {
    const value = getInputValue(e);
    setPassword(value);
  };

  const handleUsernameChange = (e: any) => {
    const value = getInputValue(e);
    setEmail(value);
  };

  const handleSubmit = useCallback(
    () => onLogin({ email, password }),
    [email, password, onLogin]
  );

  return (
    <>
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
      <PasswordInput value={password} onChange={handlePasswordChange} />
      <Button
        disabled={empty}
        fullWidth
        variant="contained"
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </>
  );
};
