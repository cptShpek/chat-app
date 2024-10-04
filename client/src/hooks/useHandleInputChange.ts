import { Dispatch, SetStateAction, useCallback } from "react";
import { getInputValue } from "../utils";

export const useHandleInputChange = (setter: Dispatch<SetStateAction<any>>) => {
  const handler = useCallback(
    (e: any) => {
      const value = getInputValue(e);
      setter(value);
    },
    [setter]
  );
  return handler;
};
