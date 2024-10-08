import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getUserChatsInput } from "../../validation/chat.validation";
import { getAllUserChats } from "../../services/chat.services";

export const getUserChats = asyncHandler(
  async (req: Request<object, object, getUserChatsInput>, res: Response) => {
    const { id } = req.body;
    const { data, success } = await getAllUserChats(id);
    res.status(201).json({ message: "User Chats Loaded", success, data });
  }
);
