import { useCallback, useState } from "react";
import { getFetchUrl } from "../utils";
import { NotificationsVariants, useNotification } from "./useNotifications";
import { AppResponse } from "../interfaces";

export const useFetch = (): [
  loading: boolean,
  appFetch: (
    url: string,
    input: { method?: "GET" | "POST"; reqBody: any }
  ) => Promise<any>
] => {
  const [loading, setLoading] = useState(false);
  const notification = useNotification();
  const appFetch = useCallback(
    async (url: string, input: { method?: "GET" | "POST"; reqBody: any }) => {
      try {
        setLoading(true);
        const { method = "GET", reqBody } = input;
        const response = await fetch(getFetchUrl(url), {
          method,
          body: JSON.stringify(reqBody),
          headers: {
            "Access-Control-Max-Age": "600",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const body: AppResponse = await response.json();
        const { success, message } = body;
        notification(
          message,
          success ? NotificationsVariants.SUCCESS : NotificationsVariants.ERROR
        );
        return body;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [notification]
  );

  return [loading, appFetch];
};
