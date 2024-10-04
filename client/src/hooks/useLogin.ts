import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { AuthResponse } from "../interfaces";
import { ApiRoutes, AppRoutes } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../providers/user";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [loading, appFetch] = useFetch();
  const login = useCallback(
    async (reqBody: { email: string; password: string }) => {
      const response: AuthResponse = await appFetch(ApiRoutes.LOGIN, {
        reqBody,
        method: "POST",
      });
      if (response.success && response.user) {
        navigate(AppRoutes.HOME);
        setUser(response.user);
      }
    },
    [appFetch, navigate, setUser]
  );
  return { loading, login };
};
