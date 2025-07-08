import React, { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IMainPage {
  name: string;
  link: string;
  icon: any;
  access: "everyone" | "admins";
}

export interface IDashBox {
  title: string;
  value: string | any;
  title2?: string;
  value2?: string;
  situation?:
    | "اضافه وزن"
    | "چاقی"
    | "نرمال"
    | "کمبود وزن"
    | "بلند"
    | "متوسط"
    | "کوتاه"
    | "تازه کار"
    | "کار کرده"
    | "حرفه ای"
    | "ایرانی"
    | "اتباع"
    | "مجرد"
    | "متاهل"
    | "نداشته ام"
    | "داشته ام";
  sitColor?: "text-red-500" | "text-green-500" | "text-orange-500";
}
