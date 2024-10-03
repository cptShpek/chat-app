import { Drawer, Typography } from "@mui/material";
import React, { useCallback } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AppDrawer: React.FC<Props> = ({ open, onClose }) => {
  const handleClose = useCallback(() => onClose(), [onClose]);
  return (
    <Drawer open={open} onClose={handleClose}>
      <Typography sx={{ minWidth: "150px" }} variant="body1">
        menu here
      </Typography>
    </Drawer>
  );
};
