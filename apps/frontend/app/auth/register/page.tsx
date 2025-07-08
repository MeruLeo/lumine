"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { SendFormIcon } from "@/components/icons/icons";
import { DynamicForm, FieldType } from "@/components/dynamicForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();

  const { sendEmailVerificationCode, error } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const registerFields: FieldType[] = [
    {
      name: "email",
      label: "ایمیل",
      placeholder: "lumine@example.com",
      type: "email",
      validation: z.string().email("ایمیل وارد شده معتبر نیست"),
    },
    // {
    //   name: "phone",
    //   label: "شماره موبایل",
    //   placeholder: "مثلاً 09123456789",
    //   type: "text",
    //   validation: z
    //     .string()
    //     .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    //     .min(11, "شماره موبایل باید ۱۱ رقم باشد")
    //     .max(11, "شماره موبایل باید ۱۱ رقم باشد"),
    // },
  ];

  const handleRegister = async (data: any) => {
    try {
      setFormError(null);
      await sendEmailVerificationCode(data);

      localStorage.setItem("email", data.email);

      router.push("/auth/register/verify");
    } catch (err: any) {
      setFormError(err.response.data.message);
    }
  };

  return (
    <div className="absolute w-[300px] z-10 rounded-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <header className="flex font-rokh z-10 backdrop-2xl items-center rounded-t-3xl gap-4 justify-between bg-Jet_Black_4 p-4 flex-col">
        <div className="bg-Jet_Black p-4 rounded-2xl">
          <SendFormIcon />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-white">ثبت نام</h1>
        </div>
      </header>
      <main className="p-4 flex flex-col gap-4 bg-Jet_Black_2 rounded-b-3xl">
        <DynamicForm
          fields={registerFields}
          submitLabel="ارسال کد تایید"
          onSubmit={handleRegister}
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
