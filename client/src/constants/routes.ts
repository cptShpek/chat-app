export const AppRoutes = {
  HOME: "/pages/home",
  LOGIN: "/auth/login",
} as const;

export const ApiRoutes = {
  // AUTH
  LOGIN: "api/auth/login",
  LOGOUT: "api/auth/logout",
  SIGNUP: "api/auth/register",
  ACTIVATE_USER: "api/auth/activate",
  // USER
  FIND_USER_BY_EMAIL: "api/user/findByEmail",
  // CHAT REQUESTS
  GET_ALL_CHAT_REQUESTS: "api/chatRequest/all",
  CHAT_REQUEST: "api/chatRequest/",
  CHAT_REQUEST_STATUS: "api/chatRequest/status",
  // CHATS
  CHAT: "api/chat",
};
