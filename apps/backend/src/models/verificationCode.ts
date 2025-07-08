import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    type: {
      type: String,
      enum: ["email", "phone", "password-reset"],
      default: "email",
    },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const VerificationCode = mongoose.model(
  "VerificationCode",
  verificationCodeSchema
);
