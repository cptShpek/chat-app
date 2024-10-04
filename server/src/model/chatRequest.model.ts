import { Schema, model } from "mongoose";
import { IChatRequest } from "../interfaces/chatRequest.interface";

const chatRequestSchema = new Schema<IChatRequest>(
  {
    from: {
      type: String,
      required: [true, "From ID is required"],
    },
    to: {
      type: String,
      required: [true, "To ID is required"],
    },
  },
  { timestamps: true }
);
export default model<IChatRequest>("ChatRequest", chatRequestSchema);
