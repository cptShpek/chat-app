import { Request, Response } from "express";
import BadRequestError from "../../error/badRequest.error";
import asyncHandler from "express-async-handler";
import { findUserByEmail } from "../../services/user.services";
import { ErrorCode } from "../../error/custom.errors";
import { FindUserInput } from "../../validation/user.validation";

export const findUserByEmailController = asyncHandler(
  async (req: Request<object, object, FindUserInput>, res: Response) => {
    const { email } = req.body;

    // Find user by email
    const user = await findUserByEmail(email);

    if (!user)
      throw new BadRequestError("User does not exist", ErrorCode.BAD_REQUEST);
    if (!user.isActive)
      throw new BadRequestError("User is not Active", ErrorCode.BAD_REQUEST);

    res
      .status(201)
      .json({ message: "We find your user!", success: true, user });
  }
);
