import { ObjectId } from "mongoose";
import chatModel from "../model/chat.model";

export const createChat = async (userIds: ObjectId[]) => {
  try {
    const result = await chatModel.create({
      messages: [],
      userIds,
    });
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};
