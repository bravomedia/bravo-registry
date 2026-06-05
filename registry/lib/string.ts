export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
}

export function truncate(str: string, length = 100) {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
