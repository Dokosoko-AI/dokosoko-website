"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { withBasePath } from "../i18n/assets";

const agents = [
  { id: "claude", icon: withBasePath("/agents/claude.svg") },
  { id: "codex", icon: withBasePath("/agents/codex.png") },
  { id: "cursor", icon: withBasePath("/agents/cursor.svg") },
  { id: "opencode", icon: withBasePath("/agents/opencode.svg") },
] as const;

const trace = [
  { step: "01", id: "understand" },
  { step: "02", id: "build" },
  { step: "03", id: "checkAccess" },
  { step: "04", id: "confirm" },
] as const;

const resultItems = ["outcome", "access", "sensitive"] as const;

export default function IntegrationRunDemo() {
  const t = useTranslations();
  const [selectedAgent, setSelectedAgent] = useState<(typeof agents)[number]["id"]>("codex");

  return (
    <figure className="run-demo" aria-labelledby="run-demo-title">
      <div className="run-header">
        <div className="run-heading">
          <span className="run-eyebrow">{t("runDemo.eyebrow")}</span>
          <h3 className="run-title" id="run-demo-title">{t("runDemo.title")}</h3>
        </div>
      </div>

      <div className="run-agent-picker" role="group" aria-label={t("runDemo.agentPickerAria")}>
        <span className="run-picker-label">{t("runDemo.agentPickerLabel")}</span>
        <div className="run-agent-options">
          {agents.map((agent) => {
            const selected = agent.id === selectedAgent;

            return (
              <button
                className={`run-agent${selected ? " run-agent-selected" : ""}`}
                key={agent.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedAgent(agent.id)}
              >
                {/* These small local marks are already optimized static assets. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="run-agent-icon" src={agent.icon} width="18" height="18" alt="" />
                <span className="run-agent-name">{t(`agents.${agent.id}`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="run-request" aria-label={t("runDemo.customerGoalAria")}>
        <span className="run-request-label">{t("runDemo.customerGoalLabel")}</span>
        <p className="run-request-copy">{t("runDemo.requestedOutcome")}</p>
      </section>

      <dl className="run-context">
        <div className="run-context-item">
          <dt className="run-context-label">{t("runDemo.context.agentLabel")}</dt>
          <dd className="run-context-value">{t(`agents.${selectedAgent}`)}</dd>
        </div>
        <div className="run-context-item">
          <dt className="run-context-label">{t("runDemo.context.stageLabel")}</dt>
          <dd className="run-context-value">{t("runDemo.context.stageValue")}</dd>
        </div>
        <div className="run-context-item">
          <dt className="run-context-label">{t("runDemo.context.targetLabel")}</dt>
          <dd className="run-context-value">{t("runDemo.context.targetValue")}</dd>
        </div>
      </dl>

      <ol className="run-trace" aria-label={t("runDemo.traceAria")}>
        {trace.map((item) => (
          <li className="run-trace-row" key={item.id}>
            <span className="run-trace-step">{item.step}</span>
            <strong className="run-trace-label">{t(`runDemo.trace.${item.id}.label`)}</strong>
            <span className="run-trace-detail">{t(`runDemo.trace.${item.id}.detail`)}</span>
            <span className="run-trace-check" aria-hidden="true">✓</span>
          </li>
        ))}
      </ol>

      <section className="run-result run-result-validated" aria-label={t("runDemo.result.aria")}>
        <div className="run-result-heading">
          <span className="run-result-mark" aria-hidden="true">✓</span>
          <div className="run-result-copy">
            <span className="run-result-label">{t("runDemo.result.label")}</span>
            <strong className="run-result-status">{t("runDemo.result.status")}</strong>
          </div>
        </div>
        <p className="run-result-description">{t("runDemo.result.description")}</p>
        <ul className="run-result-list">
          {resultItems.map((item) => (
            <li className="run-result-item" key={item}>{t(`runDemo.result.items.${item}`)}</li>
          ))}
        </ul>
      </section>

      <figcaption className="run-caption">{t("runDemo.caption")}</figcaption>
    </figure>
  );
}
