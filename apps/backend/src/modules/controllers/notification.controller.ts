import { Request, Response } from "express";
import Notification from "../../models/notification";
import { UserModel } from "../../models/user";
import { sendMail } from "../../utils/email";
import mongoose from "mongoose";

// ارسال نوتیفیکیشن جدید
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
          message: "برای نوتیف شخصی، recipientIds الزامی است.",
        });
      }
      recipients = recipientIds;
    } else if (type === "global") {
      const allUsers = await UserModel.find({}, "_id");
      recipients = allUsers.map((u) => u._id);
    } else {
      return res.status(400).json({ message: "نوع نوتیف نامعتبر است." });
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
    return res.status(500).json({ message: "خطای سرور", error: err });
  }
};

// دریافت نوتیف‌های کاربر (شخصی + عمومی)
export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const notifications = await Notification.find({
      $or: [
        { type: "global", recipients: userId },
        { type: "personal", recipients: userId },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("recipients", "fullName modelingCode")
      .populate("seenBy", "fullName modelingCode")
      .lean();

    return res.status(200).json({ notifications });
  } catch (err) {
    return res.status(500).json({ message: "خطای سرور", error: err });
  }
};

// دریافت همه نوتیف‌ها برای ادمین (همه نوتیف‌های عمومی و شخصی)
export const getAllNotificationsForAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const isAdmin = req.user?.role === "admin";
    if (!isAdmin) {
      return res.status(403).json({ message: "دسترسی غیرمجاز" });
    }

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .populate("recipients", "fullName modelingCode")
      .populate("seenBy", "fullName modelingCode")
      .lean();

    return res.status(200).json({ notifications });
  } catch (err) {
    return res.status(500).json({ message: "خطای سرور", error: err });
  }
};

// دریافت نوتیف خاص
export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate("recipients", "fullName modelingCode")
      .populate("seenBy", "fullName modelingCode");
    if (!notification) {
      return res.status(404).json({ message: "نوتیف پیدا نشد" });
    }

    return res.status(200).json({ notification });
  } catch (err) {
    return res.status(500).json({ message: "خطای سرور", error: err });
  }
};

// علامت زدن نوتیف به عنوان خوانده‌شده
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "کاربر یافت نشد" });
    }

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "نوتیف پیدا نشد" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const alreadySeen = notification.seenBy.some((id) =>
      id.equals(userObjectId)
    );

    if (!alreadySeen) {
      notification.seenBy.push(userObjectId);
      await notification.save();
    }

    return res
      .status(200)
      .json({ message: "علامت‌گذاری به عنوان خوانده‌شده انجام شد" });
  } catch (err) {
    return res.status(500).json({ message: "خطای سرور", error: err });
  }
};

// حذف نوتیف
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "نوتیف حذف شد" });
  } catch (err) {
    return res.status(500).json({ message: "خطای سرور", error: err });
  }
};
