export const formatBudget = (num?: string | number) => {
  if (!num) return "نامشخص";
  const number = Number(num);

  if (isNaN(number)) return "نامعتبر";

  return number.toLocaleString("fa-IR") + " تومان";
};
