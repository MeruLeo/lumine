import bcrypt from "bcrypt";
import { userDocument, UserModel } from "../../models/user";
import { Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";
import { IUser } from "../../../../../packages/types/dist";
import { errorResponse, successResponse } from "../../utils/responses";
import generateModelingCode from "../../utils/modelingCodeGen";
import { registerSchema, loginSchema } from "../../validators/user.schema";
import { sendVerificationEmail } from "../../services/sendVerifyCode";
import { VerificationCode } from "../../models/verificationCode";

type AsyncRequestHandler = (req: Request, res: Response) => Promise<any>;

export const register: AsyncRequestHandler = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return errorResponse(res, 400, "Invalid input", parsed.error.flatten());
    }

    const {
      fullName,
      password,
      email,
      naturalStat,
      CosmeticSurgeryExplain,
      age,
      gender,
      height,
      level,
      phone,
      weight,
      married,
      national,
      nationalCode,
    } = parsed.data;

    const userExists = await UserModel.findOne({ fullName });
    if (userExists)
      return errorResponse(res, 400, "User already exists", fullName);

    const totalUsers = await UserModel.countDocuments();

    const modelingCode = generateModelingCode({
      gender,
      naturalStat,
      height,
      level,
      createdAt: new Date(),
      uniqueIndex: totalUsers + 1,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      age,
      naturalStat,
      CosmeticSurgeryExplain,
      weight,
      height,
      modelingCode,
      gender,
      level,
      phone,
      married,
      national,
      nationalCode,
    });

    successResponse(res, 201, {
      message: "You register successfully",
      user,
    });
  } catch (err) {
    errorResponse(res, 500, "Server error", err);
  }
};

export const login: AsyncRequestHandler = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return errorResponse(
        res,
        400,
        "Invalid login input",
        parsed.error.flatten()
      );
    }

    const { phone, password } = parsed.data;

    const user = (await UserModel.findOne({ phone })) as userDocument;
    if (!user) return errorResponse(res, 401, "اطلاعات وارد شده صحیح نیست");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, 401, "اطلاعات وارد شده صحیح نیست");

    if (user.status === "pending") {
      return res
        .status(403)
        .json({ message: "حساب شما هنوز توسط مدیریت تایید نشده است" });
    } else if (user.status === "rejected") {
      return res
        .status(403)
        .json({ message: "فرم شما توسط مدیریت رد شده است" });
    }

    const payload = { _id: user._id.toString() };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    // Set both tokens in HttpOnly cookies
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 دقیقه
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 روز
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const refreshToken: AsyncRequestHandler = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = verifyRefreshToken(token) as { _id: string };

    const user = await UserModel.findById(decoded._id).lean();
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken({ _id: user._id.toString() });
    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Token refreshed" });
  } catch (err) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const logout: AsyncRequestHandler = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(204);

    const decoded = verifyRefreshToken(token) as { _id: string };
    const user = await UserModel.findById(decoded._id);

    if (user) {
      user.refreshToken = "";
      await user.save();
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const sendEmailVerificationCode = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "ایمیل الزامی است" });

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return errorResponse(res, 400, "کاربر از قبل وجود دارد", email);

    sendVerificationEmail(
      email,
      "تایید ایمیل",
      "تایید ایمیل برای ارسال فرم",
      "email"
    );

    res.json({ message: "کد تایید ارسال شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در ارسال کد", error: err });
  }
};

export const verifyEmailCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      return res.status(400).json({ message: "ایمیل و کد الزامی است" });

    const record = await VerificationCode.findOne({
      email,
      code,
      type: "email",
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!record)
      return res.status(400).json({ message: "کد نامعتبر یا منقضی شده است" });

    record.verified = true;
    await record.save();

    res.json({ message: "کد تایید شد با موفقیت", email });
  } catch (err) {
    res.status(500).json({ message: "خطا در تایید کد", error: err });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "ایمیل الزامی است" });

  const user = await UserModel.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "کاربری با این ایمیل یافت نشد" });

  sendVerificationEmail(
    user.email,
    "تغییر رمز عبور",
    "تایید ایمیل برای تغییر رمزعبور",
    "password-reset"
  );

  return res.status(200).json({ message: "کد بازیابی ارسال شد" });
};

export const verifyPasswordCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "ایمیل و کد الزامی هستند" });
  }

  const record = await VerificationCode.findOne({
    email,
    code,
    type: "password-reset",
    expiresAt: { $gt: new Date() },
    verified: false,
  });

  if (!record) {
    return res.status(400).json({ message: "کد اشتباه است یا منقضی شده" });
  }

  record.verified = true;
  await record.save();

  return res.status(200).json({ message: "کد تایید شد" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "ایمیل و رمز جدید الزامی هستند" });
  }

  const record = await VerificationCode.findOne({
    email,
    type: "password-reset",
    verified: true,
  }).sort({ createdAt: -1 });

  if (!record) {
    return res.status(400).json({ message: "تایید کد انجام نشده است" });
  }

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  await VerificationCode.deleteMany({ email, type: "password-reset" });

  return res.status(200).json({ message: "رمز عبور با موفقیت تغییر یافت" });
};
