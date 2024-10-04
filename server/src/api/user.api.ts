import express from "express";
import { findUserByEmailController } from "../controller/user/findByEmail.user.controller";
import { AuthJWT } from "../middleware/authJWT.middleware";

const router = express.Router();

// Find user by Email
router.post("/findByEmail", AuthJWT, findUserByEmailController);

export default router;
