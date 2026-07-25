interface DescriptionProps {
  text: string;
}

export const Description = ({ text }: DescriptionProps) => {
  return (
    <section className="flex flex-col gap-3" data-testid="project-description">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        شرح پروژه
      </h2>
      <p className="whitespace-pre-line text-[15px] leading-8 text-zinc-700 dark:text-zinc-300">
        {text}
      </p>
    </section>
  );
};
