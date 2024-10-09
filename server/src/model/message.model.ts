import { Schema, model } from "mongoose";
import { IMessage } from "../interfaces/message.interface";

const messageSchema = new Schema<IMessage>(
  {
    text: {
      type: String,
      required: [true, "Message text is required"],
    },
    fromEmail: {
      type: String,
      required: [true, "User Email is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
export default model<IMessage>("Message", messageSchema);
