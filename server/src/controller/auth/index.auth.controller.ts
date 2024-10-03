import { activateUser } from "./activate.auth.controller";
import { registerUser } from "./register.auth.controller";
import { forgotPassword } from "./forgot.auth.controller";
import { resetPassword } from "./resetPassword.auth.controller";
import { login } from "./login.auth.controller";
import { changePassword } from "./changePassword.auth.controller";
import { logout } from "./logout.auth.controller";

export {
  registerUser,
  activateUser,
  forgotPassword,
  resetPassword,
  login,
  changePassword,
  logout,
};
