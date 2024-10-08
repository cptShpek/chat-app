import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

interface Props {
  displayName: string;
  onLogout: () => void;
  onChatRequests: () => void;
}

export const AppBarMenu: React.FC<Props> = ({
  displayName,
  onLogout,
  onChatRequests,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => onLogout(), [onLogout]);

  const handleChatRequests = useCallback(() => {
    handleClose();
    onChatRequests();
  }, [onChatRequests, handleClose]);

  return (
    <div>
      <Button
        sx={{ color: "white" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<AccountCircleOutlinedIcon />}
      >
        {displayName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AssignmentIndOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem> */}
        <MenuItem onClick={handleChatRequests}>
          <ListItemIcon>
            <MarkChatUnreadIcon />
          </ListItemIcon>
          <ListItemText>Chat Requests</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
