import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useCallback } from "react";
import { User } from "../interfaces";

interface Props {
  onClick: () => void;
  user: User;
}

export const ButtonAppBar: React.FC<Props> = ({ onClick, user }) => {
  const handleClick = useCallback(() => onClick(), [onClick]);
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Typography variant="body1" component="div">
            {user.name || "test"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
