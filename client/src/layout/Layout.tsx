import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ButtonAppBar } from "./AppBar";
import { useUserContext } from "../providers/user";
import { AppDrawer } from "./AppDrawer";
import { useLocalStorage, useLogout } from "../hooks";
import { AppRoutes } from "../constants/routes";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [getItem] = useLocalStorage();
  const { user, setUser } = useUserContext();
  const [open, setOpen] = useState(false);

  const handleAppBarClick = useCallback(() => setOpen((v) => !v), [setOpen]);
  const handleDrawerClose = useCallback(() => setOpen(false), [setOpen]);

  const handleLogout = useCallback(() => logout(user), [logout, user]);

  useEffect(() => {
    if (!user || !user.isActive) {
      const localStorageUser = getItem("user");
      localStorageUser ? setUser(localStorageUser) : navigate(AppRoutes.LOGIN);
    }
  }, [user, getItem, navigate, setUser]);

  return (
    <>
      <ButtonAppBar
        onClick={handleAppBarClick}
        user={user}
        onLogout={handleLogout}
      />
      <AppDrawer open={open} onClose={handleDrawerClose} />
      <Outlet />
    </>
  );
};
