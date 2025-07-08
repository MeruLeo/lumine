"use client";

import { useState } from "react";
import { z } from "zod";
import { Divider } from "@heroui/divider";
import { useRouter } from "next/navigation";

import { CheckIcon, DocIcon, UserIcon } from "@/components/icons/icons";
import { DynamicForm, FieldType } from "@/components/dynamicForm";
import { useRegister } from "@/hooks/useRegister";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterInfoPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const { personalInfo, setTechnicalInfo } = useRegister();
  const { register, error } = useAuth();

  const router = useRouter();

  const technicalInfoFields: FieldType[] = [
    {
      name: "height",
      label: "قد",
      description: "",
      type: "number",
      validation: z
        .number()
        .min(100, "قد غیر مجاز - خیلی کوتاه")
        .max(250, "قد غیر مجازه - خیلی بلند"),
    },
    {
      name: "weight",
      label: "وزن",
      description: "",
      type: "number",
      validation: z
        .number()
        .min(30, "وزن غیر مجاز - خیلی کم")
        .max(200, "وزن غیر مجاز - خیلی زیاد"),
    },
    {
      name: "naturalStat",
      label: "جراحی زیبایی",
      description: "",
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
      description: "",
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
    {
      name: "password",
      label: "رمزعبور",
      type: "password",
      validation: z
        .string()
        .min(8, "رمزعبور نمیتواند کمتر از هشت کاراکتر باشد"),
    },
  ];

  const steps = [
    {
      id: 1,
      name: "اطلاعات شخصی",
      icon: <UserIcon />,
    },
    {
      id: 2,
      name: "اطلاعات فنی",
      icon: <DocIcon />,
    },
    {
      id: 3,
      name: "تاییدیه نهایی",
      icon: <CheckIcon />,
    },
  ];

  const handleSendForm = async (data: any) => {
    try {
      setFormError(null);

      setTechnicalInfo({ ...data });

      const fullData = {
        ...personalInfo,
        ...data,
      };

      await register(fullData);

      router.push("/auth/register/info/success");
      localStorage.removeItem("email");
    } catch (err) {
      setFormError(`${err}`);
    }
  };

  return (
    <div className="w-[40rem] gap-4 p-2 flex rounded-[2rem] justify-between bg-Jet_Black_2">
      <header className="flex font-rokh z-10 items-center rounded-3xl gap-4 bg-Jet_Black_4 p-4 flex-col">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-Jet_Black p-4 rounded-2xl">
            <DocIcon />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl text-white">اطلاعات فنی</h1>
          </div>
        </div>
        <Divider />
        <ul>
          {steps.map((step) => (
            <li key={step.name} className=" font-sf_bold my-2 p-2 rounded-full">
              <div className="flex items-center gap-2">
                <span
                  className={`${step.id === 2 ? "bg-Porcelain_White text-Jet_Black_2" : "bg-Jet_Black_2"} w-10 h-10 rounded-full flex items-center justify-center`}
                >
                  {step.icon}
                </span>
                <span>{step.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </header>
      <main className="p-4 flex relative flex-col gap-4 bg-Jet_Black_2 rounded-3xl">
        <DynamicForm
          fields={technicalInfoFields}
          submitLabel="ارسال فرم"
          onSubmit={handleSendForm}
        />
        {(formError || error) && (
          <p className="text-red-500 text-center text-sm">
            {formError || error}
          </p>
        )}
      </main>
    </div>
  );
}
