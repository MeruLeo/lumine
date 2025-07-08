import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

import { ProjectBoxProps } from "@/types/projects";

import PersianDate from "../persianDate";

const categoryMap = {
  fashion: "مد و فشن",
  sportswear_men: "لباس اسپورت مردانه",
  sportswear_women: "لباس اسپورت زنانه",
  formal_men: "لباس رسمی مردانه",
  formal_women: "لباس رسمی زنانه",
  casual: "لباس روزمره",
  editorial: "ادیتوریال",
  advertisement: "تبلیغاتی",
  beauty: "زیبایی و آرایشی",
  product: "عکاسی محصول",
  lifestyle: "سبک زندگی",
  lookbook: "لوک‌بوک برند",
  streetwear: "لباس خیابانی",
  underwear: "لباس زیر",
  accessories: "اکسسوری",
  runway: "شو زنده",
  campaign: "کمپین برند",
  ecommerce: "فروشگاه اینترنتی",
  others: "سایر",
} as const;

export const ProjectBox = ({
  _id,
  name,
  description,
  category,
  endDate,
  model,
  startDate,
  status,
}: ProjectBoxProps) => {
  const statusMap = {
    completed: {
      title: "انجام شده",
      bgColor: "bg-green-900",
      textColor: "text-green-400",
    },
    in_progress: {
      title: "در حال انجام",
      bgColor: "bg-yellow-800",
      textColor: "text-yellow-300",
    },
    pending: {
      title: "در انتظار",
      bgColor: "bg-blue-900",
      textColor: "text-blue-300",
    },
    cancelled: {
      title: "لغو شده",
      bgColor: "bg-red-900",
      textColor: "text-red-400",
    },
  } as const;

  const statusKey = status?.toLowerCase?.() as keyof typeof statusMap;
  const statusInfo = statusMap[statusKey] ?? {
    title: "نامشخص",
    bgColor: "bg-gray-800",
    textColor: "text-gray-400",
  };

  const categoryLabel =
    categoryMap[category as keyof typeof categoryMap] ?? "نامشخص";

  return (
    <li>
      <Link
        className="bg-Jet_Black_4 p-4 relative text-Porcelain_White rounded-[2rem] flex justify-between flex-col w-[15rem] h-[12rem]"
        href={`/projects/${_id}`}
      >
        {/* <div className="absolute w-10 h-10 bg-Slate_Blue blur-xl top-5 right-5 rounded-full" /> */}
        <header className="w-full">
          <div>
            <div className="flex mb-4 justify-between items-center">
              <h4 className="text-2xl font-bold">
                {name.length > 8 ? `${name.slice(0, 8)} ...` : name}
              </h4>
              <span className="bg-Slate_Blue p-1 px-3 rounded-full">
                {<PersianDate createdAt={`${startDate}`} />}
              </span>
            </div>
            <p className="text-Ash_Gray">
              {description.length > 22
                ? `${description?.slice(0, 22)} ...`
                : description}
            </p>
          </div>
        </header>
        <Divider className="my-4" />
        <main className="w-full flex justify-between p-2 rounded-full bg-Jet_Black">
          <div>{categoryLabel}</div>
          <div
            className={`px-2 text-sm flex justify-center items-center rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}
          >
            {statusInfo.title}
          </div>
        </main>
      </Link>
    </li>
  );
};
