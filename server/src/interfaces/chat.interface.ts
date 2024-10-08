import { Document, ObjectId, Schema } from "mongoose";
import { IUser } from "./user.interface";

export interface IChat extends Document {
  users: [Partial<IUser>];
  messages: [ObjectId];
}
