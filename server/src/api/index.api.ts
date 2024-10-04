import express from "express";
import role from "./role.api";
import auth from "./auth.api";
import chat from "./chat.api";

const router = express.Router();

router.use("/role", role);
router.use("/auth", auth);
router.use("/chat", chat);

router.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

export default router;
