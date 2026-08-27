# DokoSoko website

The public landing page for DokoSoko, built with Next.js and exported as a static site for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root route detects a saved or browser-preferred
language and falls back to English. You can also open a locale directly, for
example `http://localhost:3000/ja/`.

The site currently ships English, Spanish, French, German, Japanese, Ukrainian,
and Brazilian Portuguese. English is the source catalog in `messages/en.json`;
all user-facing copy is accessed through `next-intl` translation keys.

## Verification

```bash
npm test
npm run lint
npm run build
```

The i18n tests verify locale detection and require every catalog to match the
complete English key structure.

## Production build

```bash
npm run build
```

Next.js writes the static website to `out/`. The build supports both GitHub user sites and project sites: in GitHub Actions, the repository name is automatically used as the base path when needed.

## Publish with GitHub Pages

1. Push this repository to GitHub with `main` as the default branch.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. Push to `main` or run **Deploy website to GitHub Pages** manually from the Actions tab.

The workflow in `.github/workflows/deploy-pages.yml` installs dependencies, creates the static export, and deploys the `out/` artifact.
