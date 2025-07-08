import { title } from "@/components/primitives";
import { Tab, TabGroup, TabList } from "@headlessui/react";

export default function InboxPage() {
  return (
    <div className="flex load-page flex-col items-start p-4 overflow-auto w-full">
      <header>
        <h1 className="text-5xl font-bold">صندوق ورودی</h1>
      </header>
      <main className="pt-8 gap-8 flex">
        <header></header>
      </main>
    </div>
  );
}
