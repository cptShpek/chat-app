import { Schema, model } from "mongoose";
import { IChat } from "../interfaces/chat.interface";

const chatSchema = new Schema<IChat>(
  {
    messages: [
      {
        type: Object,
        required: [true, "Message is required"],
        ref: "Message",
        index: true,
      },
    ],
    users: [
      {
        type: Object,
        ref: "User",
        required: [true, "User is required"],
        index: true,
      },
    ],
  },
  { timestamps: true }
);
export default model<IChat>("Chat", chatSchema);
