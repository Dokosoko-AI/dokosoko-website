import { useTranslations } from "next-intl";

import { withBasePath } from "../i18n/assets";

const traditionalSteps = [
  "documentation",
  "developerAccount",
  "readDocs",
  "choosePackage",
  "setupAccess",
  "findExamples",
  "support",
  "debug",
] as const;

const dokoSokoSteps = ["connect", "prompt", "implement", "review"] as const;

const codingAgents = [
  { id: "claude", icon: withBasePath("/agents/claude.svg") },
  { id: "codex", icon: withBasePath("/agents/codex.png") },
  { id: "cursor", icon: withBasePath("/agents/cursor.svg") },
  { id: "opencode", icon: withBasePath("/agents/opencode.svg") },
] as const;

export default function IntegrationRunDemo() {
  const t = useTranslations();

  return (
    <figure className="run-demo" aria-label={t("runDemo.comparisonAria")}>
      <div className="run-comparison">
        <section className="run-path run-path-traditional" aria-labelledby="run-traditional-title">
          <header className="run-path-header">
            <span className="run-eyebrow">{t("runDemo.traditional.eyebrow")}</span>
            <div className="run-header-main">
              <h3 id="run-traditional-title">{t("runDemo.traditional.title")}</h3>
              <div className="run-time run-time-traditional">
                <strong>{t("runDemo.traditional.time")}</strong>
                <span>{t("runDemo.traditional.timeLabel")}</span>
              </div>
            </div>
          </header>

          <div className="run-spaghetti">
            <svg viewBox="0 0 760 390" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path
                className="run-thread run-thread-main"
                d="M106 42 C250 -12 252 115 382 70 S576 -15 656 42 C585 130 418 106 104 182 C266 318 446 38 656 176 C560 310 330 188 104 344 C272 396 330 250 382 332 C476 244 558 395 658 344"
              />
              <path
                className="run-thread run-thread-loop"
                d="M382 70 C270 190 536 280 656 176 C716 124 546 54 382 70"
              />
              <path
                className="run-thread run-thread-loop"
                d="M104 182 C-4 238 180 286 104 344 C12 392 -18 162 104 182"
              />
              <path
                className="run-thread run-thread-detour"
                d="M656 42 C510 140 262 94 104 182 S244 330 382 332 C506 332 602 238 656 176"
              />
              <path
                className="run-thread run-thread-detour"
                d="M104 42 C176 114 96 248 104 344 C118 388 548 260 658 344"
              />
            </svg>
            <ul className="run-spaghetti-steps">
              {traditionalSteps.map((step, index) => (
                <li className={`run-spaghetti-step run-spaghetti-step-${index + 1}`} key={step}>
                  <span aria-hidden="true" />
                  <strong>{t(`runDemo.traditional.steps.${step}`)}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="run-friction-summary">
            <span>{t("runDemo.traditional.summaryLabel")}</span>
            <strong>{t("runDemo.traditional.summary")}</strong>
          </div>
        </section>

        <span className="run-versus" aria-hidden="true">{t("runDemo.versus")}</span>

        <section className="run-path run-path-dokosoko" aria-labelledby="run-dokosoko-title">
          <header className="run-path-header">
            <span className="run-eyebrow">{t("runDemo.dokosoko.eyebrow")}</span>
            <div className="run-header-main">
              <h3 id="run-dokosoko-title">{t("runDemo.dokosoko.title")}</h3>
              <div className="run-time run-time-dokosoko">
                <strong>{t("runDemo.dokosoko.time")}</strong>
                <span>{t("runDemo.dokosoko.timeLabel")}</span>
              </div>
            </div>
          </header>
          <ol className="run-direct-steps">
            {dokoSokoSteps.map((step, index) => (
              <li key={step}>
                <span className="run-direct-index" aria-hidden="true">
                  {index === 0 ? (
                    // The official MCP mark is a tiny local static asset.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={withBasePath("/mcp.svg")} alt="" width="18" height="18" />
                  ) : String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong>{t(`runDemo.dokosoko.steps.${step}.title`)}</strong>
                  <p>{t(`runDemo.dokosoko.steps.${step}.copy`)}</p>
                  {step === "connect" && (
                    <div className="run-agent-marks">
                      {codingAgents.map((agent) => (
                        <span className="run-agent-mark" key={agent.id}>
                          {/* These small local marks are already optimized static assets. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={agent.icon} alt={t(`agents.${agent.id}`)} width="18" height="18" />
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="run-result-card">
            <span className="run-result-mark" aria-hidden="true">✓</span>
            <div>
              <span className="run-result-label">{t("runDemo.dokosoko.result.label")}</span>
              <strong>{t("runDemo.dokosoko.result.title")}</strong>
              <p>{t("runDemo.dokosoko.result.copy")}</p>
            </div>
          </div>
        </section>
      </div>

    </figure>
  );
}
