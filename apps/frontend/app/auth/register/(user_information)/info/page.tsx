"use client";

import { z } from "zod";
import { Divider } from "@heroui/divider";
import { useEffect, useState } from "react";

import { CheckIcon, DocIcon, UserIcon } from "@/components/icons/icons";
import { DynamicForm, FieldType } from "@/components/dynamicForm";
import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/navigation";

export default function RegisterInfoPage() {
  const { setPersonalInfo } = useRegister();
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getEmail = localStorage.getItem("email");

    setEmail(getEmail);
  });

  const personalInfoFields: FieldType[] = [
    {
      name: "fullName",
      label: "نام کامل",
      description: "",
      type: "text",
      validation: z.string().min(2, "نام نمیتواند کمتر از دو حرف باشد"),
    },
    {
      name: "phone",
      label: "شماره تماس",
      description: "",
      type: "text",
      validation: z.string().regex(/^09\d{9}$/, "شماره تماس باید معتبر نیست"),
    },
    {
      name: "email",
      label: "ایمیل",
      description: "",
      type: "email",
      defaultValue: email,
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
      description: "",
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
      description: "",
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
      description: "",
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

  const handleRegisterInfo = (data: any) => {
    setPersonalInfo(data);
    router.push("/auth/register/info/technical");
  };

  return (
    <div className="w-[40rem] gap-4 p-2 flex rounded-[2rem] justify-between bg-Jet_Black_2">
      <header className="flex font-rokh z-10 items-center rounded-3xl gap-4 bg-Jet_Black_4 p-4 flex-col">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-Jet_Black p-4 rounded-2xl">
            <UserIcon />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl text-white">اطلاعات شخصی</h1>
          </div>
        </div>
        <Divider />
        <ul>
          {steps.map((step) => (
            <li key={step.name} className=" font-sf_bold my-2 p-2 rounded-full">
              <div className="flex items-center gap-2">
                <span
                  className={`${step.id === 1 ? "bg-Porcelain_White text-Jet_Black_2" : "bg-Jet_Black_2"} w-10 h-10 rounded-full flex items-center justify-center`}
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
          fields={personalInfoFields}
          submitLabel="بعدی"
          onSubmit={handleRegisterInfo}
        />
      </main>
    </div>
  );
}
