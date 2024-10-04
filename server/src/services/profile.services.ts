import { FilterQuery, ObjectId, QueryOptions, UpdateQuery } from "mongoose";
import { IProfile } from "../interfaces/profile.interface";
import ProfileModel from "../model/profile.model";

export const getAllProfiles = async () => {
  return await ProfileModel.find()
    .populate({
      path: "userId",
      select: "-password -OTPCode -OTPCodeExpires -passwordResetCode -business",
    })
    .exec();
};

export const findProfileById = async (id: string) => {
  return await ProfileModel.findById(id)
    .populate({
      path: "userId",
      select: "-password -OTPCode -OTPCodeExpires -passwordResetCode -business",
    })
    .exec();
};

export const findProfile = async (
  query: FilterQuery<IProfile>,
  options: QueryOptions = { lean: true }
): Promise<IProfile | null> => {
  return await ProfileModel.findOne(query, {}, options);
};

export const createProfile = async (
  profileData: Partial<IProfile> | ObjectId
) => {
  try {
    const result = await ProfileModel.create(profileData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export const deleteProfileById = async (id: string) => {
  return await ProfileModel.deleteOne({ _id: id });
};

export const updateProfileById = async (
  id: string,
  update: UpdateQuery<IProfile>,
  options: QueryOptions = { new: true }
) => {
  try {
    const result = await ProfileModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};
