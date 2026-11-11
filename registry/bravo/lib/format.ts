export function formatDate(date: Date | string, locale = "sv-SE") {
  const d = new Date(date);

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

export function formatNumber(num: number, locale = "sv-SE") {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatCurrency(amount: number, currency = "SEK", locale = "sv-SE") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
