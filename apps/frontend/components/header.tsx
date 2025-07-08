import { Button } from "@heroui/button";
import { title } from "./primitives";

export const Header = () => {
  return (
    <header className=" rounded-full p-4 w-full flex justify-between items-center">
      <h1 className={`${title({ color: "primary" })} font-rokh text-7xl `}>
        لومینه
      </h1>
      <Button radius="full">در دست ساخت</Button>
    </header>
  );
};
