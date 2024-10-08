import express from "express";
import validateSchema from "../middleware/validateSchema.middleware";
import {
  chatRequestSchema,
  chatRequestStatusSchema,
  getChatRequestsSchema,
} from "../validation/chatRequest.validation";
import {
  createChatRequest,
  getChatRequests,
  changeChatRequestStatus,
} from "../controller/chatRequest/index.chatRequest.controller";

const router = express.Router();

// Create a new role
router.post("/", validateSchema(chatRequestSchema), createChatRequest);
router.post("/all", validateSchema(getChatRequestsSchema), getChatRequests);
router.post(
  "/status",
  validateSchema(chatRequestStatusSchema),
  changeChatRequestStatus
);

export default router;
