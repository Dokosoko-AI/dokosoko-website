import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  detectedLocalePath,
  detectPreferredLocale,
  normalizeLocale,
  replacePathLocale,
} from "../i18n/locale-detection.ts";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["en", "es", "fr", "de", "ja", "uk", "pt-BR"];

function leafPaths(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return typeof child === "object" && child !== null ? leafPaths(child, next) : [next];
  });
}

test("every locale has the complete English message shape", async () => {
  const catalogs = await Promise.all(locales.map(async (locale) => {
    const source = await readFile(path.join(repositoryRoot, "messages", `${locale}.json`), "utf8");
    return [locale, JSON.parse(source)];
  }));
  const expectedKeys = leafPaths(catalogs[0][1]).sort();

  for (const [locale, messages] of catalogs) {
    assert.deepEqual(leafPaths(messages).sort(), expectedKeys, `${locale} must match the English catalog`);
    for (const key of expectedKeys) {
      const value = key.split(".").reduce((current, part) => current[part], messages);
      assert.equal(typeof value, "string", `${locale}:${key} must be a string`);
      assert.ok(value.trim(), `${locale}:${key} must not be empty`);
    }
  }
});

test("locale normalization handles regions and Brazilian Portuguese", () => {
  assert.equal(normalizeLocale("en-NZ"), "en");
  assert.equal(normalizeLocale("es-MX"), "es");
  assert.equal(normalizeLocale("pt-PT"), "pt-BR");
  assert.equal(normalizeLocale("pt_BR"), "pt-BR");
  assert.equal(normalizeLocale("uk-UA"), "uk");
  assert.equal(normalizeLocale("zh-CN"), null);
});

test("automatic detection prefers a saved choice, then the browser, then English", () => {
  assert.equal(detectPreferredLocale("ja", ["de-DE"]), "ja");
  assert.equal(detectPreferredLocale(null, ["zh-CN", "fr-CA"]), "fr");
  assert.equal(detectPreferredLocale("unsupported", ["pt-PT"]), "pt-BR");
  assert.equal(detectPreferredLocale(null, ["zh-CN"]), "en");
  assert.equal(detectPreferredLocale(null, []), "en");
});

test("locale paths preserve static hosting base paths", () => {
  assert.equal(detectedLocalePath("/", "en"), "/en/");
  assert.equal(detectedLocalePath("/dokosoko-website", "fr"), "/dokosoko-website/fr/");
  assert.equal(detectedLocalePath("/dokosoko-website/", "pt-BR"), "/dokosoko-website/pt-BR/");
  assert.equal(replacePathLocale("/dokosoko-website/en/", "ja"), "/dokosoko-website/ja/");
  assert.equal(replacePathLocale("/de/de/", "uk"), "/de/uk/");
});

test("metadata never falls back to a loopback origin", async () => {
  const files = [
    "app/(language-detection)/page.tsx",
    "app/[locale]/layout.tsx",
  ];

  for (const file of files) {
    const source = await readFile(path.join(repositoryRoot, file), "utf8");
    assert.match(source, /NEXT_PUBLIC_SITE_URL \?\? "https:\/\/dokosoko\.ai\/"/, `${file} must default to the public origin`);
    assert.doesNotMatch(source, /https?:\/\/(?:localhost|127\.0\.0\.1|\[?::1\]?)/, `${file} must not emit loopback metadata`);
  }
});

test("localized UI components contain no direct English display literals", async () => {
  const files = [
    "app/[locale]/page.tsx",
    "app/integration-run-demo.tsx",
    "app/language-selector.tsx",
  ];

  for (const file of files) {
    const source = await readFile(path.join(repositoryRoot, file), "utf8");
    assert.doesNotMatch(source, />\s*[A-Za-z][^<{]*</, `${file} contains direct JSX copy`);
    assert.doesNotMatch(
      source,
      /\b(?:aria-label|title|placeholder)=["'][^"']*[A-Za-z][^"']*["']/,
      `${file} contains a direct translatable attribute`,
    );
  }
});
