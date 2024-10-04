import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { useCallback, useState } from "react";

interface Props {
  value: string;
  onChange: (e: any) => void;
}

export const PasswordInput: React.FC<Props> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const handleChange = useCallback((e: any) => onChange(e), [onChange]);

  const handleMouseDownUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth required>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
        id="password"
        type={show ? "text" : "password"}
        value={value}
        onChange={handleChange}
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
  );
};
