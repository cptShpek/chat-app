import express from "express";
import validateSchema from "../middleware/validateSchema.middleware";
import {
  registerUserSchema,
  activateUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginUserSchema,
  changeOldPasswordSchema,
} from "../validation/auth.validation";
import {
  registerUser,
  activateUser,
  forgotPassword,
  resetPassword,
  login,
  changePassword,
} from "../controller/auth/index.auth.controller";
import { AuthJWT } from "../middleware/authJWT.middleware";

const router = express.Router();

router.post("/login", validateSchema(loginUserSchema), login);
router.post("/register", validateSchema(registerUserSchema), registerUser);
router.post("/activate", validateSchema(activateUserSchema), activateUser);
router.post(
  "/forgotPassword",
  validateSchema(forgotPasswordSchema),
  forgotPassword
);
router.post(
  "/resetPassword",
  validateSchema(resetPasswordSchema),
  resetPassword
);
router.post(
  "/changePassword",
  AuthJWT,
  validateSchema(changeOldPasswordSchema),
  changePassword
);

export default router;
