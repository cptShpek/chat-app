import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ButtonAppBar } from "./AppBar";
import { useUserContext } from "../providers/user";
import { AppDrawer } from "./AppDrawer";
import { useFetch, useLocalStorage, useLogout } from "../hooks";
import { ApiRoutes, AppRoutes } from "../constants/routes";
import { ChatRequestsDialog } from "./ChatRequests/ChatRequests";
import { ChatRequest, User } from "../interfaces";
import { Backdrop, CircularProgress } from "@mui/material";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [loading, appFetch] = useFetch();
  const logout = useLogout();
  const [getItem] = useLocalStorage();
  const { user, setUser } = useUserContext();
  const [requestedUser, setRequestedUser] = useState<User | null>(null);
  const [chatRequests, setChatRequests] = useState<ChatRequest[]>([]);
  const [open, setOpen] = useState(false);
  const [requestsOpen, setRequestsOpen] = useState(false);

  const handleAppBarClick = useCallback(() => setOpen((v) => !v), [setOpen]);
  const handleDrawerClose = useCallback(() => setOpen(false), [setOpen]);

  const handleLogout = useCallback(() => logout(user), [logout, user]);

  const handleChatRequestsOpen = useCallback(() => {
    setRequestsOpen(true);
  }, []);

  const handleRequestsClose = useCallback(() => setRequestsOpen(false), []);

  const handleSearchUser = useCallback(async (email: string) => {
    const response = await appFetch(ApiRoutes.FIND_USER_BY_EMAIL, {
      method: "POST",
      reqBody: { email },
    });
    if (response.success) {
      setRequestedUser(response.user);
    }
  }, []);

  const getChatRequests = useCallback(async (email: string) => {
    const response = await appFetch(ApiRoutes.GET_ALL_CHAT_REQUESTS, {
      method: "POST",
      reqBody: { email },
    });
    if (response.success) {
      setChatRequests(() => [...response.chatRequests]);
    }
  }, []);

  const handleChatRequestSubmit = useCallback(async () => {
    const reqBody = { from: user.email, to: requestedUser?.email };
    const response = await appFetch(ApiRoutes.CHAT_REQUEST, {
      method: "POST",
      reqBody,
    });
    if (response.success) {
      setChatRequests((v) => [...v, response.chatRequest]);
    }
  }, [user, requestedUser, appFetch]);

  useEffect(() => {
    if (!user || !user.isActive) {
      const localStorageUser = getItem("user");
      localStorageUser ? setUser(localStorageUser) : navigate(AppRoutes.LOGIN);
    }
  }, [user, getItem, navigate, setUser]);

  useEffect(() => {
    if (user && user.isActive && user.email.length > 0) {
      getChatRequests(user.email);
    }
  }, [user, getChatRequests]);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <ChatRequestsDialog
        open={requestsOpen}
        user={user}
        requestedUser={requestedUser}
        chatRequests={chatRequests}
        onClose={handleRequestsClose}
        onSearch={handleSearchUser}
        onChatRequestSubmit={handleChatRequestSubmit}
      />
      <ButtonAppBar
        onClick={handleAppBarClick}
        user={user}
        onLogout={handleLogout}
        onChatRequests={handleChatRequestsOpen}
      />
      <AppDrawer open={open} onClose={handleDrawerClose} />
      <Outlet />
    </>
  );
};
