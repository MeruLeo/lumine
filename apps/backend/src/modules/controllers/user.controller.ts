import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { errorResponse, successResponse } from "../../utils/responses";
import mongoose from "mongoose";
import { sendMail } from "../../utils/email";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    successResponse(res, 200, {
      message: "All users fetched.",
      users,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching all users", err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    successResponse(res, 201, {
      message: "User created successfully.",
      newUser,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while create new user user", err);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findOne({ _id: userId }).lean();

    if (!user) {
      errorResponse(res, 404, "User not found", userId);
    }

    successResponse(res, 200, user);
  } catch (err) {
    errorResponse(res, 500, "Error while fetching user", err);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      errorResponse(res, 400, "Invalid user ID format", userId);
      return;
    }

    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      errorResponse(res, 404, "User not found", userId);
      return;
    }

    successResponse(res, 200, {
      message: "User deleted successfully.",
      userId,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while deleting user", err);
  }
};

const allowedFieldsToUpdate = [
  "fullName",
  "phone",
  "age",
  "weight",
  "height",
  "naturalStat",
  "email",
];
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      errorResponse(res, 400, "Invalid user ID format", userId);
      return;
    }

    const updates: Record<string, any> = req.body;
    const updateKeys = Object.keys(updates);

    const validKeys = updateKeys.filter((key) =>
      allowedFieldsToUpdate.includes(key)
    );

    if (validKeys.length === 0) {
      errorResponse(
        res,
        400,
        "No valid fields provided for update",
        allowedFieldsToUpdate
      );
    }

    const updateData: Record<string, any> = {};
    for (const key of validKeys) {
      const value = updates[key];

      if (typeof value === "string" && value.trim() === "") {
        errorResponse(res, 400, `Field "${key}" cannot be empty`, value);
      }

      updateData[key] = value;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      errorResponse(res, 404, "User not found", updatedUser);
    }

    successResponse(res, 200, {
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    errorResponse(res, 500, "Something went wrong", err);
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      errorResponse(res, 400, "Invalid user ID format", userId);
      return;
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { verify: true },
      { new: true }
    ).lean();

    if (!user) {
      errorResponse(res, 404, "User not found3", userId);
      return;
    }

    await sendMail({
      to: user.email,
      subject: "لومینه | تایید حساب",
      html: "حساب شما با موفقیت تایید شد",
    });

    successResponse(res, 200, {
      message: "User verified successfully",
      user,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while verifying user", err);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      errorResponse(res, 401, "User not authenticated", null);
      return;
    }

    const user = await UserModel.findById(userId).lean();

    if (!user) {
      errorResponse(res, 404, "User not found", userId);
      return;
    }

    successResponse(res, 200, {
      message: "User information retrieved successfully",
      user,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching user information", err);
  }
};

// Controller to change user status
export const changeUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      errorResponse(res, 400, "Invalid user ID format", userId);
      return;
    }

    // Only allow valid status values
    const allowedStatus = ["pending", "accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      errorResponse(res, 400, "Invalid status value", status);
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      errorResponse(res, 404, "User not found", userId);
      return;
    }

    successResponse(res, 200, {
      message: "User status updated successfully",
      updatedUser,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while updating user status", err);
  }
};
