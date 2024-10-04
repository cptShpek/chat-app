import { useCallback, useState } from "react";
import { getFetchUrl } from "../utils";
import { NotificationsVariants, useNotification } from "./useNotifications";
import { AppResponse, AuthResponse } from "../interfaces";
import { ApiRoutes } from "../constants/routes";
import { useLocalStorage } from "./useLocalStorage";

export const useFetch = (): [
  boolean,
  (
    url: string,
    input: { method?: "GET" | "POST"; reqBody: any }
  ) => Promise<any>
] => {
  const [getItem, setItem] = useLocalStorage();
  const [loading, setLoading] = useState(false);
  const notification = useNotification();

  const appFetch = useCallback(
    async (url: string, input: { method?: "GET" | "POST"; reqBody: any }) => {
      try {
        setLoading(true);
        const token = getItem("accessToken");
        const { method = "GET", reqBody } = input;
        const response = await fetch(getFetchUrl(url), {
          method,
          body: JSON.stringify(reqBody),
          headers: {
            "Access-Control-Max-Age": "600",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token || "",
          },
        });
        const body: AppResponse = await response.json();
        const { success, message } = body;
        notification(
          message,
          success ? NotificationsVariants.SUCCESS : NotificationsVariants.ERROR
        );
        if (success && url === ApiRoutes.LOGIN) {
          const { user, accessToken } = body as AuthResponse;
          setItem("user", user);
          setItem("accessToken", accessToken);
        }
        return body;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [notification, getItem, setItem]
  );

  return [loading, appFetch];
};
