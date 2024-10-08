import { Document, ObjectId } from "mongoose";

export interface IMessage extends Document {
  _id: ObjectId;
  text: string;
  createdAt: Date;
  userId: ObjectId;
}
