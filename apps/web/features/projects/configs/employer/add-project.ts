import { FieldConfig } from "@/shared/types/form/form-builder";

interface CreateProjectConfigOptions {
  categoryOptions: { label: string; value: number }[];
  provinceOptions: { label: string; value: number }[];
}

export const createProjectFieldConfig = ({
  categoryOptions,
  provinceOptions,
}: CreateProjectConfigOptions): FieldConfig[] => [
  {
    name: "name",
    type: "text",
    label: "نام پروژه",
    placeholder: "مثال: پروژه عکاسی محصولات",
    required: true,
  },
  {
    name: "description",
    type: "textarea",
    label: "توضیحات پروژه",
    placeholder: "توضیحات کامل، نیازمندی‌ها و انتظارات خود را بنویسید...",
    required: true,
    rows: 5,
  },
  {
    name: "category_id",
    type: "select",
    label: "دسته‌بندی پروژه",
    placeholder: "یک دسته‌بندی انتخاب کنید",
    required: true,
    options: categoryOptions,
    variant: "secondary",
  },
  {
    name: "province_id",
    type: "select",
    label: "استان",
    placeholder: "استان محل اجرای پروژه",
    required: true,
    variant: "secondary",
    options: provinceOptions,
  },
  {
    name: "budget",
    type: "number",
    label: "بودجه پروژه (تومان)",
    placeholder: "مثال: 2540000",
    required: true,
  },
  {
    name: "start_date",
    type: "date",
    label: "تاریخ شروع",
    placeholder: "تاریخ شروع را انتخاب کنید",
    variant: "secondary",
    required: true,
  },
  {
    name: "end_date",
    type: "date",
    label: "تاریخ پایان",
    placeholder: "تاریخ پایان را انتخاب کنید",
    variant: "secondary",
    required: true,
  },
];

export const CREATE_PROJECT_SUCCESS_ROUTE = "/projects";
export const CREATE_PROJECT_DRAFT_ROUTE = "/projects/drafts";
