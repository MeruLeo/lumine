"use client";

import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

import {
  CheckIcon,
  ClockIcon,
  DocIcon,
  UserIcon,
} from "@/components/icons/icons";

export default function RegisterSuccessPage() {
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

  return (
    <div className="w-[55rem] gap-4 p-2 flex rounded-[2rem] justify-between bg-Jet_Black_2">
      <header className="flex font-rokh z-10 items-center rounded-3xl gap-4 bg-Jet_Black_4 p-4 flex-col">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-Jet_Black p-4 rounded-2xl">
            <CheckIcon />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl text-white">در انتظار تایید</h1>
          </div>
        </div>
        <Divider />
        <ul>
          {steps.map((step) => (
            <li key={step.name} className=" font-sf_bold my-2 p-2 rounded-full">
              <div className="flex items-center gap-2">
                <span
                  className={`${step.id === 3 ? "bg-Porcelain_White text-Jet_Black_2" : "bg-Jet_Black_2"} w-10 h-10 rounded-full flex items-center justify-center`}
                >
                  {step.icon}
                </span>
                <span>{step.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </header>
      <main className="p-4 flex relative items-center justify-center gap-4 bg-Jet_Black_2 rounded-3xl">
        <div className="flex gap-4 text-center justify-center items-center w-full h-full flex-col">
          <span className="text-Slate_Blue">
            <ClockIcon />
          </span>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">
              اطلاعات شما با موفقیت ارسال شد
            </h3>
            <p className="text-Jet_Black_3">
              اطلاعات شما مورد بررسی قرار میگیرد و نتیجه نهایی از طریق پیامک به
              شما اطلاع داده خواهد شد.
            </p>
            <Link
              className="bg-Porcelain_White mt-4 w-fit flex gap-4 justify-center items-center text-Jet_Black rounded-xl textt-2xl text-center p-2 transition-all ease duration-200 hover:scale-95"
              href={`/`}
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
