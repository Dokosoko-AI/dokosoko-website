"use client";

import { useEffect } from "react";

import {
  detectedLocalePath,
  detectPreferredLocale,
  localePreferenceKey,
} from "../../i18n/locale-detection";

export default function LanguageDetector({
  message,
  fallback,
}: {
  message: string;
  fallback: string;
}) {
  useEffect(() => {
    let savedLocale: string | null = null;

    try {
      savedLocale = localStorage.getItem(localePreferenceKey);
    } catch {
      // Language detection still works when storage is unavailable.
    }

    const locale = detectPreferredLocale(savedLocale, navigator.languages ?? [navigator.language]);
    const target = new URL(window.location.href);
    target.pathname = detectedLocalePath(target.pathname, locale);
    window.location.replace(target);
  }, []);

  return (
    <main className="language-detection">
      <span className="language-detection-mark" aria-hidden="true">D</span>
      <p>{message}</p>
      <a href="./en/">{fallback}</a>
    </main>
  );
}
