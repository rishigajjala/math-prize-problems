"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  problems,
  referenceCount,
  topReward,
  topRewardUsd,
  type PrizeProblem,
  type Verification,
} from "./data/problems";
import {
  REPOSITORY_URL,
  ageLabel,
  humanizeMath,
  problemPath,
  verificationLabel,
} from "./lib/problem-format";

type SortMode = "prize" | "prize-low" | "oldest" | "newest" | "references" | "title";
type FamilyFilter = "All" | PrizeProblem["family"];
type VerificationFilter = "all" | Verification;

const familyFilters: FamilyFilter[] = ["All", "Institutional", "Erdős", "Independent"];

function ProblemCard({
  problem,
  rank,
}: {
  problem: PrizeProblem;
  rank: number;
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
          <h3>
            <Link href={problemPath(problem)} prefetch={false}>
              {problem.title}
            </Link>
          </h3>
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

      <Link
        className="open-dossier"
        href={problemPath(problem)}
        prefetch={false}
        aria-label={`Open the permanent page for ${problem.title}`}
      >
        Problem page <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<FamilyFilter>("All");
  const [field, setField] = useState("All fields");
  const [verification, setVerification] = useState<VerificationFilter>("all");
  const [sort, setSort] = useState<SortMode>("prize");

  const fields = useMemo(
    () => ["All fields", ...Array.from(new Set(problems.map((item) => item.field))).sort()],
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
        (verification === "all" || problem.verification === verification)
      );
    });

    return filtered.sort((a, b) => {
      if (sort === "prize") return topRewardUsd(b) - topRewardUsd(a);
      if (sort === "prize-low") return topRewardUsd(a) - topRewardUsd(b);
      if (sort === "oldest") return (a.openSince || 9999) - (b.openSince || 9999);
      if (sort === "newest") return (b.openSince || 0) - (a.openSince || 0);
      if (sort === "references") {
        return referenceCount(b) - referenceCount(a) || a.title.localeCompare(b.title);
      }
      return a.title.localeCompare(b.title);
    });
  }, [query, family, field, verification, sort]);

  const verifiedCount = problems.filter((item) => item.verification === "verified").length;
  const oldestYear = Math.min(
    ...problems.map((item) => item.openSince || 9999).filter((year) => year < 9999),
  );
  const indexedReferences = problems.reduce(
    (total, problem) => total + referenceCount(problem),
    0,
  );

  const resetFilters = () => {
    setQuery("");
    setFamily("All");
    setField("All fields");
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
          <a href={`${REPOSITORY_URL}/issues`} target="_blank" rel="noreferrer">
            Contribute
          </a>
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
              each with a permanent page, primary sources and clearly separated status labels.
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
            <strong>{indexedReferences}</strong>
            <span>reference links indexed</span>
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
              value or reference depth, then share a permanent page for any problem.
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
                  <option value="prize-low">Prize value · low first</option>
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
              <ProblemCard key={problem.id} problem={problem} rank={index} />
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
        <a href={`${REPOSITORY_URL}/issues/new/choose`} target="_blank" rel="noreferrer">
          Add or improve a problem <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  );
}
