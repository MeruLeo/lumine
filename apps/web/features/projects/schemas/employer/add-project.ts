import { z } from "zod";

const calendarDateSchema = z.object({
  year: z.number().int(),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
});

export const createProjectSchema = z
  .object({
    name: z
      .string({ error: "نام پروژه الزامی است" })
      .trim()
      .min(3, "نام پروژه باید حداقل ۳ کاراکتر باشد")
      .max(100, "نام پروژه نباید بیشتر از ۱۰۰ کاراکتر باشد"),

    description: z
      .string({ error: "توضیحات الزامی است" })
      .trim()
      .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد")
      .max(1000, "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),

    category_id: z.coerce
      .number({ error: "انتخاب دسته‌بندی الزامی است" })
      .int("دسته‌بندی نامعتبر است")
      .positive("دسته‌بندی نامعتبر است"),

    province_id: z.coerce
      .number({ error: "انتخاب استان الزامی است" })
      .int("استان نامعتبر است")
      .positive("استان نامعتبر است"),

    budget: z.coerce
      .number({ error: "بودجه الزامی است" })
      .int("بودجه باید عدد صحیح باشد")
      .positive("بودجه باید مثبت باشد")
      .min(100000, "بودجه باید حداقل ۱۰۰,۰۰۰ تومان باشد"),

    start_date: calendarDateSchema,
    end_date: calendarDateSchema,
  })
  .refine(
    (data) => {
      const toNumber = (date: z.infer<typeof calendarDateSchema>) =>
        date.year * 10000 + date.month * 100 + date.day;

      return toNumber(data.end_date) > toNumber(data.start_date);
    },
    {
      message: "تاریخ پایان باید بعد از تاریخ شروع باشد",
      path: ["end_date"],
    },
  );

export type CreateProjectFormInput = z.input<typeof createProjectSchema>;
export type CreateProjectType = z.output<typeof createProjectSchema>;
