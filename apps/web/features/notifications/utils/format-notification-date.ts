const persianNumberFormatter = new Intl.NumberFormat("fa-IR", {
  useGrouping: false,
});

function toPersianNumber(value: string | number): string {
  return persianNumberFormatter.format(Number(value));
}

export function formatNotificationDate(value: string): string {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);

  if (!match) {
    return value;
  }

  const [, year, month, day, hour, minute] = match;

  const date = [
    toPersianNumber(year),
    toPersianNumber(month),
    toPersianNumber(day),
  ].join("/");

  const time = [toPersianNumber(hour), toPersianNumber(minute)].join(":");

  return `${date} - ${time}`;
}
