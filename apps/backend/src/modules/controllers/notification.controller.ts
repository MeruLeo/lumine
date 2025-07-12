import { Request, Response } from "express";
import Notification from "../../models/notification";
import { UserModel } from "../../models/user";
import { sendMail } from "../../utils/email";
import mongoose from "mongoose";

// @route   POST /notifications
export const createNotification = async (req: Request, res: Response) => {
  try {
    const {
      title,
      message,
      type,
      status = "info",
      recipientIds = [],
    } = req.body;

    let recipients = [];

    if (type === "personal") {
      if (!recipientIds.length) {
        return res.status(400).json({
          message: "recipientIds are required for personal notification",
        });
      }
      recipients = recipientIds;
    } else {
      const allUsers = await UserModel.find({}, "_id");
      recipients = allUsers.map((u) => u._id);
    }

    const notification = await Notification.create({
      title,
      message,
      type,
      status,
      recipients,
    });

    const users = await UserModel.find({ _id: { $in: recipients } });
    for (const user of users) {
      await sendMail({
        to: user.email,
        subject: `🔔 ${title}`,
        html: `<h3>${title}</h3><p>${message}</p>`,
      });
    }

    return res.status(201).json({ notification });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// @route   GET /notifications
export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const notifications = await Notification.find({
      $or: [{ type: "global" }, { recipients: userId }],
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ notifications });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// @route   PATCH /notifications/:id/read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const alreadySeen = notification.seenBy.some((seenUserId) =>
      seenUserId.equals(userObjectId)
    );

    if (!alreadySeen) {
      notification.seenBy.push(userObjectId);
      await notification.save();
    }

    return res.status(200).json({ message: "Marked as read" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// @route   DELETE /notifications/:id
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;

    await Notification.findByIdAndDelete(notificationId);

    return res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// @route   GET /notifications/:id
export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({ notification });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
