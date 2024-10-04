import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useHandleInputChange } from "../../../hooks";
import { PasswordInput } from "../../../components/enhanced";
import { UserInput } from "../../../interfaces/userInput.interface";

interface Props {
  onSignUp: (input: UserInput) => void;
}

export const SignUp: React.FC<Props> = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const empty = useMemo(
    () => !email || !name || !password || !confirmPassword || !phoneNumber,
    [email, name, password, confirmPassword, phoneNumber]
  );

  const handleEmailChange = useHandleInputChange(setEmail);

  const handleNameChange = useHandleInputChange(setName);

  const handlePasswordChange = useHandleInputChange(setPassword);

  const handleConfirmPasswordChange = useHandleInputChange(setConfirmPassword);

  const handlePhoneNumberChange = useHandleInputChange(setPhoneNumber);

  const handleSubmit = useCallback(() => {
    const input: UserInput = {
      email,
      name,
      password,
      confirmPassword,
      phoneNumber,
    };
    onSignUp(input);
  }, [email, name, password, confirmPassword, phoneNumber, onSignUp]);

  return (
    <>
      <Typography variant="h2">Sing Up</Typography>
      <FormControl fullWidth required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
        />
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <Input
          id="phoneNumber"
          placeholder="phoneNumber"
          value={phoneNumber}
          type="number"
          onChange={handlePhoneNumberChange}
        />
      </FormControl>
      <PasswordInput value={password} onChange={handlePasswordChange} />
      <PasswordInput
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
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
