import { Request, Response } from "express";
import NotFoundError from "../../error/notFound.error";
import InternalServerError from "../../error/internalServer.error";
import { ErrorCode } from "../../error/custom.errors";
import {
  getAllRoles as getRoles,
  findRoleById,
} from "../../services/role.services";

// Get all roles
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await getRoles();
    res.status(200).json({ roles, success: true });
  } catch (error) {
    throw new InternalServerError(
      "Failed to fetch roles",
      ErrorCode.INTERNAL_SERVER
    );
  }
};

// Get role by ID
export const getRoleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const role = await findRoleById(id);
    if (!role) {
      throw new NotFoundError("Role not found", ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ role, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch role with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
