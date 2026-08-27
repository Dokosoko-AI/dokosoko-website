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

const localePresentation: Record<AppLocale, { flag: string; short: string }> = {
  en: { flag: "🇬🇧", short: "EN" },
  es: { flag: "🇪🇸", short: "ES" },
  fr: { flag: "🇫🇷", short: "FR" },
  de: { flag: "🇩🇪", short: "DE" },
  ja: { flag: "🇯🇵", short: "JA" },
  uk: { flag: "🇺🇦", short: "UK" },
  "pt-BR": { flag: "🇧🇷", short: "PT" },
};

export default function LanguageSelector() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("language");
  const current = localePresentation[locale];

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
      <span className="language-selector-flag" aria-hidden="true">{current.flag}</span>
      <span className="language-selector-code" aria-hidden="true">{current.short}</span>
      <svg className="language-selector-chevron" viewBox="0 0 16 16" aria-hidden="true">
        <path d="m4 6 4 4 4-4" />
      </svg>
      <span className="visually-hidden">{t("label")}</span>
      <select
        aria-label={t("label")}
        title={t("label")}
        value={locale}
        onChange={(event) => changeLocale(event.target.value as AppLocale)}
      >
        {routing.locales.map((candidate) => (
          <option key={candidate} value={candidate}>
            {localePresentation[candidate].flag} {t(`options.${optionKeys[candidate]}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
