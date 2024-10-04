export const AppRoutes = {
  HOME: "/pages/home",
  LOGIN: "/auth/login",
} as const;

export const ApiRoutes = {
  LOGIN: "api/auth/login",
  LOGOUT: "api/auth/logout",
  SIGNUP: "api/auth/register",
  ACTIVATE_USER: "api/auth/activate",
  FIND_USER_BY_EMAIL: "api/user/findByEmail",
  GET_ALL_CHAT_REQUESTS: "api/chat/all",
  CHAT_REQUEST: "api/chat/request",
};
