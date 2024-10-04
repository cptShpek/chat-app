import chatRequestModel from "../model/chatRequest.model";
import { IChatRequest } from "../interfaces/chatRequest.interface";

export const getAllRequests = async (_id: string) => {
  return await chatRequestModel.find({ to: _id }).exec();
};

export const isChatRequestExist = async (
  data: Partial<IChatRequest>
): Promise<boolean> => {
  const { from, to } = data;
  try {
    const existingChat = await chatRequestModel.find({ to, from }).exec();
    return true;
  } catch (e) {
    console.log({ e });
    return false;
  }
};

export const createChatRequest = async (
  chatRequestData: Partial<IChatRequest>
) => {
  try {
    const result = await chatRequestModel.create(chatRequestData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export const deleteChatRequest = async (id: string) => {
  return await chatRequestModel.deleteOne({ _id: id });
};
