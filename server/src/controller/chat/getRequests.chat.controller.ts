import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getChatRequestsInput } from "../../validation/chat.validation";
import { getAllChatRequests } from "../../services/chat.services";

export const getChatRequests = asyncHandler(
  async (req: Request<object, object, getChatRequestsInput>, res: Response) => {
    const { email } = req.body;
    const chatRequests = await getAllChatRequests(email);
    console.log("CHAT REQUESTS: ", { chatRequests });
    res
      .status(201)
      .json({ message: "Chat Request Loaded", success: true, chatRequests });
  }
);
