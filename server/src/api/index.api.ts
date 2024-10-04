import express from "express";
import role from "./role.api";
import auth from "./auth.api";
import chat from "./chat.api";
import user from "./user.api";
import { AuthJWT } from "../middleware/authJWT.middleware";

const router = express.Router();

router.use("/role", AuthJWT, role);
router.use("/auth", auth);
router.use("/chat", AuthJWT, chat);
router.use("/user", AuthJWT, user);

router.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

export default router;
