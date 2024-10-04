import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useCallback } from "react";
import { User } from "../interfaces";
import { AppBarMenu } from "./AppBarMenu";

interface Props {
  user: User;
  onClick: () => void;
  onLogout: () => void;
  onChatRequests: () => void;
}

export const ButtonAppBar: React.FC<Props> = ({
  user,
  onClick,
  onLogout,
  onChatRequests,
}) => {
  const handleClick = useCallback(() => onClick(), [onClick]);
  const handleLogout = useCallback(() => onLogout(), [onLogout]);
  const handleChatRequests = useCallback(
    () => onChatRequests(),
    [onChatRequests]
  );

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
          <AppBarMenu
            displayName={user.name}
            onLogout={handleLogout}
            onChatRequests={handleChatRequests}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
