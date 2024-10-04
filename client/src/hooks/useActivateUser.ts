import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { ActivateUser, AppResponse } from "../interfaces";
import { ApiRoutes } from "../constants/routes";

export const useActivateUser = () => {
  const [loading, appFetch] = useFetch();

  const activateUser = useCallback(
    async (reqBody: ActivateUser): Promise<AppResponse> => {
      const response = await appFetch(ApiRoutes.ACTIVATE_USER, {
        method: "POST",
        reqBody,
      });
      return response;
    },
    [appFetch]
  );

  return { activateUser, loading };
};
