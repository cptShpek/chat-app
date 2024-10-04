import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { PasswordInput } from "../../../components/enhanced";
import { useHandleInputChange } from "../../../hooks";

interface Props {
  onLogin: (input: { email: string; password: string }) => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const empty = useMemo(() => !password || !email, [password, email]);

  const handlePasswordChange = useHandleInputChange(setPassword);

  const handleEmailChange = useHandleInputChange(setEmail);

  const handleSubmit = useCallback(
    () => onLogin({ email, password }),
    [email, password, onLogin]
  );

  return (
    <>
      <Typography variant="h2">Login</Typography>
      <FormControl fullWidth required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
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
