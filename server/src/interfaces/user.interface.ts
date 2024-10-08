import { Document, ObjectId, Schema } from "mongoose";
import { IRole } from "./role.interface";

export interface IUser extends Document {
  _id: ObjectId;
  password: string;
  phoneNumber: string;
  email: string;
  name: string;
  isActive: boolean;
  OTPCode?: string;
  OTPCodeExpires?: number;
  passwordResetCode?: string;
  chats?: [string];
  role: IRole; // Reference to the Role model
}
