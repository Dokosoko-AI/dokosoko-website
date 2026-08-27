"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

import { localePreferenceKey, replacePathLocale } from "../i18n/locale-detection";
import { routing, type AppLocale } from "../i18n/routing";

const optionKeys: Record<AppLocale, "en" | "es" | "fr" | "de" | "ja" | "uk" | "ptBR"> = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  ja: "ja",
  uk: "uk",
  "pt-BR": "ptBR",
};

export default function LanguageSelector() {
  const locale = useLocale();
  const t = useTranslations("language");

  useEffect(() => {
    try {
      localStorage.setItem(localePreferenceKey, locale);
    } catch {
      // The locale route remains authoritative when storage is unavailable.
    }
  }, [locale]);

  function changeLocale(nextLocale: AppLocale) {
    try {
      localStorage.setItem(localePreferenceKey, nextLocale);
    } catch {
      // Navigation does not depend on storage.
    }

    const target = new URL(window.location.href);
    target.pathname = replacePathLocale(target.pathname, nextLocale);

    window.location.assign(target);
  }

  return (
    <label className="language-selector">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9s-1.1 6.5-3.3 9c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z" />
      </svg>
      <span className="visually-hidden">{t("label")}</span>
      <select
        aria-label={t("label")}
        title={t("label")}
        value={locale}
        onChange={(event) => changeLocale(event.target.value as AppLocale)}
      >
        {routing.locales.map((candidate) => (
          <option key={candidate} value={candidate}>{t(`options.${optionKeys[candidate]}`)}</option>
        ))}
      </select>
    </label>
  );
}
