import FlowParticle from "./flow-particle";
import IntegrationRunDemo from "./integration-run-demo";

const docsUrl = "/dokosoko-docs/";
const productSetupUrl = `${docsUrl}guides/product-setup/`;
const securityUrl = `${docsUrl}concepts/security/`;
const githubUrl = "https://github.com/Dokosoko/dokosoko-service";

const integrationSurfaces = ["Docs", "APIs", "SDKs", "Packages", "Recipes"];

const codingAgents = [
  { name: "Claude", icon: "./agents/claude.svg" },
  { name: "Codex", icon: "./agents/codex.png" },
  { name: "Cursor", icon: "./agents/cursor.svg" },
  { name: "OpenCode", icon: "./agents/opencode.svg" },
];

const workflowSteps = [
  {
    index: "01",
    verb: "Publish",
    title: "Define the exact path.",
    copy: "Bind reviewed knowledge, API contracts, compatible packages, tools, and access policy to one immutable product revision.",
    output: "Versioned connector",
  },
  {
    index: "02",
    verb: "Integrate",
    title: "Let the agent do the work.",
    copy: "The coding agent writes and tests application code while DokoSoko resolves the right inputs and authorizes fixed setup actions.",
    output: "Code + bounded setup",
  },
  {
    index: "03",
    verb: "Verify",
    title: "Close on an outcome.",
    copy: "Once external evidence is available, DokoSoko records the owner-scoped run as succeeded or failed—with an auditable terminal state.",
    output: "Succeeded or failed",
  },
];

const trustPillars = [
  {
    label: "Exact",
    title: "Every answer has a version.",
    copy: "Published revisions are immutable. Packages stay pinned. Evidence or schema drift requires review instead of silently changing the integration path.",
    detail: "revisions · packages · recipes",
  },
  {
    label: "Bounded",
    title: "Access is part of the connector.",
    copy: "Identity, grants, confirmation, closed schemas, and fixed destinations are checked before execution. Persistent provider credentials remain encrypted server-side.",
    detail: "identity · policy · authorization",
  },
  {
    label: "Auditable",
    title: "The run ends in a real state.",
    copy: "Owner-scoped runs close as succeeded or failed. Audit and analytics retain useful state while excluding prompts, tokens, argument values, and secret plaintext.",
    detail: "runs · evidence · audit",
  },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand${compact ? " brand-compact" : ""}`}>
      {/* The static-exported SVG is already tiny; image optimization would add no value here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="./favicon.svg" width={compact ? 22 : 26} height={compact ? 22 : 26} alt="" />
      <span>DokoSoko</span>
    </span>
  );
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function ConnectorSpinePreview() {
  return (
    <figure className="connector-hero">
      <div className="connector-diagram" aria-hidden="true">
        <div className="source-network">
          <div className="stack-sources">
            {integrationSurfaces.map((surface) => (
              <div className="source-pill" key={surface}>
                <strong>{surface}</strong>
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
              <img src="./lock-keyhole.svg" alt="" width="18" height="18" />
            </span>
            <strong>Authorization</strong>
          </div>

          <div className="mcp-node">
            {/* The official MCP mark is a tiny local static asset. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="./mcp.svg" alt="" width="32" height="32" />
            <strong>DokoSoko MCP</strong>
          </div>
        </div>

        <div className="flow-link" />

        <div className="agent-outcome">
          <div className="agent-logos">
            {codingAgents.map((agent) => (
              <div className="agent-logo" key={agent.name}>
                {/* The local marks are tiny static assets; image optimization adds no value. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={agent.icon} alt="" width="26" height="26" />
                <strong>{agent.name}</strong>
              </div>
            ))}
          </div>
        </div>

        <FlowParticle />
      </div>
      <figcaption>
        Product docs, APIs, SDKs, packages, and recipes flow through one authorized DokoSoko MCP connection to the coding agent a developer already uses.
      </figcaption>
    </figure>
  );
}

function Workflow() {
  return (
    <ol className="workflow-grid">
      {workflowSteps.map((step) => (
        <li key={step.index}>
          <div className="workflow-index"><span>{step.index}</span><i aria-hidden="true" /></div>
          <p className="workflow-verb">{step.verb}</p>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
          <footer><span>OUTPUT</span><strong>{step.output}</strong></footer>
        </li>
      ))}
    </ol>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand-link" href="#top" aria-label="DokoSoko home"><Brand /></a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#workflow">How it works</a>
            <a href="#run">Integration run</a>
            <a href="#security">Security</a>
          </nav>
          <a className="header-link" href={productSetupUrl}>Build a connector <span aria-hidden="true">→</span></a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="shell hero-inner">
            <div className="hero-layout">
              <div className="hero-message">
                <h1>Make your product <em>one prompt away.</em></h1>
                <p>DokoSoko gives coding agents one authenticated path through the exact docs, APIs, SDKs, packages, and recipes you publish—so developers can move from prompt to a working integration without reconstructing your product.</p>
                <a className="text-link" href="#run">See an integration run <Arrow /></a>
              </div>
              <ConnectorSpinePreview />
            </div>
          </div>
        </section>

        <section className="run-section section" id="run">
          <div className="shell section-intro run-intro">
            <p className="section-label">ONE CONCRETE RUN</p>
            <div>
              <h2>Same product truth. Whichever coding agent they use.</h2>
              <p>The agent can change; the contract should not. Every supported client gets the same versioned inputs, bounded setup path, and explicit terminal result.</p>
            </div>
          </div>
          <div className="shell"><IntegrationRunDemo /></div>
        </section>

        <section className="workflow-section section" id="workflow">
          <div className="shell section-intro">
            <p className="section-label">HOW IT WORKS</p>
            <div>
              <h2>Publish once. Integrate without the scavenger hunt.</h2>
              <p>DokoSoko turns scattered product surfaces into one route the coding agent can resolve, act through, and finish with a recorded outcome.</p>
            </div>
          </div>
          <div className="shell"><Workflow /></div>
        </section>

        <section className="trust-section section" id="security">
          <div className="shell trust-head">
            <p className="section-label">CORRECT BY CONSTRUCTION</p>
            <div>
              <h2>Speed comes from removing ambiguity.</h2>
              <p>The connector defines what is true, what is allowed, and how the run ends before the coding agent starts.</p>
            </div>
          </div>
          <div className="shell trust-grid">
            {trustPillars.map((pillar, index) => (
              <article key={pillar.label}>
                <header><span>0{index + 1}</span><strong>{pillar.label}</strong></header>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
                <code>{pillar.detail}</code>
              </article>
            ))}
          </div>
          <div className="shell trust-action">
            <a className="text-link light" href={securityUrl}>Read the security model <Arrow /></a>
          </div>
        </section>

        <section className="closing-section">
          <div className="shell closing-content">
            <p className="section-label">ONE CONNECTOR. EVERY SUPPORTED AGENT.</p>
            <h2>Make your product <em>one prompt away.</em></h2>
            <p>Publish the integration path once. Let developers use it from the coding agent they already trust.</p>
            <a className="button button-light" href={productSetupUrl}>Build a connector <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <a className="brand-link" href="#top"><Brand compact /></a>
          <p>Integration infrastructure for software products and coding agents.</p>
          <nav aria-label="Footer navigation">
            <a href={docsUrl}>Documentation</a>
            <a href={securityUrl}>Security</a>
            <a href={githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </footer>
    </>
  );
}
