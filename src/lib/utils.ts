export function cn(...classes: (string | boolean | undefined | null | Record<string, boolean> | (string | boolean | undefined | null)[])[]) {
  return classes
    .flat()
    .filter(Boolean)
    .join(" ");
}
