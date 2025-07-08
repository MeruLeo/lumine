import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2),
  password: z.string().min(8),
  email: z.string().email().optional(),
  naturalStat: z.enum(["N", "A"]),
  CosmeticSurgeryExplain: z.string().optional(),
  age: z.number().int().min(10).max(100),
  gender: z.enum(["M", "F"]),
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(200),
  level: z.enum(["B", "I", "P"]),
  phone: z.string().regex(/^09\d{9}$/, "Phone must be a valid Iranian number"),
  married: z.enum(["S", "M"]),
  national: z.enum(["P", "N"]),
  nationalCode: z.string().length(10, "کد ملی باید ۱۰ رقم باشد"),
});

export const loginSchema = z.object({
  phone: z.string().regex(/^09\d{9}$/, "Phone must be a valid Iranian number"),
  password: z.string().min(6),
});
