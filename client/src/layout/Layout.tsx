import React, { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { ButtonAppBar } from "./AppBar";
import { useUserContext } from "../providers/user";
import { AppDrawer } from "./AppDrawer";

export const Layout: React.FC = () => {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);

  const handleAppBarClick = useCallback(() => setOpen((v) => !v), [setOpen]);
  const handleDrawerClose = useCallback(() => setOpen(false), [setOpen]);

  // TODO handle non auth user redirect to login
  // useEffect(() => {
  //   if (!user.isActive) {
  //     navigate(AppRoutes.LOGIN);
  //   }
  // }, [user]);

  return (
    <>
      <ButtonAppBar onClick={handleAppBarClick} user={user} />
      <AppDrawer open={open} onClose={handleDrawerClose} />
      <Outlet />
    </>
  );
};
