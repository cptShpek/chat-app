import { createContext } from "react";
import { User } from "../../interfaces";

export const emptyUser: User = {
  _id: "",
  createdAt: "",
  updatedAt: "",
  name: "",
  email: "",
  isActive: false,
  phoneNumber: "",
  role: "",
};

export const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({ user: emptyUser, setUser: (user: User) => {} });
