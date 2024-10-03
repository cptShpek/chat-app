import { Request, Response } from "express";
import { logoutUserInput } from "../../validation/auth.validation";
import BadRequestError from "../../error/badRequest.error";
import ForbiddenError from "../../error/forbidden.error";
import asyncHandler from "express-async-handler";
import { findUser } from "../../services/user.services";
import TokenModel from "../../model/token.model";
import { ErrorCode } from "../../error/custom.errors";

//@desc  Login customer
//@method POST  /customer-auth/login
//@access public
export const logout = asyncHandler(
  async (req: Request<object, object, logoutUserInput>, res: Response) => {
    const { _id } = req.body;

    // Find user by email
    const user = await findUser({ _id }, { lean: true });
    if (!user)
      throw new ForbiddenError("User does not exist", ErrorCode.FORBIDDEN);
    if (!user.isActive)
      throw new BadRequestError(
        "Please verify your email first",
        ErrorCode.BAD_REQUEST
      );

    // Generate and store access token
    await TokenModel.deleteOne({
      userId: user._id,
    });

    // Send response with user data and access token
    res.status(200).json({
      success: true,
      message: "Logged Out successfully",
    });
  }
);
