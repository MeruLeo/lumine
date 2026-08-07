const skeletonItems = Array.from({ length: 5 }, (_, index) => index);

export const NotificationsLoading = () => {
  return (
    <section
      className="flex flex-col gap-3"
      aria-busy="true"
      aria-label="در حال دریافت اعلان‌ها"
    >
      {skeletonItems.map((item) => (
        <div
          key={item}
          className="flex min-h-[116px] animate-pulse gap-3 rounded-xl border border-border bg-card p-4"
        >
          <span className="size-10 shrink-0 rounded-lg bg-zinc-200 dark:bg-zinc-800" />

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex justify-between gap-4">
              <span className="h-4 w-2/5 rounded bg-zinc-200 dark:bg-zinc-800" />
              <span className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <span className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <span className="h-3 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </section>
  );
};
