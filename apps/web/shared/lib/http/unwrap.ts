import type { ApiEnvelopeDto } from "@/features/projects/types/project-api";

export function unwrapData<TData>(value: TData | ApiEnvelopeDto<TData>): TData {
  if (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    "data" in value
  ) {
    return (value as ApiEnvelopeDto<TData>).data;
  }

  return value as TData;
}
