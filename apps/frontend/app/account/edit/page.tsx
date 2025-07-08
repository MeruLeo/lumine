"use client";

import { z } from "zod";

import { DynamicForm, FieldType } from "@/components/dynamicForm";

const accountInfoFields: FieldType[] = [
  {
    name: "fullName",
    label: "نام کامل",
    // description: "",
    type: "text",
    validation: z.string().min(2, "نام نمیتواند کمتر از دو حرف باشد"),
  },
  {
    name: "phone",
    label: "شماره تماس",
    // description: "",
    type: "text",
    validation: z.string().regex(/^09\d{9}$/, "شماره تماس باید معتبر نیست"),
  },
  {
    name: "email",
    label: "ایمیل",
    type: "email",
    // defaultValue: email,
    validation: z.string().email("ایمیل معتبر نیست"),
  },
  {
    name: "age",
    label: "سن",
    type: "number",
    validation: z
      .number({ invalid_type_error: "سن باید یک عدد باشد" })
      .min(10, "حداقل سن ۱۰ سال است")
      .max(100, "حداکثر سن ۱۰۰ سال است"),
  },
  {
    name: "national",
    label: "ملیت",
    // description: "",
    type: "select",
    options: [
      {
        label: "ایرانی",
        value: "P",
      },
      {
        label: "غیر ایرانی",
        value: "N",
      },
    ],
    validation: z.enum(["P", "N"]),
  },
  {
    name: "nationalCode",
    label: "کد ملی",
    // description: "",
    type: "text",
    validation: z.string().length(10, "کد ملی باید ۱۰ رقم باشد"),
  },
  {
    name: "gender",
    label: "جنسیت",
    type: "select",
    options: [
      { label: "مرد", value: "M" },
      { label: "زن", value: "F" },
    ],
    validation: z.enum(["M", "F"]),
  },
  {
    name: "married",
    label: "وضعیت تاهل",
    // description: "",
    type: "select",
    options: [
      {
        label: "مجرد",
        value: "S",
      },
      {
        label: "متاهل",
        value: "M",
      },
    ],
    validation: z.enum(["S", "M"]),
  },
  {
    name: "height",
    label: "قد",
    // description: "",
    type: "number",
    validation: z
      .number()
      .min(100, "قد غیر مجاز - خیلی کوتاه")
      .max(250, "قد غیر مجازه - خیلی بلند"),
  },
  {
    name: "weight",
    label: "وزن",
    // description: "",
    type: "number",
    validation: z
      .number()
      .min(30, "وزن غیر مجاز - خیلی کم")
      .max(200, "وزن غیر مجاز - خیلی زیاد"),
  },
  {
    name: "naturalStat",
    label: "جراحی زیبایی",
    // description: "",
    type: "select",
    options: [
      {
        label: "نداشته ام",
        value: "N",
      },
      {
        label: "داشته ام",
        value: "A",
      },
    ],
    validation: z.enum(["N", "A"]),
  },
  {
    name: "level",
    label: "سابقه فعالیت در مدلینگ",
    // description: "",
    type: "select",
    options: [
      {
        label: "مبتدی",
        value: "B",
      },
      {
        label: "متوسط",
        value: "I",
      },
      {
        label: "حرفه ای",
        value: "P",
      },
    ],
    validation: z.string(),
  },
];

export default function EditAccountPage() {
  const handleUpdate = () => {
    console.log("update");
  };

  return (
    <div className="flex load-page flex-col items-center justify-center p-4 w-full">
      <header>
        <h1 className="text-5xl font-bold">ویرایش حساب</h1>
      </header>
      <main className="gap-8 mt-10 justify-start items-start flex">
        <DynamicForm
          fields={accountInfoFields}
          submitLabel="بروزرسانی"
          onSubmit={handleUpdate}
        />
      </main>
    </div>
  );
}
