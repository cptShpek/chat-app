import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ErrorCode } from "../../error/custom.errors";
import BadRequestError from "../../error/badRequest.error";
import { addUserToChat, findUserByEmail } from "../../services/user.services";
import {
  deleteChatRequest,
  getChatRequestById,
} from "../../services/chatRequest.service";
import { chatRequestStatusInput } from "../../validation/chatRequest.validation";
import { createChat } from "../../services/chat.services";

export const changeChatRequestStatus = asyncHandler(
  async (
    req: Request<object, object, chatRequestStatusInput>,
    res: Response
  ) => {
    const { _id, status } = req.body;
    const chatRequest = await getChatRequestById(_id);

    if (!chatRequest) {
      throw new BadRequestError(
        "There is no such chat request",
        ErrorCode.BAD_REQUEST
      );
    }
    const { from, to } = chatRequest;

    if (status) {
      const fromUser = await findUserByEmail(from);
      const toUser = await findUserByEmail(to);
      if (!toUser) {
        throw new BadRequestError(
          "There is no such user available",
          ErrorCode.BAD_REQUEST
        );
      }
      const { data } = await createChat([fromUser._id, toUser._id]);
      await addUserToChat(fromUser._id, data.id);
      await addUserToChat(toUser._id, data.id);
    }

    await deleteChatRequest(_id);

    res.status(201).json({
      message: `Chat Request ${status ? "Accepted" : "Rejected"}`,
      success: true,
    });
  }
);
