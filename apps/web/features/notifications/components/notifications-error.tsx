import { Button } from "@heroui/react";

interface NotificationsErrorProps {
  error: unknown;
  onRetry: () => void;
}

export const NotificationsError = ({
  error,
  onRetry,
}: NotificationsErrorProps) => {
  return (
    <section
      role="alert"
      className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20"
    >
      <p className="text-sm font-medium text-red-700 dark:text-red-400">
        دریافت اعلان‌ها با خطا مواجه شد
      </p>

      <p className="max-w-md text-xs leading-5 text-red-600/80 dark:text-red-400/80">
        {error instanceof Error ? error.message : "لطفاً دوباره تلاش کنید."}
      </p>

      <Button type="button" size="sm" onPress={onRetry}>
        تلاش مجدد
      </Button>
    </section>
  );
};
