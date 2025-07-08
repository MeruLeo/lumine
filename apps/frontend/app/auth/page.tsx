// import Image from "next/image";
import { Link } from "@heroui/link";

import { LoginIcon, SendFormIcon } from "@/components/icons/icons";
import { title } from "@/components/primitives";

export default function StartPage() {
  return (
    <div className="absolute w-[300px] z-10 rounded-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* <div className="absolute w-[150px] h-[150px] z-0 blur-[20px] left-[-30%] rounded-full bg-Slate_Blue" /> */}
      <header className="flex font-rokh z-10 backdrop-2xl items-center rounded-t-3xl gap-4 justify-between bg-Jet_Black_4 p-4 flex-col">
        {/* <Image
          src={"public/"}
          alt="logo"
          width={70}
          height={70}
          className="rounded-2xl object-cover"
        /> */}
        <div className="flex flex-col items-center justify-center">
          <h1 className={`${title({ color: "primary" })} font-rokh text-7xl `}>
            لومینه
          </h1>
          <p className="text-Jet_Black_3">خوش آمدید</p>
        </div>
      </header>
      <main className="p-4 flex flex-col gap-4 bg-Jet_Black_2 rounded-b-3xl">
        <p className="text-right text-zinc-400">
          اگر فرم شما تایید شده است ، روی دکمه ورود کلیک کنید <br />
          اگر هنوز فرمی ارسال نکرده اید ، روی ارسال فرم کلیک کنید
        </p>
        <div className="flex flex-col gap-2 font-sf-bold">
          <Link
            className="bg-Porcelain_White flex gap-4 justify-between items-center text-Jet_Black rounded-xl textt-2xl text-center p-2 transition-all ease duration-200 hover:scale-95"
            href={`/auth/register`}
          >
            ارسال فرم
            <SendFormIcon />
          </Link>
          <Link
            className="bg-Jet_Black_4 rounded-xl flex gap-4 justify-between items-center text-white text-center p-2 transition-all ease duration-200 hover:scale-95"
            href={`/auth/login`}
          >
            ورود
            <LoginIcon />
          </Link>
        </div>
      </main>
    </div>
  );
}
