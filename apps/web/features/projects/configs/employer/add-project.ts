import { FieldConfig } from "@/shared/types/form/form-builder";

export const createProjectFieldConfig: FieldConfig[] = [
  {
    name: "name",
    type: "text",
    label: "نام پروژه",
    placeholder: "مثال: پروژه عکاسی محصولات",
    required: true,
    description: "نام پروژه باید واضح و مشخص باشد",
    className: "w-full",
  },
  {
    name: "description",
    type: "textarea",
    label: "توضیحات پروژه",
    placeholder:
      "توضیحات کامل در مورد پروژه، نیازمندی‌ها و انتظارات خود را بنویسید...",
    required: true,
    description: "توضیحات دقیق باعث جذب متخصصان مناسب‌تر می‌شود",
    className: "w-full",
    rows: 6,
  },
  {
    name: "category_id",
    type: "select",
    label: "دسته‌بندی پروژه",
    placeholder: "یک دسته‌بندی انتخاب کنید",
    required: true,
    description: "نوع کار مورد نیاز خود را مشخص کنید",
    className: "w-full",
    // options will be fetched from API
  },
  {
    name: "province_id",
    type: "select",
    label: "استان",
    placeholder: "استان محل اجرای پروژه را انتخاب کنید",
    required: true,
    description: "محل اجرای پروژه",
    className: "w-full",
    // options will be fetched from API
  },
  {
    name: "budget",
    type: "number",
    label: "بودجه پروژه (تومان)",
    placeholder: "مثال: 2540000",
    required: true,
    description: "بودجه مورد نظر خود را به تومان وارد کنید",
    className: "w-full",
    min: 100000,
  },
  {
    name: "start_date",
    type: "date",
    label: "تاریخ شروع",
    placeholder: "1405-05-10",
    required: true,
    description: "تاریخ شروع پروژه به شمسی",
    className: "w-full md:w-1/2",
  },
  {
    name: "end_date",
    type: "date",
    label: "تاریخ پایان",
    placeholder: "1405-05-31",
    required: true,
    description: "تاریخ پایان پروژه به شمسی",
    className: "w-full md:w-1/2",
  },
];

export const CREATE_PROJECT_SUCCESS_ROUTE = "/projects";
export const CREATE_PROJECT_DRAFT_ROUTE = "/projects/drafts";
