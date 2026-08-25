"use client";

import { useState } from "react";

const agents = [
  { name: "Claude", icon: "./agents/claude.svg" },
  { name: "Codex", icon: "./agents/codex.png" },
  { name: "Cursor", icon: "./agents/cursor.svg" },
  { name: "OpenCode", icon: "./agents/opencode.svg" },
] as const;

const trace = [
  { step: "01", label: "Resolve", detail: "exact published version selected" },
  { step: "02", label: "Guide", detail: "compatible package and recipe surfaced" },
  { step: "03", label: "Authorize", detail: "bounded setup checked" },
  { step: "04", label: "Record", detail: "external evidence closes run" },
] as const;

const requestedOutcome = "Install the SDK, authenticate, and verify the first production API request.";

export default function IntegrationRunDemo() {
  const [selectedAgent, setSelectedAgent] = useState<(typeof agents)[number]["name"]>("Codex");

  return (
    <figure className="run-demo" aria-labelledby="run-demo-title">
      <div className="run-header">
        <div className="run-heading">
          <span className="run-eyebrow">Illustrative integration run</span>
          <h3 className="run-title" id="run-demo-title">From requested outcome to recorded result</h3>
        </div>
      </div>

      <div className="run-agent-picker" role="group" aria-label="Select a supported coding agent">
        <span className="run-picker-label">Supported agent</span>
        <div className="run-agent-options">
          {agents.map((agent) => {
            const selected = agent.name === selectedAgent;

            return (
              <button
                className={`run-agent${selected ? " run-agent-selected" : ""}`}
                key={agent.name}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedAgent(agent.name)}
              >
                {/* These small local marks are already optimized static assets. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="run-agent-icon" src={agent.icon} width="18" height="18" alt="" />
                <span className="run-agent-name">{agent.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="run-request" aria-label="Requested outcome">
        <span className="run-request-label">Requested outcome</span>
        <p className="run-request-copy">{requestedOutcome}</p>
      </section>

      <dl className="run-context">
        <div className="run-context-item">
          <dt className="run-context-label">Selected agent</dt>
          <dd className="run-context-value">{selectedAgent}</dd>
        </div>
        <div className="run-context-item">
          <dt className="run-context-label">Endpoint</dt>
          <dd className="run-context-value"><code className="run-context-code">POST /mcp</code></dd>
        </div>
        <div className="run-context-item">
          <dt className="run-context-label">Environment</dt>
          <dd className="run-context-value">Production</dd>
        </div>
      </dl>

      <ol className="run-trace" aria-label="Illustrative run trace">
        {trace.map((item) => (
          <li className="run-trace-row" key={item.label}>
            <span className="run-trace-step">{item.step}</span>
            <strong className="run-trace-label">{item.label}</strong>
            <span className="run-trace-detail">{item.detail}</span>
            <span className="run-trace-check" aria-hidden="true">✓</span>
          </li>
        ))}
      </ol>

      <section className="run-result run-result-validated" aria-label="Illustrative validated outcome">
        <div className="run-result-heading">
          <span className="run-result-mark" aria-hidden="true">✓</span>
          <div className="run-result-copy">
            <span className="run-result-label">Illustrative outcome</span>
            <strong className="run-result-status">Validated</strong>
          </div>
        </div>
        <p className="run-result-description">
          Operator-controlled external evidence confirmed the requested outcome.
        </p>
        <ul className="run-result-list">
          <li className="run-result-item">Exact version retained</li>
          <li className="run-result-item">Authorization audited</li>
          <li className="run-result-item">Secret payloads excluded</li>
        </ul>
      </section>

      <figcaption className="run-caption">
        The agent writes and tests code. DokoSoko resolves inputs, authorizes bounded actions, and records the caller-supplied terminal result.
      </figcaption>
    </figure>
  );
}
