import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useCallback } from "react";
import { User } from "../interfaces";
import { AppBarMenu } from "./AppBarMenu";

interface Props {
  user: User;
  onClick: () => void;
  onLogout: () => void;
}

export const ButtonAppBar: React.FC<Props> = ({ user, onClick, onLogout }) => {
  const handleClick = useCallback(() => onClick(), [onClick]);
  const handleLogout = useCallback(() => onLogout(), [onLogout]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <AppBarMenu displayName={user.name} onLogout={handleLogout} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
