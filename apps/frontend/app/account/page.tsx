"use client";

import { useEffect, useState } from "react";
import { Divider } from "@heroui/divider";

import { useAuth } from "@/hooks/useAuth";
import { PersonalsBoxs, SimplePersonals } from "@/components/account/personals";
import { UserIcon } from "@/components/icons/icons";
import { CalcBMI } from "@/helpers/bmi";
import { ISidebarLink } from "@/components/sideBar";
import {
  ArrowLeftCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { TransitionChild } from "@headlessui/react";
import PersianNumber from "@/utils/convertToPersianNumber";

export default function DashboardPage() {
  const { user, getMe, isLoading, error } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  if (isLoading) return <p className="text-white">در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p className="text-white">کاربری یافت نشد.</p>;

  const calcHeightSituation = (h: number, g: "M" | "F") => {
    if (g === "M") {
      if (h < 165) return "کوتاه";
      if (h <= 180) return "متوسط";

      return "بلند";
    } else {
      if (h < 155) return "کوتاه";
      if (h <= 170) return "متوسط";

      return "بلند";
    }
  };
  const heightColor = (h: number, g: "M" | "F") => {
    if (g === "M") {
      if (h < 165) return "text-red-500";
      if (h <= 180) return "text-orange-500";

      return "text-green-500";
    } else {
      if (h < 155) return "text-red-500";
      if (h <= 170) return "text-orange-500";

      return "text-green-500";
    }
  };
  const levelSituation = (l: "B" | "I" | "P") => {
    if (l === "B") {
      return "مبتدی";
    } else if (l === "I") {
      return "خوب";
    } else {
      return "حرفه ای";
    }
  };

  return (
    <div className="w-full load-page p-4 hide-scrollbar flex flex-col justify-center items-start gap-6 overflow-auto">
      <header>
        <h1 className="text-5xl font-bold">حساب کاربری</h1>
      </header>
      <section className="bg-Jet_Black_4 gradient-border p-4 rounded-[2rem] w-full">
        <header className="flex gap-4">
          <div className="w-3 h-8 bg-Forest_Emerald rounded-full" />
          <h3 className="font-rokh text-Ash_Gray text-4xl">اطلاعات شخصی</h3>
        </header>
        <main className="mt-4 flex flex-col gap-8` ">
          <h1 className="text-3xl font-bold">{user.fullName}</h1>
          <ul className="flex mt-4 gap-16 items-center">
            <SimplePersonals
              title="نقش"
              value={user.role === "model" ? "مدل" : "مدیر"}
            />
            <SimplePersonals title="کد مدلینگ" value={`${user.modelingCode}`} />
            <SimplePersonals
              title="شماره تماس"
              value={<PersianNumber number={user.phone} />}
            />
            <SimplePersonals
              title="کد ملی"
              value={<PersianNumber number={user.nationalCode} />}
            />
            <SimplePersonals title="ایمیل" value={`${user.email}`} />
          </ul>
          <Divider className="my-8" />
          <ul className="flex gap-8 items-center">
            <PersonalsBoxs
              value={<PersianNumber number={user.height} />}
              title="قد"
              situation={calcHeightSituation(user.height, user.gender)}
              sitColor={heightColor(user.height, user.gender)}
            />
            <PersonalsBoxs
              value={<PersianNumber number={user.weight} />}
              title="وزن"
            />
            <PersonalsBoxs
              value={<CalcBMI h={user.height} w={user.weight} />}
              title="BMI"
            />
            <PersonalsBoxs
              value={<PersianNumber number={user.age} />}
              title="سن"
            />
          </ul>
        </main>
      </section>
      <section className="bg-Jet_Black_4 gradient-border p-4 rounded-[2rem] w-full">
        <header className="flex gap-4">
          <div className="w-3 h-8 bg-Slate_Blue rounded-full" />
          <h3 className="font-rokh text-Ash_Gray text-4xl">اطلاعات فنی</h3>
        </header>
        <main className="mt-4 flex flex-col gap-8` ">
          <ul className="flex gap-8 items-center">
            <PersonalsBoxs
              value={`${user.national ? "ایرانی" : "اتباع"}`}
              title="ملیت"
            />
            <PersonalsBoxs
              value={`${user.married === "M" ? "متاهل" : "مجرد"}`}
              title="وضعیت تاهل"
            />
            <PersonalsBoxs
              value={user.level}
              situation={levelSituation(user.level)}
              title="سطح"
            />
            <PersonalsBoxs
              value={`${user.naturalStat === "N" ? "نداشته" : "داشته"}`}
              title="عمل زیبایی"
            />
          </ul>
        </main>
      </section>
    </div>
  );
}
