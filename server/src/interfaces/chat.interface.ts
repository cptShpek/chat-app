import { Document, ObjectId, Schema } from "mongoose";

export interface IChat extends Document {
  userIds: [ObjectId];
  messages: [ObjectId];
}
