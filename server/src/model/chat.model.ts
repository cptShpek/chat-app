import { Schema, ObjectId, model } from "mongoose";
import { IChat } from "../interfaces/chat.interface";

const chatSchema = new Schema<IChat>(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Message ID is required"],
        ref: "Message",
        index: true,
      },
    ],
    userIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true,
      },
    ],
  },
  { timestamps: true }
);
export default model<IChat>("Chat", chatSchema);
