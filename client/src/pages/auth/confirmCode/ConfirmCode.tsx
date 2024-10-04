import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useHandleInputChange } from "../../../hooks";
import { ActivateUser } from "../../../interfaces";

interface Props {
  onCodeConfirm: (input: ActivateUser) => void;
}

export const ConfirmCode: React.FC<Props> = ({ onCodeConfirm }) => {
  const [OTPCode, setOTPCode] = useState("");
  const [email, setEmail] = useState("");
  const empty = useMemo(() => !OTPCode || !email, [email, OTPCode]);

  const handleEmailChange = useHandleInputChange(setEmail);

  const handleOTPCodeChange = useHandleInputChange(setOTPCode);

  const handleCodeConfirm = useCallback(() => {
    const input: ActivateUser = { email, OTPCode };
    onCodeConfirm(input);
  }, [email, OTPCode, onCodeConfirm]);
  return (
    <>
      <Typography variant="h2">Confirm Code</Typography>
      <FormControl fullWidth required>
        <InputLabel htmlFor="code">Confirmation Code</InputLabel>
        <Input
          id="code"
          placeholder="code"
          value={OTPCode}
          onChange={handleOTPCodeChange}
        />
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormControl>
      <Button
        disabled={empty}
        fullWidth
        variant="contained"
        onClick={handleCodeConfirm}
      >
        SUBMIT
      </Button>
    </>
  );
};
