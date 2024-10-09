import { Document, ObjectId, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { IMessage } from "./message.interface";

export interface IChat extends Document {
  users: [Partial<IUser>];
  messages: [IMessage];
}
