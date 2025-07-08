import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";

export const verifyDeveloperOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?._id) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found2" });
      return;
    }

    if (user.role !== "developer" && user.role !== "admin") {
      res.status(403).json({
        message: "Access denied. Only developers and admins are allowed.",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error verifying user role",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
