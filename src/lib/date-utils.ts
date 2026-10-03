export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isSameDay(d1: Date | null | undefined, d2: Date | null | undefined): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isBeforeDay(d1: Date, d2: Date): boolean {
  return startOfDay(d1).getTime() < startOfDay(d2).getTime();
}

export function isAfterDay(d1: Date, d2: Date): boolean {
  return startOfDay(d1).getTime() > startOfDay(d2).getTime();
}

export function isBetweenDays(target: Date, start: Date, end: Date): boolean {
  const t = startOfDay(target).getTime();
  const s = startOfDay(start).getTime();
  const e = startOfDay(end).getTime();
  return t > s && t < e;
}

export function formatDate(date: Date | null | undefined, locale = "id-ID"): string {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatMonthYear(year: number, month: number, locale = "id-ID"): string {
  const d = new Date(year, month, 1);
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(d);
}
