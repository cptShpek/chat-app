import React, { useState, useMemo } from "react";
import { User } from "../../interfaces";
import { emptyUser, UserContext } from "./UserContext";

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(emptyUser);
  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
