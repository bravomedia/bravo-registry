export function formatDate(date: Date | string) {
  const d = new Date(date);

  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("sv-SE").format(num);
}

export function formatCurrency(amount: number, currency = "SEK") {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency,
  }).format(amount);
}
