import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getAllChatRequests } from "../../services/chatRequest.service";
import { getChatRequestsInput } from "../../validation/chatRequest.validation";

export const getChatRequests = asyncHandler(
  async (req: Request<object, object, getChatRequestsInput>, res: Response) => {
    const { email } = req.body;
    const { data, success } = await getAllChatRequests(email);
    res.status(201).json({ message: "Chat Request Loaded", success, data });
  }
);
