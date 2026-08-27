import "../globals.css";

import { localePreferenceKey } from "../../i18n/locale-detection";
import { routing } from "../../i18n/routing";

const localeRedirectScript = `
(() => {
  const locales = ${JSON.stringify(routing.locales)};
  const defaultLocale = ${JSON.stringify(routing.defaultLocale)};
  const preferenceKey = ${JSON.stringify(localePreferenceKey)};
  const normalize = (value) => {
    if (!value || typeof value !== "string") return null;

    const normalized = value.trim().replaceAll("_", "-").toLowerCase();
    const exact = locales.find((locale) => locale.toLowerCase() === normalized);
    if (exact) return exact;

    const language = normalized.split("-")[0];
    if (language === "pt") {
      return locales.find((locale) => locale.toLowerCase() === "pt-br") ?? null;
    }

    return locales.find((locale) => locale.toLowerCase() === language) ?? null;
  };

  let savedLocale = null;
  try {
    savedLocale = localStorage.getItem(preferenceKey);
  } catch {}

  const browserLocales = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const locale = normalize(savedLocale)
    ?? browserLocales.map(normalize).find(Boolean)
    ?? defaultLocale;
  const target = new URL(window.location.href);
  target.pathname = target.pathname.replace(/\\/?$/, "/") + locale + "/";
  window.location.replace(target);
})();
`;

export default function LanguageDetectionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          id="locale-redirect"
          dangerouslySetInnerHTML={{ __html: localeRedirectScript }}
        />
        {children}
      </body>
    </html>
  );
}
