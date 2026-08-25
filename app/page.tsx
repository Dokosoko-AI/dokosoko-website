import FlowParticle from "./flow-particle";

const docsUrl = "/dokosoko-docs/";
const productSetupUrl = `${docsUrl}guides/product-setup/`;
const securityUrl = `${docsUrl}concepts/security/`;
const architectureUrl = `${docsUrl}concepts/architecture/`;
const githubUrl = "https://github.com/Dokosoko/dokosoko-service";

const integrationSurfaces = ["Docs", "APIs", "SDKs", "Packages", "Recipes"];

const codingAgents = [
  { name: "Claude", icon: "./agents/claude.svg" },
  { name: "Codex", icon: "./agents/codex.png" },
  { name: "Cursor", icon: "./agents/cursor.svg" },
  { name: "OpenCode", icon: "./agents/opencode.svg" },
];

const workflowStages = [
  {
    index: "01",
    verb: "Bind",
    title: "Publish one exact integration snapshot.",
    copy: "Bind reviewed product knowledge, API contracts, package metadata, tools, authorization, and delivery configuration to the Integration revision they actually support.",
    items: ["Reviewed inputs", "Exact revisions", "Immutable manifest"],
    output: "integration r18 · sha256:18b7…",
  },
  {
    index: "02",
    verb: "Resolve",
    title: "Give the agent one compatible path.",
    copy: "DokoSoko resolves the effective product version, then exposes its exact manifest, compatible package metadata, bound knowledge and tools, and current evidence-grounded recipes.",
    items: ["Installation-aware", "Evidence-grounded", "No floating latest"],
    output: "recipe r7 · package 4.2.1",
  },
  {
    index: "03",
    verb: "Act",
    title: "Connect code work to bounded setup.",
    copy: "The coding agent changes the repository while DokoSoko authorizes fixed provider operations with closed schemas, grants, and confirmation.",
    items: ["Agent writes code", "Fixed destinations", "One-time return if issued"],
    output: "code branch + provider branch",
  },
  {
    index: "04",
    verb: "Verify",
    title: "Finish at an observed outcome.",
    copy: "External checks verify the requested outcome, and DokoSoko records the run as validated or failed instead of treating generated files as success.",
    items: ["MCP checked", "External outcome checked", "Run closed"],
    output: "validated · or failed",
  },
];

const guardrails = [
  ["01", "Published revision?", "Drafts remain invisible"],
  ["02", "Grant valid?", "Customer state checked live"],
  ["03", "Destination fixed?", "No request-time host choice"],
  ["04", "Schema closed?", "Input and output validated"],
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
      <figcaption>DokoSoko turns product docs, APIs, SDKs, packages, and recipes into one governed MCP connection for Claude, Codex, Cursor, and OpenCode while API credentials remain encrypted on the server.</figcaption>
    </figure>
  );
}

function WorkflowBoard() {
  return (
    <div className="workflow-board">
      <div className="workflow-line" aria-hidden="true"><span /><span /><span /></div>
      <div className="workflow-stages">
        {workflowStages.map((stage) => (
          <article className="workflow-stage" key={stage.index}>
            <header><span>{stage.index}</span><code>{stage.verb}</code><i /></header>
            <h3>{stage.title}</h3>
            <p>{stage.copy}</p>
            <ul>
              {stage.items.map((item) => <li key={item}><i aria-hidden="true">✓</i>{item}</li>)}
            </ul>
            <footer><span>OUTPUT</span><code>{stage.output}</code></footer>
          </article>
        ))}
      </div>
      <div className="responsibility-rail">
        <span><small>CODING AGENT</small><strong>Writes and tests application code</strong></span>
        <i aria-hidden="true">+</i>
        <span><small>DOKOSOKO</small><strong>Resolves inputs and authorizes fixed actions</strong></span>
        <i aria-hidden="true">+</i>
        <span><small>PROVIDER</small><strong>Owns resources and issued credentials</strong></span>
      </div>
    </div>
  );
}

function Auth0Evaluation() {
  return (
    <div className="evaluation-board" aria-label="Production-shaped Auth0 Management API v2 evaluation evidence flow">
      <div className="evaluation-head">
        <span><i /> Auth0 Management API v2</span>
        <b>EVALUATION CASE</b>
      </div>
      <div className="evaluation-inputs">
        <div><small>REVIEWED KNOWLEDGE</small><strong>2 documentation publications</strong><code>revision 1 · exact fingerprints</code></div>
        <div><small>API CONTRACT</small><strong>Management API v2</strong><code>token · create user · get user</code></div>
        <div><small>PINNED PACKAGE SOURCE</small><strong>Auth0 Node.js SDK</strong><code>auth0@6.3.0 · 1,036 files</code></div>
      </div>
      <div className="evaluation-converge" aria-hidden="true"><span /><i /><span /></div>
      <div className="evaluation-connector">
        <div className="hub-mark">D</div>
        <span><small>CANDIDATE CONNECTOR RECIPE</small><strong>Auth0 Management API v2 integration path</strong></span>
        <code>evaluation · evidence bounded</code>
      </div>
      <div className="evaluation-runtime">
        <div><span>01</span><strong>Resolve the DokoSoko endpoint</strong><code>operator origin · POST /mcp</code></div>
        <i aria-hidden="true">→</i>
        <div><span>02</span><strong>Require DokoSoko identity</strong><code>oauth2 · fail closed</code></div>
        <i aria-hidden="true">→</i>
        <div><span>03</span><strong>Discover only configured access</strong><code>no invented Auth0 tool</code></div>
      </div>
      <div className="evaluation-note">
        <span><i>!</i><strong>Honest boundary</strong></span>
        <p>The evaluation fails if a recipe invents a configured tool, tenant, credential, completed setup, or direct client-facing Auth0 endpoint.</p>
      </div>
    </div>
  );
}

function ContinuityPath() {
  return (
    <div className="continuity-board" aria-label="Published connector version resolution and drift workflow">
      <div className="continuity-track" aria-hidden="true"><span /><span /><span /></div>
      <div className="continuity-nodes">
        <div className="continuity-node active"><span>01</span><small>PUBLISH</small><strong>Integration r18</strong><code>sha256:18b7…</code><b>immutable</b></div>
        <div className="continuity-node"><span>02</span><small>SELECT</small><strong>Effective version</strong><code>installation → environment → customer → channel</code><b>deterministic</b></div>
        <div className="continuity-node"><span>03</span><small>DISCOVER</small><strong>One exact snapshot</strong><code>knowledge · recipe · tools</code><b>coherent</b></div>
        <div className="continuity-node warning"><span>04</span><small>RECHECK</small><strong>Evidence changed</strong><code>evidence or schema drift</code><b>review required</b></div>
      </div>
      <div className="continuity-return"><span>Changed evidence never silently rewrites a published Integration or recipe.</span><i aria-hidden="true">↺</i><strong>Review → publish a new revision</strong></div>
    </div>
  );
}

function GuardrailPath() {
  return (
    <div className="gate-board" aria-label="Policy gates applied to a scoped provider action">
      <div className="gate-start"><small>INBOUND</small><strong>MCP tool call</strong><code>structured arguments</code></div>
      <div className="gate-line" aria-hidden="true" />
      <div className="gate-list">
        {guardrails.map(([index, label, detail]) => (
          <div className="gate" key={index}>
            <span>{index}</span><i aria-hidden="true">✓</i><strong>{label}</strong><small>{detail}</small>
          </div>
        ))}
      </div>
      <div className="gate-line" aria-hidden="true" />
      <div className="gate-end"><small>OUTBOUND</small><strong>Fixed provider action</strong><code>validated JSON response</code></div>
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
            <a href="#workflow">Workflow</a>
            <a href="#evaluation">Evaluation</a>
            <a href="#trust">Guardrails</a>
          </nav>
          <a className="header-link" href={productSetupUrl}>Build a connector <span aria-hidden="true">→</span></a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="shell hero-inner">
            <div className="hero-layout">
              <div className="hero-message">
                <div className="hero-heading">
                  <h1>Make your product <em>one prompt away.</em></h1>
                </div>
                <div className="hero-copy">
                  <div className="hero-bottom">
                    <p>Turn your docs, APIs, SDKs, packages, recipes, and authenticated setup into one MCP endpoint—so coding agents can take developers from prompt to a working integration.</p>
                  </div>
                </div>
              </div>
              <ConnectorSpinePreview />
            </div>
          </div>
        </section>

        <section className="workflow-section section" id="workflow">
          <div className="shell split-intro workflow-intro">
            <p className="section-label">ONE CONNECTED WORKFLOW</p>
            <div>
              <h2>Build the connector once. Let it carry the integration.</h2>
              <p>Developers should not have to reconstruct your product from documentation tabs, package registries, admin screens, and credential forms. DokoSoko turns those separate surfaces into one published path the agent can discover, follow, and verify.</p>
            </div>
          </div>
          <div className="shell"><WorkflowBoard /></div>
        </section>

        <section className="evaluation-section section" id="evaluation">
          <div className="shell evaluation-layout">
            <div className="evaluation-copy">
              <p className="section-label">GROUNDED EVALUATION</p>
              <h2>Real evidence. Honest boundaries.</h2>
              <p>The evaluation suite includes a frozen, production-shaped Auth0 Management API v2 benchmark. It combines two reviewed documentation publications, a bounded API contract, and an exact 1,036-file source export of <code>auth0@6.3.0</code> to test whether DokoSoko can produce an evidence-grounded implementation recipe without inventing a configured capability.</p>
              <p className="evaluation-disclaimer">The benchmark is offline and includes no live tenant, credentials, customer data, or executable network calls. It is not a shipped Auth0 connector or partnership claim.</p>
              <a className="text-link" href={architectureUrl}>See how Integrations work <Arrow /></a>
            </div>
            <Auth0Evaluation />
          </div>
        </section>

        <section className="continuity-section section" id="delivery">
          <div className="shell split-intro">
            <p className="section-label">KEEP IT COHERENT</p>
            <div>
              <h2>Exact when published. Deliberate when changed.</h2>
              <p>A published connector never floats with whatever documentation page or package version happens to be latest. DokoSoko binds exact compatible revisions, moves evidence-dependent recipes to review when evidence changes, and fails closed on managed schema drift.</p>
            </div>
          </div>
          <div className="shell"><ContinuityPath /></div>
        </section>

        <section className="trust-section section" id="trust">
          <div className="shell trust-layout">
            <div className="trust-copy">
              <p className="section-label">GUARDRAILS ON THE PATH</p>
              <h2>Fast because the boundaries are already defined.</h2>
              <p>The agent supplies structured arguments. DokoSoko enforces publication state, identity, grants, confirmation, fixed destinations, and closed schemas before execution, then records the result in audit.</p>
              <a className="button button-light" href={securityUrl}>Read the security model <span aria-hidden="true">→</span></a>
            </div>
            <GuardrailPath />
          </div>
        </section>

        <section className="closing-section">
          <div className="shell closing-grid">
            <div>
              <p className="section-label">THE SHORTER PATH</p>
              <h2>One connector from developer intent to a working integration.</h2>
            </div>
            <div className="closing-action">
              <p>Connect your product knowledge, API contract, setup actions, and access policy once. Give every supported coding agent the same exact integration path.</p>
              <div className="hero-actions">
                <a className="button button-light" href={productSetupUrl}>Build a connector <span aria-hidden="true">→</span></a>
                <a className="text-link light" href={architectureUrl}>See the architecture <Arrow /></a>
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
