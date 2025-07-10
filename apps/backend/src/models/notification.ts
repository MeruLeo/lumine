import mongoose, { Document, Schema } from "mongoose";

export type NotificationType = "personal" | "global";
export type NotificationStatus = "info" | "success" | "warning" | "error";

export interface INotification extends Document {
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  recipients?: mongoose.Types.ObjectId[];
  sentAt: Date;
  seenBy: mongoose.Types.ObjectId[];
}

const NotificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["personal", "global"],
      required: true,
    },
    status: {
      type: String,
      enum: ["info", "success", "warning", "error"],
      default: "info",
    },
    recipients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
