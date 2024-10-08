import express from "express";
import { findUserByEmailController } from "../controller/user/findByEmail.user.controller";

const router = express.Router();

// Find user by Email
router.post("/findByEmail", findUserByEmailController);

export default router;
