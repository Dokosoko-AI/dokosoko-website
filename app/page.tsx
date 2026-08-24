const docsUrl = "/dokosoko-docs/";
const quickstartUrl = `${docsUrl}getting-started/quickstart/`;
const securityUrl = `${docsUrl}concepts/security/`;
const githubUrl = "https://github.com/Dokosoko/dokosoko-service";

const integrationSteps = [
  ["Recipe selected", "Next.js App Router · revision 7"],
  ["Package resolved", "@vendor/nextjs-auth@4.2.1"],
  ["Application created", "Scoped setup tool"],
  ["Credential issued", "Development · short-lived"],
  ["Integration validated", "Callback and session checks passed"],
];

const standards = ["Reviewed docs", "Evidence-grounded recipes", "Exact package releases", "Scoped setup tools", "Validated runs"];

const boundaries = [
  ["Scoped setup", "Fixed destinations, closed schemas, live grants, and explicit confirmation bound every setup action."],
  ["Temporary credentials", "Provider-issued credentials are returned once; persistent vendor secrets remain server-side."],
  ["Version integrity", "Exact releases stay pinned, and changed evidence or schema drift forces review before reuse."],
  ["Operational evidence", "Preflight checks, integration runs, policy decisions, and outcomes remain distinct records."],
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

function AgentIntegrationPreview() {
  return (
    <figure className="agent-preview">
      <div className="agent-window" aria-hidden="true">
        <div className="agent-topbar">
          <span><Brand compact /> <i /> Identity Platform connector</span>
          <code>Stateless MCPv2 · connected</code>
        </div>
        <div className="agent-workspace">
          <div className="agent-thread">
            <span className="preview-label">CODING AGENT</span>
            <div className="prompt-bubble">
              <span>YOU</span>
              <p>Add enterprise login to this Next.js app.</p>
            </div>
            <div className="connector-message">
              <div className="connector-avatar">D</div>
              <div>
                <span>DokoSoko</span>
                <p>I found the compatible integration path for this project.</p>
              </div>
            </div>
            <div className="agent-steps">
              {integrationSteps.map(([label, detail]) => (
                <div className="agent-step" key={label}>
                  <i>✓</i>
                  <span><strong>{label}</strong><small>{detail}</small></span>
                </div>
              ))}
            </div>
          </div>

          <div className="integration-result">
            <div className="result-heading">
              <span><small>INTEGRATION PLAN</small><strong>Enterprise login · Next.js</strong></span>
              <b>Resolved</b>
            </div>
            <div className="result-context">
              <span><small>RECIPE</small><strong>Next.js App Router</strong><code>revision 7</code></span>
              <span><small>PRODUCT</small><strong>Identity Platform</strong><code>API v4 · Latest</code></span>
            </div>
            <div className="result-code">
              <div><span /><span /><span /><b>app/auth.ts</b></div>
              <pre><code><em>import</em> {`{ AuthClient }`} <em>from</em>{"\n"}  <span>&quot;@vendor/nextjs-auth&quot;</span>{"\n\n"}<em>export const</em> auth = <em>new</em> AuthClient({`{`}{"\n"}  domain: process.env.AUTH_DOMAIN,{"\n"}{`}`});</code></pre>
            </div>
            <div className="changed-files">
              <span><i>+</i> app/auth.ts</span><span><i>+</i> middleware.ts</span><span><i>+</i> .env.local</span>
            </div>
            <div className="result-ready"><span><i /> Integration ready</span><strong>3 files · setup validated</strong></div>
          </div>
        </div>
      </div>
      <figcaption>Illustration of a coding agent using one DokoSoko connection to resolve a recipe, exact package, scoped setup actions, credentials, code changes, and validation.</figcaption>
    </figure>
  );
}

function IntegrationKit() {
  return (
    <div className="product-proof kit-proof" aria-label="Versioned integration kit illustration">
      <div className="proof-toolbar">
        <span><i className="proof-dot blue" /> Identity Platform</span>
        <code>integration-kit:v4</code>
      </div>
      <div className="proof-summary">
        <span><small>DOCUMENTATION</small><strong>Snapshot 18</strong></span>
        <span><small>RECIPE</small><strong>Revision 7</strong></span>
        <span><small>API</small><strong>Version 4</strong></span>
      </div>
      <div className="kit-line"><span><small>PACKAGE</small><strong>@vendor/nextjs-auth</strong></span><code>4.2.1</code><b>exact release</b></div>
      <div className="kit-line"><span><small>SETUP TOOL</small><strong>applications.create</strong></span><code>revision 3</code><b>scoped</b></div>
      <div className="kit-line"><span><small>ACCESS</small><strong>Development credential</strong></span><code>provider-issued</code><b>short-lived</b></div>
    </div>
  );
}

function RecipePreview() {
  return (
    <div className="product-proof recipe-proof" aria-label="Evidence-grounded integration recipe illustration">
      <div className="tool-title"><span><small>REVIEWED RECIPE</small><strong>nextjs-app-router</strong></span><b>Published</b></div>
      <div className="recipe-steps">
        <div><i>01</i><span><strong>Install the exact package</strong><code>npm install @vendor/nextjs-auth@4.2.1</code></span></div>
        <div><i>02</i><span><strong>Create the application</strong><small>Call the scoped setup tool with the project origin.</small></span></div>
        <div><i>03</i><span><strong>Configure callbacks</strong><small>Register the development and production redirect URIs.</small></span></div>
        <div><i>04</i><span><strong>Add session middleware</strong><small>Apply the reviewed App Router implementation pattern.</small></span></div>
      </div>
      <div className="recipe-evidence"><span><i /> Evidence current</span><strong>3 reviewed sources</strong><code>fingerprint:9c71…</code></div>
    </div>
  );
}

function SetupRun() {
  return (
    <div className="product-proof setup-proof" aria-label="Scoped setup and validation run illustration">
      <div className="release-head">
        <span><small>INTEGRATION RUN</small><strong>Enterprise login setup</strong></span>
        <b>Complete</b>
      </div>
      <div className="setup-line"><i>✓</i><span><strong>Provider resource</strong><small>applications.create</small></span><code>created</code></div>
      <div className="setup-line"><i>✓</i><span><strong>Redirect URIs</strong><small>Development + production</small></span><code>registered</code></div>
      <div className="setup-line"><i>✓</i><span><strong>Credential</strong><small>Development scope · returned once</small></span><code>issued</code></div>
      <div className="setup-line"><i>✓</i><span><strong>Acceptance</strong><small>Callback and session behavior</small></span><code>passed</code></div>
      <div className="setup-footer"><span><i /> Outcome validated</span><strong>API v4 · recipe r7 · package 4.2.1</strong></div>
    </div>
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
            <a href="#product">Product</a>
            <a href="#workflow">Workflow</a>
            <a href="#trust">Guardrails</a>
          </nav>
          <a className="header-link" href={quickstartUrl}>Build your connector <span aria-hidden="true">→</span></a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="kicker"><span /> The integration layer for software products</p>
              <h1>Make your product <em>one prompt away.</em></h1>
              <div className="hero-bottom">
                <p>DokoSoko gives coding agents the exact docs, recipes, package releases, and scoped setup tools they need to take a developer from intent to a working integration through one versioned MCP connection.</p>
                <div className="hero-actions">
                  <a className="button button-primary" href={quickstartUrl}>Build your connector <span aria-hidden="true">→</span></a>
                  <a className="text-link" href="#product">See the integration flow <Arrow /></a>
                </div>
              </div>
            </div>
            <AgentIntegrationPreview />
          </div>
          <div className="standard-rail">
            <div className="shell">
              {standards.map((standard) => <span key={standard}><i aria-hidden="true">✓</i>{standard}</span>)}
            </div>
          </div>
        </section>

        <section className="fragmentation section" id="product">
          <div className="shell split-intro">
            <p className="section-label">THE OLD WAY</p>
            <div>
              <h2>Integration should start with intent—not a scavenger hunt.</h2>
              <p>Developers lose time finding the right guide, choosing a compatible package, clicking through account setup, creating credentials, and discovering the missing nuance at the end. DokoSoko assembles that path before the coding agent starts.</p>
            </div>
          </div>
          <div className="shell system-map" aria-label="Five integration chores assembled into one DokoSoko connector">
            <div className="system-inputs">
              <span>Find the right docs<small>Which guide?</small></span>
              <span>Choose the SDK<small>Which package?</small></span>
              <span>Match versions<small>Will these work?</small></span>
              <span>Configure the account<small>Where do I click?</small></span>
              <span>Prove it works<small>What did I miss?</small></span>
            </div>
            <div className="system-join"><span /><i>↓</i><span /></div>
            <div className="system-output"><Brand compact /><span>One integration manifest</span><span>One executable recipe</span><span>One validated path</span></div>
          </div>
        </section>

        <section className="capabilities" id="workflow" aria-label="DokoSoko integration workflow">
          <article className="capability-row">
            <div className="shell capability-grid">
              <div className="capability-copy">
                <span className="capability-index">01 / ASSEMBLE</span>
                <h2>Everything the agent needs, assembled upfront.</h2>
                <p>Bind reviewed documentation, API contracts, exact external package releases, recipes, and setup tools to the right API version. The agent receives one coherent integration kit—not a set of disconnected search results.</p>
                <a className="text-link" href={`${docsUrl}guides/product-definitions/`}>Explore integration manifests <Arrow /></a>
              </div>
              <IntegrationKit />
            </div>
          </article>

          <article className="capability-row capability-dark">
            <div className="shell capability-grid reverse">
              <RecipePreview />
              <div className="capability-copy">
                <span className="capability-index">02 / GUIDE</span>
                <h2>A recipe, not a pile of links.</h2>
                <p>Turn product knowledge into reviewed, evidence-grounded implementation steps. Recipes cite the exact sources they depend on and move back into review when that evidence changes.</p>
                <a className="text-link" href={docsUrl}>See the documentation <Arrow /></a>
              </div>
            </div>
          </article>

          <article className="capability-row">
            <div className="shell capability-grid">
              <div className="capability-copy">
                <span className="capability-index">03 / COMPLETE</span>
                <h2>Setup tools that finish the job.</h2>
                <p>Let the coding agent create provider resources, register callbacks, and request one-time credentials through fixed, scoped actions. Then validate the integration outcome instead of stopping at generated code.</p>
                <a className="text-link" href={`${docsUrl}guides/custom-tools/`}>Explore scoped setup tools <Arrow /></a>
              </div>
              <SetupRun />
            </div>
          </article>
        </section>

        <section className="delivery-section section" id="delivery">
          <div className="shell split-intro">
            <p className="section-label">KEEP IT WORKING</p>
            <div>
              <h2>The correct versions. A validated outcome.</h2>
              <p>DokoSoko keeps the integration kit coherent as your product changes. Every publication binds exact inputs, every rollout is deliberate, and acceptance checks show whether the requested path still works.</p>
            </div>
          </div>

          <div className="shell delivery-map">
            <div className="release-node">
              <span className="node-label">PUBLISHED INTEGRATION KIT</span>
              <strong>Identity Platform · API v4</strong>
              <code>manifest sha256:18b7…</code>
              <span className="node-status"><i /> exact + immutable</span>
            </div>
            <div className="delivery-connector" aria-hidden="true"><span /><i /><span /></div>
            <div className="channel-list">
              <div className="channel-row"><span>01</span><div><strong>Compatible inputs</strong><p>Documentation, recipe, package, tool, and authorization revisions resolve together.</p></div><b>Exact revisions</b></div>
              <div className="channel-row"><span>02</span><div><strong>Controlled rollout</strong><p>Latest, LTS, and Preview policies can be overridden per customer, environment, or installation.</p></div><b>No silent mix</b></div>
              <div className="channel-row"><span>03</span><div><strong>Acceptance evidence</strong><p>Preflight and live integration runs check the configured path—not merely the generated code.</p></div><b>Outcome checked</b></div>
            </div>
          </div>
        </section>

        <section className="trust-section" id="trust">
          <div className="shell trust-grid">
            <div className="trust-statement">
              <p className="section-label">BUILT-IN GUARDRAILS</p>
              <h2>Fast without weakening the boundary.</h2>
              <blockquote>“The agent is a caller—not a trusted administrator.”</blockquote>
              <a className="button button-light" href={securityUrl}>Read the full security model <span aria-hidden="true">→</span></a>
            </div>
            <div className="boundary-list">
              {boundaries.map(([label, copy], index) => (
                <div className="boundary-row" key={label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{label}</h3><p>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="shell closing-grid">
            <div>
              <p className="section-label">THE SHORTER PATH</p>
              <h2>Make your product one prompt away.</h2>
            </div>
            <div className="closing-action">
              <p>Give developers one connector that carries the right knowledge, recipe, package, setup actions, credentials, and validation for your product.</p>
              <div className="hero-actions">
                <a className="button button-light" href={quickstartUrl}>Build your connector <span aria-hidden="true">→</span></a>
                <a className="text-link light" href={githubUrl} target="_blank" rel="noreferrer">Browse the source <Arrow /></a>
              </div>
            </div>
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
