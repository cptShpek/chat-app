import { Request, Response } from "express";
import { RoleInterface } from "../../interfaces/role.interface";
import RoleModel from "../../model/role.model";
import InternalServerError from "../../error/internalServer.error";
import { ErrorCode } from "../../error/custom.errors";
import { findRoleByName } from "../../services/role.services";

// Create a new role
export const createRole = async (req: Request, res: Response) => {
  try {
    const {
      name,
      permissions,
      grantAll = false,
    }: {
      name: RoleInterface;
      permissions: string[];
      grantAll: boolean;
    } = req.body;
    const b = req.body;
    console.log({ req });
    // Check if the role already exists
    const existingRole = await findRoleByName(name);
    if (existingRole) {
      res.status(400).json({ message: "Role already exists", success: false });
    } else {
      // Create the role
      const newRole = new RoleModel({ name, permissions, grantAll });
      await newRole.save();

      res
        .status(201)
        .json({ message: "Role created successfully", success: true });
    }
  } catch (error) {
    throw new InternalServerError(
      "Failed to create role",
      ErrorCode.INTERNAL_SERVER
    );
  }
};
