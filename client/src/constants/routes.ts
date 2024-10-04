export const AppRoutes = {
  HOME: "/pages/home",
  LOGIN: "/auth/login",
} as const;

export const ApiRoutes = {
  LOGIN: "api/auth/login",
  LOGOUT: "api/auth/logout",
  SIGNUP: "api/auth/register",
  ACTIVATE_USER: "api/auth/activate",
};
