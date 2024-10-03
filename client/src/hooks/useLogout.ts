import { useCallback } from "react";
import { AppResponse, User } from "../interfaces";
import { useFetch } from "./useFetch";
import { ApiRoutes, AppRoutes } from "../constants/routes";
import { NotificationsVariants, useNotification } from "./useNotifications";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export const useLogout = () => {
  const navigate = useNavigate();
  const [, appFetch] = useFetch();
  const [, , clearAll] = useLocalStorage();
  const notification = useNotification();
  const logout = useCallback(
    async (user: User) => {
      const { _id } = user;
      const response: AppResponse = await appFetch(ApiRoutes.LOGOUT, {
        method: "POST",
        reqBody: { _id },
      });
      notification(
        response.message,
        response.success
          ? NotificationsVariants.SUCCESS
          : NotificationsVariants.ERROR
      );
      if (response.success) {
        clearAll();
        navigate(AppRoutes.LOGIN);
      }
    },
    [appFetch, notification, navigate]
  );

  return logout;
};
