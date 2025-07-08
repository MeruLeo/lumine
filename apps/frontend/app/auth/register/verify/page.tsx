"use client";

import { useState } from "react";
import { z } from "zod";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";

import { MessageIcon } from "@/components/icons/icons";
import { DynamicForm, FieldType } from "@/components/dynamicForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterVerifyPage() {
  const router = useRouter();

  const { verifyEmailCode, error } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const verifyFields: FieldType[] = [
    {
      name: "code",
      label: "کد تایید",
      description: "کد تایید ارسال شده به تلفن همراهتان را وارد کنید.",
      type: "otp",
      validation: z.string(),
    },
  ];

  const handleVerify = async (data: any) => {
    try {
      setFormError(null);

      const email = localStorage.getItem("email");

      const fullData = {
        ...data,
        email,
      };

      await verifyEmailCode(fullData);
      router.push("/auth/register/info");
    } catch {
      setFormError("خطا در تایید ایمیل");
    }
  };

  return (
    <div className="absolute w-[300px] z-10 rounded-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <header className="flex font-rokh z-10 backdrop-2xl items-center rounded-t-3xl gap-4 justify-between bg-Jet_Black_4 p-4 flex-col">
        <div className="bg-Jet_Black p-4 rounded-2xl">
          <MessageIcon />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-white">تایید شماره تماس</h1>
        </div>
      </header>
      <main className="p-4 flex flex-col gap-4 bg-Jet_Black_2 rounded-b-3xl">
        <DynamicForm
          fields={verifyFields}
          submitLabel="بررسی"
          onSubmit={handleVerify}
        />
        {(formError || error) && (
          <p className="text-red-500 text-center text-sm">
            {formError || error}
          </p>
        )}
        <Link className="text-Porcelain_White underline" href="/auth/register">
          تغییر شماره تماس
        </Link>
      </main>
    </div>
  );
}
