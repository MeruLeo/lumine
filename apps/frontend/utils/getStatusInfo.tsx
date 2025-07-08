export function getStatusInfo(
  status: "in_progress" | "completed" | "pending" | "cancelled",
) {
  switch (status) {
    case "in_progress":
      return { label: "در حال انجام", color: "bg-orange-500" };
    case "completed":
      return { label: "انجام شده", color: "bg-green-600" };
    case "pending":
      return { label: "در انتظار", color: "bg-blue-500" };
    case "cancelled":
      return { label: "لغو شده", color: "bg-red-500" };
    default:
      return { label: "نامشخص", color: "bg-gray-500" };
  }
}
