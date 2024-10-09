import express from "express";
import validateSchema from "../middleware/validateSchema.middleware";
import {
  getUserChats,
  createMessage,
} from "../controller/chat/index.chat.controller";
import { getUserChatsSchema } from "../validation/chat.validation";
import { createMessageSchema } from "../validation/message.validation";

const router = express.Router();

// Create a new role
router.post("/", validateSchema(getUserChatsSchema), getUserChats);
router.post("/:chatId", validateSchema(createMessageSchema), createMessage);

export default router;
