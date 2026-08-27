import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing, type AppLocale } from "../../i18n/routing";
import { geistMono, geistSans } from "../fonts";
import "../globals.css";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/");

const openGraphLocales: Record<AppLocale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  ja: "ja_JP",
  uk: "uk_UA",
  "pt-BR": "pt_BR",
};

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(routing.locales, requestedLocale)) notFound();

  const locale = requestedLocale;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const localizedUrl = new URL(`${locale}/`, siteUrl);
  const languageAlternates = Object.fromEntries(
    routing.locales.map((candidate) => [candidate, new URL(`${candidate}/`, siteUrl).toString()]),
  );

  return {
    metadataBase: siteUrl,
    title: t("title"),
    description: t("description"),
    icons: { icon: new URL("favicon.svg", siteUrl) },
    alternates: {
      canonical: localizedUrl.toString(),
      languages: { ...languageAlternates, "x-default": siteUrl.toString() },
    },
    openGraph: {
      title: t("title"),
      description: t("socialDescription"),
      type: "website",
      url: localizedUrl,
      locale: openGraphLocales[locale],
      alternateLocale: routing.locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => openGraphLocales[candidate]),
      images: [{
        url: new URL("og.png", siteUrl),
        width: 1200,
        height: 630,
        alt: t("imageAlt"),
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("socialDescription"),
      images: [new URL("og.png", siteUrl)],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
