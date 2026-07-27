import { Tray } from "@gravity-ui/icons";

export function NotificationEmptyState() {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center  p-6 text-center">
      <h3 className="text-base gap-4 font-semibold flex flex-col justify-center items-center">
        <Tray className="size-15 text-primary" />
        اعلانی پیدا نشد
      </h3>
      <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
        فیلترها را تغییر دهید یا بعداً دوباره بررسی کنید.
      </p>
    </div>
  );
}
