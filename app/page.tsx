"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  problems,
  referenceCount,
  topReward,
  topRewardUsd,
  type PrizeProblem,
  type Verification,
} from "./data/problems";

type SortMode = "prize" | "oldest" | "newest" | "references" | "title";
type FamilyFilter = "All" | PrizeProblem["family"];
type VerificationFilter = "all" | Verification;

const familyFilters: FamilyFilter[] = ["All", "Institutional", "Erdős", "Independent"];

const verificationLabel: Record<Verification, string> = {
  verified: "Verified open",
  "source-stated": "Source-stated",
  "renewal-pending": "Renewal check",
  "reconfirmation-needed": "Reconfirm sponsor",
};

const certaintyLabel = {
  institutional: "Institutional",
  documented: "Documented",
  conditional: "Conditional",
  personal: "Personal offer",
};

function ageLabel(problem: PrizeProblem) {
  if (!problem.openSince) return "Age unknown";
  const age = 2026 - problem.openSince;
  return `${age} ${age === 1 ? "year" : "years"} open`;
}

function humanizeMath(value: string) {
  return value
    .replace(/\\\[/g, " ")
    .replace(/\\\]/g, " ")
    .replace(/\$/g, "")
    .replace(/\\mathbb\{N\}/g, "ℕ")
    .replace(/\\mathbb\{R\}/g, "ℝ")
    .replace(/\\mathbb\{C\}/g, "ℂ")
    .replace(/\\mathbb\{Q\}/g, "ℚ")
    .replace(/\\mathbb\{Z\}/g, "ℤ")
    .replace(/\\mathcal\{([^}]+)\}/g, "$1")
    .replace(/\\(?:mathrm|mathbf|text)\{([^}]+)\}/g, "$1")
    .replace(/\\operatorname\{([^}]+)\}/g, "$1")
    .replace(/\\binom\{([^{}]+)\}\{([^{}]+)\}/g, "C($1, $2)")
    .replace(/\\sqrt\{([^{}]+)\}/g, "√($1)")
    .replace(/\\(?:left|right)\b/g, "")
    .replace(/\\(?:limsup|liminf|max|min|sup|inf|log|exp|gcd|det|deg)\b/g, (name) =>
      name.slice(1),
    )
    .replace(/\\ldots|\\cdots/g, "…")
    .replace(/\\lvert/g, "|")
    .replace(/\\rvert/g, "|")
    .replace(/\\vert/g, "|")
    .replace(/\\subseteq/g, "⊆")
    .replace(/\\subset/g, "⊂")
    .replace(/\\notin/g, "∉")
    .replace(/\\in/g, "∈")
    .replace(/\\neq/g, "≠")
    .replace(/\\mid/g, "∣")
    .replace(/\\infty/g, "∞")
    .replace(/\\geq/g, "≥")
    .replace(/\\leq/g, "≤")
    .replace(/\\gg/g, "≫")
    .replace(/\\ll/g, "≪")
    .replace(/\\to/g, "→")
    .replace(/\\sum/g, "∑")
    .replace(/\\prod/g, "∏")
    .replace(/\\cup/g, "∪")
    .replace(/\\cap/g, "∩")
    .replace(/\\ast/g, "∗")
    .replace(/\\epsilon/g, "ε")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\delta/g, "δ")
    .replace(/\\phi/g, "φ")
    .replace(/\\chi/g, "χ")
    .replace(/\\zeta/g, "ζ")
    .replace(/\\lambda/g, "λ")
    .replace(/\\omega/g, "ω")
    .replace(/\\theta/g, "θ")
    .replace(/\\tau/g, "τ")
    .replace(/\\Omega/g, "Ω")
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1/$2)")
    .replace(/\\\{/g, "{")
    .replace(/\\\}/g, "}")
    .replace(/\\[,;!]/g, " ")
    .replace(/\^\{([^{}]+)\}/g, "^($1)")
    .replace(/_\{([^{}]+)\}/g, "_($1)")
    .replace(/\s+/g, " ")
    .trim();
}

function ProblemCard({
  problem,
  rank,
  onOpen,
}: {
  problem: PrizeProblem;
  rank: number;
  onOpen: (problem: PrizeProblem) => void;
}) {
  const reward = topReward(problem);

  return (
    <article className={`problem-card family-${problem.family.toLowerCase()}`}>
      <div className="card-rail" aria-hidden="true" />
      <div className="card-topline">
        <span className="index-number">{String(rank + 1).padStart(2, "0")}</span>
        <span className="family-label">
          {problem.collection ? `${problem.family} · ${problem.collection}` : problem.family}
        </span>
        <span className={`verification verification-${problem.verification}`}>
          <span className="status-dot" />
          {verificationLabel[problem.verification]}
        </span>
      </div>

      <div className="card-body">
        <div className="card-copy">
          <p className="field-kicker">{problem.field}</p>
          <h3>{problem.title}</h3>
          <p className="statement">{humanizeMath(problem.statement)}</p>
          <div className="tag-row" aria-label="Topics">
            {problem.tags.slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="card-metrics">
          <div>
            <span className="metric-label">Reward</span>
            <strong>{reward?.label || "Terms pending"}</strong>
            {problem.rewards.length > 1 && (
              <small>+ {problem.rewards.length - 1} linked offer</small>
            )}
          </div>
          <div>
            <span className="metric-label">Open since</span>
            <strong>{problem.openSince || "Unknown"}</strong>
            <small>{ageLabel(problem)}</small>
          </div>
        </div>
      </div>

      <button className="open-dossier" onClick={() => onOpen(problem)}>
        Open dossier <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}

function Dossier({
  problem,
  onClose,
}: {
  problem: PrizeProblem | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!problem) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const dossier = closeRef.current?.closest(".dossier");
      const focusable = dossier
        ? Array.from(
            dossier.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [problem, onClose]);

  if (!problem) return null;

  return (
    <div className="dossier-layer" role="presentation" onMouseDown={onClose}>
      <aside
        className="dossier"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dossier-header">
          <div>
            <p className="dossier-eyebrow">
              {problem.collection || problem.family} · {problem.field}
            </p>
            <h2 id="dossier-title">{problem.title}</h2>
          </div>
          <button
            ref={closeRef}
            className="close-button"
            onClick={onClose}
            aria-label="Close dossier"
          >
            ×
          </button>
        </div>

        <div className="dossier-content">
          <section className="dossier-lead">
            <span className={`verification verification-${problem.verification}`}>
              <span className="status-dot" />
              {verificationLabel[problem.verification]}
            </span>
            <p>{humanizeMath(problem.statement)}</p>
            {problem.context && <p className="context">{humanizeMath(problem.context)}</p>}
          </section>

          <section className="facts-grid">
            <div>
              <span>Open since</span>
              <strong>{problem.openSince || "Unknown"}</strong>
              <small>{problem.openSincePrecision}</small>
            </div>
            <div>
              <span>Last checked</span>
              <strong>{problem.lastVerified.replaceAll("-", ".")}</strong>
              <small>Catalog verification</small>
            </div>
          </section>

          {problem.openSinceNote && (
            <p className="note-box">
              <strong>Date note</strong>
              {problem.openSinceNote}
            </p>
          )}

          <section className="dossier-section">
            <div className="section-heading">
              <span>01</span>
              <h3>Reward offers</h3>
            </div>
            {problem.rewards.length ? (
              <div className="reward-list">
                {problem.rewards.map((reward, index) => (
                  <article className="reward-offer" key={`${reward.sponsor}-${index}`}>
                    <div className="reward-heading">
                      <div>
                        <strong>{reward.label}</strong>
                        <span>{reward.sponsor}</span>
                      </div>
                      <span className={`certainty certainty-${reward.certainty}`}>
                        {certaintyLabel[reward.certainty]}
                      </span>
                    </div>
                    <p>{reward.terms}</p>
                    {reward.expires && <p className="reward-meta">Terms expire {reward.expires}</p>}
                    {reward.note && <p className="reward-note">{reward.note}</p>}
                    <div className="reference-links">
                      <a href={reward.sourceUrl} target="_blank" rel="noreferrer">
                        Award source ↗
                      </a>
                      {reward.rulesUrl && (
                        <a href={reward.rulesUrl} target="_blank" rel="noreferrer">
                          Rules ↗
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="pending-offer">
                <strong>No current amount indexed</strong>
                <p>
                  The problem remains in the source catalog, but no sortable cash amount is
                  currently documented. Follow the award source for the latest terms.
                </p>
              </div>
            )}
          </section>

          <section className="dossier-section">
            <div className="section-heading">
              <span>02</span>
              <h3>References</h3>
            </div>
            <div className="source-card">
              <span>Primary source</span>
              <a href={problem.sourceUrl} target="_blank" rel="noreferrer">
                {problem.sourceLabel} <b aria-hidden="true">↗</b>
              </a>
              {problem.rulesUrl && (
                <a href={problem.rulesUrl} target="_blank" rel="noreferrer">
                  Claim or award rules <b aria-hidden="true">↗</b>
                </a>
              )}
              {problem.references?.map((reference) => (
                <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer">
                  {reference.label} <b aria-hidden="true">↗</b>
                </a>
              ))}
              {problem.oeis?.map((sequence) => (
                <a
                  key={sequence}
                  href={`https://oeis.org/${sequence}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  OEIS {sequence} <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </section>

          <p className="dossier-disclaimer">
            Always read the sponsor’s current terms before beginning a claim. “Open” records the
            best available public status, not a legal guarantee of payment or an assessment of
            solvability.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<FamilyFilter>("All");
  const [field, setField] = useState("All fields");
  const [currency, setCurrency] = useState("All currencies");
  const [verification, setVerification] = useState<VerificationFilter>("all");
  const [sort, setSort] = useState<SortMode>("prize");
  const [selected, setSelected] = useState<PrizeProblem | null>(null);

  const fields = useMemo(
    () => ["All fields", ...Array.from(new Set(problems.map((item) => item.field))).sort()],
    [],
  );
  const currencies = useMemo(
    () => [
      "All currencies",
      ...Array.from(
        new Set(problems.flatMap((item) => item.rewards.map((reward) => reward.currency))),
      ).sort(),
    ],
    [],
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    const filtered = problems.filter((problem) => {
      const haystack = [
        problem.title,
        problem.statement,
        problem.field,
        problem.family,
        problem.collection || "",
        ...problem.tags,
        ...(problem.references?.map((reference) => reference.label) || []),
        ...problem.rewards.map((reward) => reward.sponsor),
      ]
        .join(" ")
        .toLocaleLowerCase();

      return (
        (!needle || haystack.includes(needle)) &&
        (family === "All" || problem.family === family) &&
        (field === "All fields" || problem.field === field) &&
        (currency === "All currencies" ||
          problem.rewards.some((reward) => reward.currency === currency)) &&
        (verification === "all" || problem.verification === verification)
      );
    });

    return filtered.sort((a, b) => {
      if (sort === "prize") return topRewardUsd(b) - topRewardUsd(a);
      if (sort === "oldest") return (a.openSince || 9999) - (b.openSince || 9999);
      if (sort === "newest") return (b.openSince || 0) - (a.openSince || 0);
      if (sort === "references") {
        return referenceCount(b) - referenceCount(a) || a.title.localeCompare(b.title);
      }
      return a.title.localeCompare(b.title);
    });
  }, [query, family, field, currency, verification, sort]);

  const verifiedCount = problems.filter((item) => item.verification === "verified").length;
  const oldestYear = Math.min(
    ...problems.map((item) => item.openSince || 9999).filter((year) => year < 9999),
  );
  const listedCurrencies = new Set(
    problems.flatMap((item) => item.rewards.map((reward) => reward.currency)),
  ).size;

  const resetFilters = () => {
    setQuery("");
    setFamily("All");
    setField("All fields");
    setCurrency("All currencies");
    setVerification("all");
    setSort("prize");
  };

  return (
    <div className="site-shell">
      <div className="edition-bar">
        <span>Edition 2026.2</span>
        <span className="edition-center">A living index of rewarded mathematics</span>
        <span>Checked 27.07.2026</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Prize Problems home">
          <span className="brand-mark" aria-hidden="true">
            ∴
          </span>
          <span>
            <b>Prize Problems</b>
            <small>The open ledger</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#catalog">Catalog</a>
          <a href="#method">Method</a>
          <a href="#sources">Sources</a>
        </nav>
        <a className="header-cta" href="#catalog">
          Explore {problems.length}
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              Open conjectures <span>×</span> real rewards
            </p>
            <h1>
              The problems are open.
              <em>The rewards are real.</em>
            </h1>
            <p className="hero-intro">
              An auditable catalog of mathematical conjectures, existence questions,
              computational targets and proof challenges with active cash awards,
              plus clearly separated renewal-pending and sponsor-reconfirmation records.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#catalog">
                Browse the ledger <span aria-hidden="true">↓</span>
              </a>
              <a className="text-action" href="#method">
                How entries qualify <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="hero-ledger" aria-label="Catalog highlights">
            <div className="ledger-grid" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="ledger-orbit orbit-one" aria-hidden="true">
              ζ
            </div>
            <div className="ledger-orbit orbit-two" aria-hidden="true">
              ∑
            </div>
            <div className="ledger-feature">
              <span>Largest listed offer</span>
              <strong>$1,000,000</strong>
              <p>Millennium, Beal & IUT challenges</p>
            </div>
            <div className="ledger-stamp">
              <b>{verifiedCount}</b>
              <span>verified open</span>
            </div>
          </div>
        </section>

        <section className="stat-band" aria-label="Catalog statistics">
          <div>
            <strong>{problems.length}</strong>
            <span>rewarded targets indexed</span>
          </div>
          <div>
            <strong>{verifiedCount}</strong>
            <span>status-verified entries</span>
          </div>
          <div>
            <strong>{listedCurrencies}</strong>
            <span>reward currencies</span>
          </div>
          <div>
            <strong>{oldestYear}</strong>
            <span>oldest problem date</span>
          </div>
        </section>

        <section className="catalog-section" id="catalog">
          <div className="section-intro">
            <div>
              <p className="eyebrow">The open ledger</p>
              <h2>Find a problem worth your time.</h2>
            </div>
            <p>
              Search exact statements, compare reward terms, sort by age, estimated prize
              value or reference depth, and follow every entry back to its sources.
            </p>
          </div>

          <div className="catalog-controls">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search conjectures, fields, sponsors…"
                aria-label="Search prize problems"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search">
                  ×
                </button>
              )}
            </label>

            <div className="family-tabs" aria-label="Problem family">
              {familyFilters.map((item) => (
                <button
                  key={item}
                  className={family === item ? "active" : ""}
                  onClick={() => setFamily(item)}
                >
                  {item}
                  <span>
                    {item === "All"
                      ? problems.length
                      : problems.filter((problem) => problem.family === item).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="select-row">
              <label>
                <span>Field</span>
                <select value={field} onChange={(event) => setField(event.target.value)}>
                  {fields.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Currency</span>
                <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
                  {currencies.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Verification</span>
                <select
                  value={verification}
                  onChange={(event) =>
                    setVerification(event.target.value as VerificationFilter)
                  }
                >
                  <option value="all">All verification labels</option>
                  <option value="verified">Verified open</option>
                  <option value="source-stated">Source-stated</option>
                  <option value="renewal-pending">Renewal check</option>
                  <option value="reconfirmation-needed">Reconfirm sponsor</option>
                </select>
              </label>
              <label>
                <span>Sort by</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortMode)}
                >
                  <option value="prize">Prize value · high first</option>
                  <option value="oldest">Time open · longest first</option>
                  <option value="newest">Time open · newest first</option>
                  <option value="references">Reference depth · most first</option>
                  <option value="title">Title · A to Z</option>
                </select>
              </label>
            </div>

            <div className="results-row">
              <p>
                Showing <strong>{visible.length}</strong> of {problems.length}
              </p>
              <p className="fx-note">
                Cross-currency sorting uses approximate July 2026 reference rates;
                renewal-pending amounts remain estimates.
              </p>
              <button onClick={resetFilters}>Reset filters</button>
            </div>
          </div>

          <div className="catalog-list" aria-live="polite">
            {visible.map((problem, index) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                rank={index}
                onOpen={setSelected}
              />
            ))}
          </div>

          {!visible.length && (
            <div className="empty-state">
              <span aria-hidden="true">∅</span>
              <h3>No problems match those filters.</h3>
              <p>Try a broader field, status or search phrase.</p>
              <button onClick={resetFilters}>Clear all filters</button>
            </div>
          )}
        </section>

        <section className="method-section" id="method">
          <div className="method-title">
            <p className="eyebrow">Method, not mythology</p>
            <h2>What earns a place in the ledger?</h2>
          </div>
          <div className="method-grid">
            <article>
              <span>01</span>
              <h3>A specific open target</h3>
              <p>
                The problem must have an objective mathematical resolution: proof, disproof,
                construction, certified computation or a defined verification result.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>A monetary reward</h3>
              <p>
                The amount, sponsor and claim conditions must be traceable. General research
                grants, medals and expired competitions are excluded.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>An honest status label</h3>
              <p>
                “Verified open,” “source-stated,” “renewal check” and “reconfirm sponsor” are
                deliberately different. Personal and discretionary awards are never presented
                as escrowed guarantees.
              </p>
            </article>
          </div>
          <div className="method-footnote">
            <strong>Why this cannot literally be “all.”</strong>
            <p>
              Private bounties appear, change and disappear without a central registry. This
              edition favors completeness where authoritative data exists—especially the
              Millennium and Erdős collections—and transparent uncertainty everywhere else.
            </p>
          </div>
        </section>

        <section className="sources-section" id="sources">
          <p className="eyebrow">Source hierarchy</p>
          <h2>Every number should lead somewhere.</h2>
          <div className="source-hierarchy">
            <div>
              <span>Primary</span>
              <strong>Award-giver rules</strong>
              <p>Official problem pages, legal terms and sponsor-maintained records.</p>
            </div>
            <div>
              <span>Canonical</span>
              <strong>Community databases</strong>
              <p>Erdős Problems and its machine-readable status file, with direct dossiers.</p>
            </div>
            <div>
              <span>Supporting</span>
              <strong>Scholarly references</strong>
              <p>Original papers and bibliographies used to qualify dates and formulations.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            ∴
          </span>
          <span>
            <b>Prize Problems</b>
            <small>The open ledger</small>
          </span>
        </a>
        <p>
          A source-first field guide to open mathematics.
          <br />
          Edition 2026.2 · Last catalog check 27 July 2026.
        </p>
        <a href="#catalog">
          Back to catalog <span aria-hidden="true">↑</span>
        </a>
      </footer>

      <Dossier problem={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
