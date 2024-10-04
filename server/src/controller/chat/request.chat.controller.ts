import { Request, Response } from "express";
import BadRequestError from "../../error/badRequest.error";
import asyncHandler from "express-async-handler";
import { findUser } from "../../services/user.services";
import { ErrorCode } from "../../error/custom.errors";
import { chatRequestInput } from "../../validation/chat.validation";
import {
  createChatRequest,
  isChatRequestExist,
} from "../../services/chat.services";

//@desc  Activate email for customer
//@method POST  /customer-auth/activate
//@access public
export const chatRequest = asyncHandler(
  async (req: Request<object, object, chatRequestInput>, res: Response) => {
    const { from, to } = req.body;

    // Find user by email
    const fromUser = await findUser({ email: from });

    if (!fromUser)
      throw new BadRequestError("User does not exist", ErrorCode.BAD_REQUEST);
    if (!fromUser.isActive)
      throw new BadRequestError("User not active", ErrorCode.BAD_REQUEST);

    // Find user by email
    const toUser = await findUser({ email: to });

    if (!toUser)
      throw new BadRequestError(
        "Requested User does not exist",
        ErrorCode.BAD_REQUEST
      );
    if (!toUser.isActive)
      throw new BadRequestError(
        "Requested User not active",
        ErrorCode.BAD_REQUEST
      );

    const chatRequest = {
      from,
      to,
    };

    const exist = await isChatRequestExist(chatRequest);
    if (exist) {
      throw new BadRequestError(
        "This chat request already exist",
        ErrorCode.BAD_REQUEST
      );
    }

    const request = await createChatRequest(chatRequest);

    res.status(201).json({
      message: "Chat Request Send",
      success: true,
      chatRequest: { ...chatRequest },
    });
  }
);
