import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
} from "../controller/role/index.role.controller";
import validateSchema from "../middleware/validateSchema.middleware";
import { chatRequestSchema } from "../validation/chat.validation";
import { chatRequest } from "../controller/chat/request.controller";

const router = express.Router();

// Create a new role
router.post("/request", validateSchema(chatRequestSchema), chatRequest);

export default router;
