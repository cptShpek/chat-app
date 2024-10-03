import { FilterQuery, QueryOptions, Schema, UpdateQuery } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import UserModel from "../model/user.model";
import roleModel from "../model/role.model";

export const findAllUsers = async () => {
  return await UserModel.find();
};

export const findUserById = async (id: string) => {
  return await UserModel.findById(id);
};

export const findExtendedUsers = async (userId: string) => {
  return await UserModel.findById(userId).populate("role").exec();
};

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const findUserByPhone = async (phoneNumber: string) => {
  return await UserModel.findOne({ phoneNumber });
};

export const findUser = async (
  query: FilterQuery<IUser>,
  options: QueryOptions = { lean: true }
): Promise<IUser | null> => {
  return await UserModel.findOne(query, {}, options);
};

export const createUser = async (userData: Partial<IUser>) => {
  try {
    const result = await UserModel.create(userData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export const updateUserById = async (
  id: string,
  update: UpdateQuery<IUser>,
  options: QueryOptions = { new: true }
) => {
  try {
    const result = await UserModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export const deleteUserById = async (id: string) => {
  return await UserModel.deleteOne({ _id: id });
};
