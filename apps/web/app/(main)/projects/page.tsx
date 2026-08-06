import { MainProjects } from "@/features/projects/components/main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پروژه ها",
};

export default function Projects() {
  return (
    <section className="flex flex-col gap-4 p-10">
      <header>
        <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          هرچیزی که برای دیده شدن احتیاج داری ، اینجاست
        </p>
      </header>
      <MainProjects />
    </section>
  );
}
