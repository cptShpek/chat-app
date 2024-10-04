import { Schema, model } from "mongoose";
import { IChat } from "../interfaces/chat.interface";
import { IMessage } from "../interfaces/message.interface";

const messageSchema = new Schema<IMessage>(
  {
    text: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
export default model<IMessage>("Message", messageSchema);
