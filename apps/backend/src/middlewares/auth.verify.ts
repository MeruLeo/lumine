import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";

export const isVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?._id) {
      res.status(401).json({ message: "شما هنوز وارد نشده اید" });
      return;
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "کاربر یافت نشد" });
      return;
    }

    if (!user.verify) {
      res.status(403).json({
        message: "حساب شما هنوز تایید نشده است",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error verifying user account",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
