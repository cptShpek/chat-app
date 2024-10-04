import { Box, FormControl, Input, InputLabel } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useHandleInputChange } from "../../hooks";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  padding: "10px 0",
});

interface Props {
  onSubmit: (email: string) => void;
}

export const SearchUserInput: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = useHandleInputChange(setEmail);

  const handleSubmit = useCallback(() => onSubmit(email), [email, onSubmit]);

  return (
    <Container>
      <FormControl fullWidth required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormControl>
      <IconButton onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Container>
  );
};
