import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createMessageInput } from "../../validation/message.validation";
import { addMessageToChat, getChatById } from "../../services/chat.services";
import NotFoundError from "../../error/notFound.error";
import { ErrorCode } from "../../error/custom.errors";
import { createMessage as createMessageService } from "../../services/message.services";
import BadRequestError from "../../error/badRequest.error";

export const createMessage = asyncHandler(
  async (req: Request<object, object, createMessageInput>, res: Response) => {
    const { text, fromEmail } = req.body;
    const { chatId } = req.params as { chatId: string };

    const { data: chat, success: findChatSuccess } = await getChatById(chatId);

    if (!chat || !findChatSuccess) {
      throw new NotFoundError("Chat not found", ErrorCode.NOT_FOUND);
    }
    const message = { fromEmail, text };

    const { data: createdMessage, success: createMessageSuccess } =
      await createMessageService(message);

    if (!createdMessage || !createMessageSuccess) {
      throw new BadRequestError("Can't create message", ErrorCode.BAD_REQUEST);
    }

    const { success: addMessageToChatSuccess } = await addMessageToChat(
      chatId,
      createdMessage
    );

    if (!addMessageToChatSuccess) {
      throw new BadRequestError(
        "Can't add message to chat",
        ErrorCode.BAD_REQUEST
      );
    }

    res
      .status(201)
      .json({ message: "Message send", success: true, data: createdMessage });
  }
);
