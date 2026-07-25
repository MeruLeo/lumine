import type { ReactNode } from "react";

interface PropertyRowProps {
  icon?: ReactNode;
  label: string;
  children: ReactNode;
}

export const PropertyRow = ({ icon, label, children }: PropertyRowProps) => {
  return (
    <div
      className="group flex min-h-10 items-center gap-1 rounded-full px-1 py-1.5 transition hover:bg-card"
      data-testid="property-row"
    >
      <div className="flex w-36 shrink-0 items-center gap-2 text-text-tertiary-light dark:text-tertiary-dark">
        {icon && <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex min-w-0 flex-1 items-center text-sm">{children}</div>
    </div>
  );
};
