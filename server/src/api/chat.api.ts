import express from "express";
import validateSchema from "../middleware/validateSchema.middleware";
import { getUserChats } from "../controller/chat/get.chat.controller";
import { getUserChatsSchema } from "../validation/chat.validation";

const router = express.Router();

// Create a new role
router.post("/", validateSchema(getUserChatsSchema), getUserChats);

export default router;
