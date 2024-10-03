import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IRole } from "../interfaces/role.interface";
import RoleModel from "../model/role.model";

export const getAllRoles = async () => {
  return await RoleModel.find();
};

export const findRoleById = async (id: string) => {
  return await RoleModel.findById(id);
};

export const findRoleByName = async (name: string) => {
  return await RoleModel.findOne({ name: name });
};

export const findRole = async (
  query: FilterQuery<IRole>,
  options: QueryOptions = { lean: true }
): Promise<IRole | null> => {
  return await RoleModel.findOne(query, {}, options);
};

export const createRole = async (roleData: Partial<IRole>) => {
  try {
    const result = await RoleModel.create(roleData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export const deleteRoleById = async (id: string) => {
  return await RoleModel.deleteOne({ _id: id });
};

export const updateRoleById = async (
  id: string,
  update: UpdateQuery<IRole>,
  options: QueryOptions = { new: true }
) => {
  try {
    const result = await RoleModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};
