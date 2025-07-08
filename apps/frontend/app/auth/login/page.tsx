"use client";

import { z } from "zod";
import { useState } from "react";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";

import { LoginIcon } from "@/components/icons/icons";
import { DynamicForm, FieldType } from "@/components/dynamicForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();

  const { login, isLoading, error, isAuthenticated } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const loginFields: FieldType[] = [
    {
      name: "phone", // unified field: phone or email
      label: "شماره موبایل",
      placeholder: "مثلاً 09123456789",
      type: "text",
      validation: z
        .string()
        .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
        .min(11, "شماره موبایل باید ۱۱ رقم باشد")
        .max(11, "شماره موبایل باید ۱۱ رقم باشد"),
    },
    {
      name: "password",
      label: "رمز عبور",
      placeholder: "حداقل ۸ کاراکتر",
      type: "password",
      validation: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    },
  ];

  const handleLogin = async (data: any) => {
    try {
      setFormError(null);
      await login(data);

      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err.response.data.message);
    }
  };

  return (
    <div className="absolute w-[300px] z-10 rounded-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <header className="flex font-rokh z-10 backdrop-2xl items-center rounded-t-3xl gap-4 justify-between bg-Jet_Black_4 p-4 flex-col">
        <div className="bg-Jet_Black p-4 rounded-2xl">
          <LoginIcon />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-white">ورود</h1>
        </div>
      </header>
      <main className="p-4 flex flex-col gap-4 bg-Jet_Black_2 rounded-b-3xl">
        <DynamicForm
          fields={loginFields}
          submitLabel={isLoading ? "در حال ورود..." : "ورود"}
          onSubmit={handleLogin}
        />
        {(formError || error) && (
          <p className="text-red-500 text-center text-sm">
            {formError || error}
          </p>
        )}
        <Link className="text-Porcelain_White underline" href="#">
          رمز عبور خود را فراموش کرده‌ام
        </Link>
      </main>
    </div>
  );
}
