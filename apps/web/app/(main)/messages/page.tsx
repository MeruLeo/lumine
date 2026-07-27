import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پیام ها",
};

export default function Messages() {
  return (
    <section className="flex flex-col m-4 items-center justify-center gap-4 py-8 md:py-10">
      <h1>
        به زودی میتوانید با مدل یا کارفرمای مدنظر خود در این صفحه مکالمه خصوصی
        داشته باشید.
      </h1>
    </section>
  );
}
