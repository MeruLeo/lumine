interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count <= 0) return null;

  return (
    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-base-light px-1.5 py-0.5 text-xs font-semibold text-base-dark">
      {count > 99 ? "99+" : count}
    </span>
  );
}
