import express from "express";
import validateSchema from "../middleware/validateSchema.middleware";
import {
  chatRequestSchema,
  chatRequestStatusSchema,
  getChatRequestsSchema,
} from "../validation/chat.validation";
import {
  chatRequest,
  getChatRequests,
  changeChatRequestStatus,
} from "../controller/chat/index.chat.controller";

const router = express.Router();

// Create a new role
router.post("/request", validateSchema(chatRequestSchema), chatRequest);
router.post("/all", validateSchema(getChatRequestsSchema), getChatRequests);
router.post(
  "/request/status",
  validateSchema(chatRequestStatusSchema),
  changeChatRequestStatus
);

export default router;
