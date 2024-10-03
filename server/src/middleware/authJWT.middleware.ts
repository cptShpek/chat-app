import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../error/unAuthenticated.error";
import ForbiddenError from "../error/forbidden.error";
import { ErrorCode } from "../error/custom.errors";
import { validateEnv } from "../config/env.config";
import { findExtendedUsers } from "../services/user.services";
import NotFoundError from "../error/notFound.error";
import { IRole } from "../interfaces/role.interface";
import { IUser } from "../interfaces/user.interface";
import { extractTokenFromHeader } from "../utils/util";

export interface UserDataType {
  userId: string;
  permission?: IRole["permissions"];
  role?: IRole;
}
export interface IUserMessage<TParams = any, TQuery = any, TBody = any>
  extends Request<TParams, TQuery, TBody> {
  userData: UserDataType;
}
type ExtendedUser = IUser & {
  permission?: IRole;
};
export const AuthJWT = (
  req: IUserMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtconfig = validateEnv()?.jwtconfig;
    const token = extractTokenFromHeader(req);
    if (!token)
      throw new UnAuthenticatedError(
        "Provide token",
        ErrorCode.TOKEN_NOT_FOUND
      );
    jwt.verify(token, jwtconfig?.accessSecret, async (err, decoded) => {
      if (err)
        return next(
          new ForbiddenError("Token expires", ErrorCode?.TOKEN_EXPIRE)
        );
      const decodeData = decoded as UserDataType;
      const userWithPermission = await findExtendedUsers(decodeData?.userId);
      if (!userWithPermission)
        throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
      req.userData = {
        userId: decodeData?.userId,
        permission: userWithPermission?.role?.permissions,
      };
      next();
    });
  } catch (err) {
    throw new UnAuthenticatedError("Provide token", ErrorCode.TOKEN_NOT_FOUND);
  }
};
