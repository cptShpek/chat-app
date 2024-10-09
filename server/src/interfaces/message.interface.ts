import { Document, ObjectId } from "mongoose";

export interface IMessage extends Document {
  text: string;
  createdAt: Date;
  fromEmail: string;
}
