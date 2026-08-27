import { routing, type AppLocale } from "./routing.ts";

export const localePreferenceKey = "dokosoko-locale";

export function normalizeLocale(value: string | null | undefined): AppLocale | null {
  if (!value) return null;

  const normalized = value.trim().replaceAll("_", "-").toLowerCase();
  const exact = routing.locales.find((locale) => locale.toLowerCase() === normalized);
  if (exact) return exact;

  const language = normalized.split("-")[0];
  if (language === "pt") return "pt-BR";

  return routing.locales.find((locale) => locale.toLowerCase() === language) ?? null;
}

export function detectPreferredLocale(
  savedLocale: string | null | undefined,
  browserLocales: readonly string[],
): AppLocale {
  const saved = normalizeLocale(savedLocale);
  if (saved) return saved;

  for (const browserLocale of browserLocales) {
    const locale = normalizeLocale(browserLocale);
    if (locale) return locale;
  }

  return routing.defaultLocale;
}

export function detectedLocalePath(rootPathname: string, locale: AppLocale): string {
  return `${rootPathname.replace(/\/?$/, "/")}${locale}/`;
}

export function replacePathLocale(pathname: string, nextLocale: AppLocale): string {
  const segments = pathname.split("/");

  for (let index = segments.length - 1; index >= 0; index -= 1) {
    if (normalizeLocale(segments[index]) && routing.locales.some(
      (locale) => locale.toLowerCase() === segments[index].toLowerCase(),
    )) {
      segments[index] = nextLocale;
      return segments.join("/");
    }
  }

  return detectedLocalePath(pathname, nextLocale);
}
