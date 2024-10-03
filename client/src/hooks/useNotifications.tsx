import { Fragment, useCallback } from "react";
import { useSnackbar, VariantType } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const showNotification = useCallback(
    (message: string, variant: VariantType = NotificationsVariants.DEFAULT) => {
      enqueueSnackbar(message, {
        variant,
        action: (key) => (
          <Fragment>
            <IconButton
              sx={{ color: "white" }}
              size="small"
              onClick={() => closeSnackbar(key)}
            >
              <CloseIcon />
            </IconButton>
          </Fragment>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );
  return showNotification;
};

export const NotificationsVariants = {
  DEFAULT: "default",
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
} as const;
