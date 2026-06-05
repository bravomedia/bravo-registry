import { cn } from "./cn";

export function focusRing() {
  return "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
}

export function disabledStyles() {
  return "disabled:opacity-50 disabled:pointer-events-none";
}

export function inputStyles() {
  return cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
    focusRing(),
    disabledStyles(),
  );
}

export function buttonBase() {
  return cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
    focusRing(),
    disabledStyles(),
  );
}
