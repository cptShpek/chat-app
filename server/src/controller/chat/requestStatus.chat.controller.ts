import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { chatRequestStatusInput } from "../../validation/chat.validation";
import {
  createChat,
  deleteChatRequest,
  getChatRequestById,
} from "../../services/chat.services";
import { ErrorCode } from "../../error/custom.errors";
import BadRequestError from "../../error/badRequest.error";
import { findUserByEmail } from "../../services/user.services";

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
      await createChat([fromUser._id, toUser._id]);
    }

    await deleteChatRequest(_id);
    res.status(201).json({
      message: `Chat Request ${status ? "Accepted" : "Rejected"}`,
      success: true,
    });
  }
);
