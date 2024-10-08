import { ObjectId } from "mongoose";
import chatModel from "../model/chat.model";

export const getAllUserChats = async (_id: string) => {
  try {
    const result = await chatModel.find({ userIds: _id });
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export const createChat = async (userIds: ObjectId[]) => {
  try {
    const result = await chatModel.create({ userIds, messages: [] });
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};
