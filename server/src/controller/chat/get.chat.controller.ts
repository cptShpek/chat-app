import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getUserChatsInput } from "../../validation/chat.validation";
import { getAllUserChats, getChatById } from "../../services/chat.services";
import { findUserById } from "../../services/user.services";

export const getUserChats = asyncHandler(
  async (req: Request<object, object, getUserChatsInput>, res: Response) => {
    const { id } = req.body;
    const { chats } = await findUserById(id);
    const promises = chats.map(async (chatId) => await getChatById(chatId));
    const results = await Promise.all(promises);
    const data = results
      .filter((result) => result.success && result.data)
      .map((result) => result.data);
    res.status(201).json({ message: "User Chats Loaded", success: true, data });
  }
);
