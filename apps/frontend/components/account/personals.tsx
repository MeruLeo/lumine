import React from "react";
import { IDashBox } from "@/types";
import { Divider } from "@heroui/divider";
import {
  ArrowLeftStartOnRectangleIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

type ISimplePersonals = {
  title: string;
  value: string;
};

type IPersonalsBoxs = {
  icon: any;
  title: string;
  value: string | any;
};

export const SimplePersonals = ({ title, value }: ISimplePersonals) => {
  return (
    <li className="flex flex-col">
      <span className="text-Ash_Gray">{title}</span>
      <span className="font-bold text-xl">{value}</span>
    </li>
  );
};

export const PersonalsBoxs = ({
  title,
  value,
  sitColor,
  situation,
}: IDashBox) => {
  return (
    <li
      className={`${situation ? "justify-between" : "justify-center"} gradient-border w-full flex flex-col p-4 h-[10rem] bg-Jet_Black_2 rounded-3xl`}
    >
      <div className="flex flex-col">
        <span className="text-Ash_Gray">{title}</span>
        <span className={`${situation ? "text-3xl" : "text-5xl"} font-bold`}>
          {value}
        </span>{" "}
      </div>
      <Divider className={situation ? "block" : "hidden"} />
      <div
        className={`${situation ? "flex" : "hidden"} justify-between items-center`}
      >
        <span className="text-Ash_Gray">وضعیت</span>
        <span className={sitColor}>{situation}</span>
      </div>
    </li>
  );
};
