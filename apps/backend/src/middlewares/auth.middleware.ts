import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
import { ACCESS_TOKEN_SECRET } from "../configs/tokens";
import { Document } from "mongoose";

interface IUser {
  _id: string;
  role: string;
  modelingCode: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role?: string;
        modelingCode?: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      res.status(401).json({ message: "Access token not found in cookies" });
      return;
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET!) as { _id: string };
    const user = (await UserModel.findById(decoded._id).select("-password")) as
      | (Document & IUser)
      | null;

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = {
      _id: user._id.toString(),
      role: user.role,
      modelingCode: user.modelingCode,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }
    res.status(500).json({
      message: "Authentication error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
