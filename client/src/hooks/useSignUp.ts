import { useCallback, useState } from "react";
import { useFetch } from "./useFetch";
import { ApiRoutes } from "../constants/routes";
import { UserInput } from "../interfaces/userInput.interface";
import { AppResponse } from "../interfaces";

export const useSignUp = () => {
  const [loading, appFetch] = useFetch();
  const [codeSend, setCodeSend] = useState(false);
  const signUp = useCallback(
    async (reqBody: UserInput) => {
      const response: AppResponse = await appFetch(ApiRoutes.SIGNUP, {
        reqBody,
        method: "POST",
      });
      setCodeSend(response.success);
    },
    [appFetch]
  );
  return { loading, codeSend, setCodeSend, signUp };
};
