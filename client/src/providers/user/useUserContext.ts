import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUserContext = () => {
  const { setUser, user } = useContext(UserContext);
  if (!user || !setUser) {
    throw new Error("useUserContext used outside of UserContext");
  }
  return { setUser, user };
};
