import { useTranslations } from "next-intl";
import Script from "next/script";

import { withBasePath } from "../../i18n/assets";
import FlowParticle from "../flow-particle";
import IntegrationRunDemo from "../integration-run-demo";
import LanguageSelector from "../language-selector";

const docsUrl = "/dokosoko-docs/";
const productSetupUrl = `${docsUrl}guides/product-setup/`;
const securityUrl = `${docsUrl}concepts/security/`;
const githubUrl = "https://github.com/Dokosoko-AI/dokosoko-service";
const creditEmail = "ackermann.yuriy@gmail.com";
const creditGithubUrl = "https://github.com/yackermann";
const codexUrl = "https://openai.com/codex/";

const integrationSurfaces = ["docs", "apis", "sdks", "packages", "recipes"] as const;

const codingAgents = [
  { id: "claude", icon: withBasePath("/agents/claude.svg") },
  { id: "codex", icon: withBasePath("/agents/codex.png") },
  { id: "cursor", icon: withBasePath("/agents/cursor.svg") },
  { id: "opencode", icon: withBasePath("/agents/opencode.svg") },
] as const;

const mcpButtonAgents = [
  { id: "codex", icon: withBasePath("/agent-client-icons/codex.svg") },
  { id: "claude", icon: withBasePath("/agent-client-icons/claude-code.svg") },
  { id: "cursor", icon: withBasePath("/agent-client-icons/cursor.svg") },
  { id: "opencode", icon: withBasePath("/agent-client-icons/opencode.svg") },
] as const;

const outcomes = ["speed", "simplicity", "success"] as const;
const workflowSteps = ["publish", "guide", "learn"] as const;

function Brand({ compact = false }: { compact?: boolean }) {
  const t = useTranslations();

  return (
    <span className={`brand${compact ? " brand-compact" : ""}`}>
      {/* The static-exported SVG is already tiny; image optimization would add no value here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBasePath("/favicon.svg")} width={compact ? 22 : 26} height={compact ? 22 : 26} alt="" />
      <span>{t("title.main")}</span>
    </span>
  );
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function ConnectorSpinePreview() {
  const t = useTranslations();

  return (
    <figure className="connector-hero">
      <div className="connector-diagram" aria-hidden="true">
        <div className="source-network">
          <div className="stack-sources">
            {integrationSurfaces.map((surface) => (
              <div className="source-pill" key={surface}>
                <strong>{t(`diagram.surfaces.${surface}`)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="flow-link" />

        <div className="mcp-row">
          <div className="credential-branch">
            <span className="credential-lock">
              {/* Lucide's lock-keyhole mark, stored locally for the static site. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBasePath("/lock-keyhole.svg")} alt="" width="18" height="18" />
            </span>
            <strong>{t("diagram.secureAccess")}</strong>
          </div>

          <div className="mcp-node">
            {/* The official MCP mark is a tiny local static asset. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBasePath("/mcp.svg")} alt="" width="32" height="32" />
            <strong>{t("diagram.mcp")}</strong>
          </div>
        </div>

        <div className="flow-link" />

        <div className="agent-outcome">
          <div className="agent-logos">
            {codingAgents.map((agent) => (
              <div className="agent-logo" key={agent.id}>
                {/* The local marks are tiny static assets; image optimization adds no value. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={agent.icon} alt="" width="26" height="26" />
                <strong>{t(`agents.${agent.id}`)}</strong>
              </div>
            ))}
          </div>
        </div>

        <FlowParticle />
      </div>
      <figcaption>{t("diagram.caption")}</figcaption>
    </figure>
  );
}

function Workflow() {
  const t = useTranslations();

  return (
    <ol className="workflow-grid">
      {workflowSteps.map((step, index) => (
        <li key={step}>
          <div className="workflow-index"><span>0{index + 1}</span><i aria-hidden="true" /></div>
          <p className="workflow-verb">{t(`workflow.steps.${step}.verb`)}</p>
          <h3>{t(`workflow.steps.${step}.title`)}</h3>
          <p>{t(`workflow.steps.${step}.copy`)}</p>
          <footer><span>{t("workflow.resultLabel")}</span><strong>{t(`workflow.steps.${step}.output`)}</strong></footer>
        </li>
      ))}
    </ol>
  );
}

function OutcomePromises() {
  const t = useTranslations();

  return (
    <section className="outcomes-section" id="outcomes" aria-labelledby="outcomes-title">
      <div className="shell outcomes-head">
        <div>
          <p className="section-label">{t("outcomes.label")}</p>
          <h2 id="outcomes-title">{t("outcomes.title")}</h2>
        </div>
        <p>{t("outcomes.description")}</p>
      </div>
      <ol className="shell outcomes-grid">
        {outcomes.map((outcome, index) => (
          <li key={outcome}>
            <header><span>0{index + 1}</span><strong>{t(`outcomes.items.${outcome}.label`)}</strong></header>
            <h3>{t(`outcomes.items.${outcome}.title`)}</h3>
            <p>{t(`outcomes.items.${outcome}.copy`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MCPButtonShowcase() {
  const t = useTranslations();

  return (
    <section className="mcp-button-section section" aria-labelledby="mcp-button-title">
      <div className="shell mcp-button-showcase">
        <div className="mcp-button-message">
          <p className="section-label">{t("mcpButton.label")}</p>
          <h2 id="mcp-button-title">{t("mcpButton.title")}</h2>
          <p>{t("mcpButton.description")}</p>
        </div>

        <figure className="mcp-button-preview">
          <div className="mcp-button-preview-header">
            <span>{t("mcpButton.previewLabel")}</span>
            <code>&lt;dokosoko-mcp-button&gt;</code>
          </div>
          <div className="mcp-button-preview-body">
            <a
              className="mcp-embed-button"
              href={productSetupUrl}
              target="_blank"
              rel="noreferrer"
              data-dokosoko-agent-setup="public"
              aria-label={t("mcpButton.buttonLabel")}
            >
              <span>{t("mcpButton.buttonLabel")}</span>
              <span className="mcp-embed-clients" aria-hidden="true">
                {mcpButtonAgents.map((agent) => (
                  // These local marks mirror the service's generated MCP button.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={agent.id} src={agent.icon} alt="" title={t(`agents.${agent.id}`)} width="20" height="20" />
                ))}
              </span>
            </a>
            <p>{t("mcpButton.previewNote")}</p>
          </div>
          <figcaption>{t("mcpButton.caption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <a className="skip-link" href="#main-content">{t("accessibility.skipToContent")}</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand-link" href="#top" aria-label={t("accessibility.home")}><Brand /></a>
              <nav className="site-nav" aria-label={t("accessibility.mainNavigation")}>
                <a href="#outcomes">{t("navigation.why")}</a>
                <a href="#run">{t("navigation.how")}</a>
              </nav>
          <div className="header-actions">
            <span className="github-widget-slot">
              <a
                className="github-button"
                href={githubUrl}
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label={t("github.repositoryLabel")}
              >
                {t("github.star")}
              </a>
            </span>
            <LanguageSelector />
            <a className="header-link" href={productSetupUrl}>{t("navigation.getStarted")} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="shell hero-inner">
            <div className="hero-layout">
              <div className="hero-message">
                <h1>{t("hero.titleMain")} <em>{t("hero.titleEmphasis")}</em></h1>
                <p>{t("hero.description")}</p>
                <a className="text-link" href="#run">{t("hero.journeyLink")} <Arrow /></a>
              </div>
              <ConnectorSpinePreview />
            </div>
          </div>
        </section>

        <OutcomePromises />

        <section className="run-section section" id="run">
          <div className="shell section-intro run-intro">
            <p className="section-label">{t("runSection.label")}</p>
            <div>
              <h2>{t("runSection.title")}</h2>
            </div>
          </div>
          <div className="shell"><IntegrationRunDemo /></div>
        </section>

        <MCPButtonShowcase />

        <section className="workflow-section section" id="workflow">
          <div className="shell section-intro">
            <p className="section-label">{t("workflow.label")}</p>
            <div>
              <h2>{t("workflow.title")}</h2>
              <p>{t("workflow.description")}</p>
            </div>
          </div>
          <div className="shell"><Workflow /></div>
        </section>

        <section className="closing-section">
          <div className="shell closing-content">
            <p className="section-label">{t("closing.label")}</p>
            <h2>{t("closing.title")}</h2>
            <p>{t("closing.description")}</p>
            <a className="button button-light" href={productSetupUrl}>{t("closing.getStarted")} <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <a className="brand-link" href="#top" aria-label={t("accessibility.home")}><Brand compact /></a>
          <p>{t("footer.tagline")}</p>
          <nav aria-label={t("accessibility.footerNavigation")}>
            <a href={docsUrl}>{t("footer.documentation")}</a>
            <a href={securityUrl}>{t("footer.security")}</a>
            <a href={githubUrl} target="_blank" rel="noreferrer">{t("footer.github")} <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
        <div className="shell footer-credit">
          <p>
            <span>{t("footer.credit.designedBy")}</span>
            <span className="footer-credit-separator" aria-hidden="true">·</span>
            <a href={`mailto:${creditEmail}`}>{creditEmail}</a>
            <span className="footer-credit-separator" aria-hidden="true">·</span>
            <a href={creditGithubUrl} target="_blank" rel="noreferrer">{t("footer.github")} <span aria-hidden="true">↗</span></a>
          </p>
          <p className="footer-credit-codex">
            <span>{t("footer.credit.codex")}</span>
            <span className="footer-credit-separator" aria-hidden="true">·</span>
            <a href={codexUrl} target="_blank" rel="noreferrer">{t("footer.credit.codexLink")} <span aria-hidden="true">↗</span></a>
          </p>
        </div>
      </footer>
      <Script src="https://buttons.github.io/buttons.js" strategy="afterInteractive" />
    </>
  );
}
