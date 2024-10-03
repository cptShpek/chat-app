import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ButtonAppBar } from "./AppBar";
import { useUserContext } from "../providers/user";
import { AppDrawer } from "./AppDrawer";
import { useLocalStorage } from "../hooks";
import { AppRoutes } from "../constants/routes";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [getItem] = useLocalStorage();
  const { user, setUser } = useUserContext();
  const [open, setOpen] = useState(false);

  const handleAppBarClick = useCallback(() => setOpen((v) => !v), [setOpen]);
  const handleDrawerClose = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    if (!user || !user.isActive) {
      const localStorageUser = getItem("user");
      localStorageUser ? setUser(localStorageUser) : navigate(AppRoutes.LOGIN);
    }
  }, [user, getItem]);

  return (
    <>
      <ButtonAppBar onClick={handleAppBarClick} user={user} />
      <AppDrawer open={open} onClose={handleDrawerClose} />
      <Outlet />
    </>
  );
};
