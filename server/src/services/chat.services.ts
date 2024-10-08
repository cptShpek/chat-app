import { IUser } from "../interfaces/user.interface";
import chatModel from "../model/chat.model";

export const getAllUserChats = async (_id: string) => {
  try {
    const data = await chatModel.find({
      "users._id": _id,
    });
    return { data, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export const getChatById = async (id: string) => {
  try {
    const data = await chatModel.findById(id);
    return { data, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export const createChat = async (users: Partial<IUser>[]) => {
  try {
    const result = await chatModel.create({ messages: [], users });
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};
