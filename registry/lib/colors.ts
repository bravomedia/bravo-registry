export const semanticColors = {
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-blue-600 dark:text-blue-400",
};

export function getSemanticColor(type: keyof typeof semanticColors) {
  return semanticColors[type];
}
