import express from "express";
import validateSchema from "../middleware/validateSchema.middleware";
import {
  chatRequestSchema,
  getChatRequestsSchema,
} from "../validation/chat.validation";
import {
  chatRequest,
  getChatRequests,
} from "../controller/chat/index.chat.controller";

const router = express.Router();

// Create a new role
router.post("/request", validateSchema(chatRequestSchema), chatRequest);
router.post("/all", validateSchema(getChatRequestsSchema), getChatRequests);

export default router;
