import { model, Schema, Document, Types } from "mongoose";
import type { IUser } from "../../../../packages/types/dist/index";

export interface userDocument extends IUser, Document {
  _id: Types.ObjectId;
}

const userSchema = new Schema<userDocument>(
  {
    fullName: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "model", "developer"],
      default: "model",
    },
    password: { type: String, required: true },
    modelingCode: { type: String, unique: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    married: { type: String, enum: ["S", "M"], required: true },
    national: { type: String, enum: ["P", "N"], required: true },
    nationalCode: { type: String, required: true },
    verifyPhone: { type: Boolean, default: false },
    age: { type: Number, required: true },
    level: { type: String, enum: ["B", "I", "P"] },
    gender: { type: String, enum: ["M", "F"], required: true },
    naturalStat: { type: String, enum: ["N", "A"], required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<userDocument>("User", userSchema);
