import { z } from "zod";

const requiredNumberError = (fieldName: string) => ({
  error: (issue: { input: unknown }) => {
    if (issue.input === undefined || issue.input === null) {
      return `${fieldName} الزامی است`;
    }

    return `${fieldName} باید یک عدد باشد`;
  },
});

const requiredStringError = (fieldName: string) => ({
  error: (issue: { input: unknown }) => {
    if (issue.input === undefined || issue.input === null) {
      return `${fieldName} الزامی است`;
    }

    return `${fieldName} باید متن باشد`;
  },
});

export const createProjectSchema = z
  .object({
    province_id: z
      .number(requiredNumberError("انتخاب استان"))
      .int("استان باید عدد صحیح باشد")
      .positive("استان باید مثبت باشد"),

    name: z
      .string(requiredStringError("نام پروژه"))
      .trim()
      .min(3, "نام پروژه باید حداقل ۳ کاراکتر باشد")
      .max(100, "نام پروژه نباید بیشتر از ۱۰۰ کاراکتر باشد"),

    description: z
      .string(requiredStringError("توضیحات پروژه"))
      .trim()
      .min(10, "توضیحات پروژه باید حداقل ۱۰ کاراکتر باشد")
      .max(1000, "توضیحات پروژه نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),

    budget: z
      .number(requiredNumberError("بودجه پروژه"))
      .int("بودجه باید عدد صحیح باشد")
      .min(100_000, "بودجه باید حداقل ۱۰۰,۰۰۰ تومان باشد"),

    category_id: z
      .number(requiredNumberError("انتخاب دسته‌بندی"))
      .int("دسته‌بندی باید عدد صحیح باشد")
      .positive("دسته‌بندی باید مثبت باشد"),

    start_date: z
      .string(requiredStringError("تاریخ شروع"))
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "فرمت تاریخ شروع باید به صورت YYYY-MM-DD باشد (مثال: 1405-05-10)",
      ),

    end_date: z
      .string(requiredStringError("تاریخ پایان"))
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "فرمت تاریخ پایان باید به صورت YYYY-MM-DD باشد (مثال: 1405-05-31)",
      ),
  })
  .refine((data) => data.end_date > data.start_date, {
    message: "تاریخ پایان باید بعد از تاریخ شروع باشد",
    path: ["end_date"],
  });

export type CreateProjectType = z.infer<typeof createProjectSchema>;
