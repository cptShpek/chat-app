import { Document, ObjectId, Schema } from "mongoose";

export interface IChatRequest extends Document {
  _id: ObjectId;
  from: string;
  to: string;
}
