import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { routing } from "../../i18n/routing";
import LanguageDetector from "./language-detector";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/");

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "metadata" });

  return {
    metadataBase: siteUrl,
    title: t("title"),
    description: t("description"),
    alternates: { canonical: new URL("en/", siteUrl).toString() },
    icons: { icon: new URL("favicon.svg", siteUrl) },
  };
}

export default async function RootPage() {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "redirect" });

  return <LanguageDetector message={t("message")} fallback={t("fallback")} />;
}
