import { IMessage } from "../interfaces/message.interface";
import messageModel from "../model/message.model";

export const createMessage = async (message: Partial<IMessage>) => {
  try {
    const result = await messageModel.create(message);
    return { data: result, success: true };
  } catch (error) {
    console.log({ error });
    return { data: null, success: false, error };
  }
};
