import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProblemById,
  problems,
  referenceCount,
  topReward,
  topRewardUsd,
  type PrizeProblem,
} from "../../data/problems";
import { catalogSlug } from "../../data/problem-numbers";
import {
  REPOSITORY_URL,
  SITE_URL,
  ageLabel,
  certaintyLabel,
  compareProblemTitles,
  correctionUrl,
  formatCatalogId,
  humanizeMath,
  metadataDescription,
  problemPath,
  verificationLabel,
} from "../../lib/problem-format";

type ProblemPageProps = {
  params: Promise<{ id: string }>;
};

const verificationNote: Record<PrizeProblem["verification"], string> = {
  verified:
    "The problem and reward were checked against a current official or sponsor-maintained source.",
  "source-stated":
    "The cited source states that this offer is open; confirm the claim process before investing substantial work.",
  "renewal-pending":
    "The program has announced or historically used this reward, but the current round still needs an explicit renewal.",
  "reconfirmation-needed":
    "The mathematical problem appears open, but the older cash offer should be reconfirmed directly with the sponsor.",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return problems.flatMap((problem) => [
    { id: catalogSlug(problem.catalogNumber) },
    { id: problem.id },
  ]);
}

export async function generateMetadata({ params }: ProblemPageProps): Promise<Metadata> {
  const problem = getProblemById((await params).id);
  if (!problem) return { title: "Problem not found" };

  const description = metadataDescription(problem);
  const path = problemPath(problem);
  const pageUrl = `${SITE_URL}${path}/`;
  const catalogId = formatCatalogId(problem.catalogNumber);

  return {
    title: `${catalogId}: ${problem.title}`,
    description,
    keywords: [
      ...problem.tags,
      problem.field,
      catalogId,
      "PPL",
      "open problem",
      "mathematics prize",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      title: `${catalogId}: ${problem.title} — Prize Problem Ledger`,
      description,
      url: pageUrl,
      modifiedTime: `${problem.lastVerified}T00:00:00Z`,
      images: [
        {
          url: `${SITE_URL}/og-ppl.png`,
          width: 1200,
          height: 630,
          alt: "Prize Problem Ledger — permanent PPL numbers for rewarded mathematics",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${catalogId}: ${problem.title} — Prize Problem Ledger`,
      description,
      images: [`${SITE_URL}/og-ppl.png`],
    },
  };
}

function collectReferences(problem: PrizeProblem) {
  const references = new Map<string, string>();
  const add = (label: string, url?: string) => {
    if (url && !references.has(url)) references.set(url, label);
  };

  add(problem.sourceLabel, problem.sourceUrl);
  add("Claim or award rules", problem.rulesUrl);
  problem.references?.forEach((reference) => add(reference.label, reference.url));
  problem.oeis?.forEach((sequence) => add(`OEIS ${sequence}`, `https://oeis.org/${sequence}`));

  return Array.from(references, ([url, label]) => ({ label, url }));
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const problem = getProblemById((await params).id);
  if (!problem) notFound();

  const catalogId = formatCatalogId(problem.catalogNumber);
  const reward = topReward(problem);
  const index = problems.findIndex((entry) => entry.id === problem.id);
  const previous = index > 0 ? problems[index - 1] : null;
  const next = index < problems.length - 1 ? problems[index + 1] : null;
  const references = collectReferences(problem);
  const related = problems
    .filter(
      (entry) =>
        entry.id !== problem.id &&
        (entry.field === problem.field ||
          (!!problem.collection && entry.collection === problem.collection)),
    )
    .sort((a, b) => topRewardUsd(b) - topRewardUsd(a) || compareProblemTitles(a, b))
    .slice(0, 3);
  const participationUrl =
    problem.rulesUrl ||
    problem.rewards.find((offer) => offer.rulesUrl)?.rulesUrl ||
    problem.sourceUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    identifier: catalogId,
    headline: problem.title,
    description: metadataDescription(problem),
    dateModified: problem.lastVerified,
    mainEntityOfPage: `${SITE_URL}${problemPath(problem)}/`,
    about: [problem.field, ...problem.tags],
    isPartOf: {
      "@type": "CollectionPage",
      name: "Prize Problem Ledger",
      alternateName: "PPL",
      url: SITE_URL,
    },
    citation: references.map((reference) => reference.url),
  };

  return (
    <div className="site-shell problem-page">
      <div className="edition-bar">
        <span>{catalogId} · {problems.length} permanent IDs</span>
        <span className="edition-center">Prize Problem Ledger · PPL</span>
        <span>Checked {problem.lastVerified.replaceAll("-", ".")}</span>
      </div>

      <header className="site-header">
        <Link className="brand" href="/" aria-label="Prize Problem Ledger home">
          <span className="brand-mark" aria-hidden="true">
            ∴
          </span>
          <span>
            <b>Prize Problem Ledger</b>
            <small>PPL · Open reward index</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/#catalog">Catalog</Link>
          <Link href="/#method">Method</Link>
          <Link href="/#sources">Sources</Link>
          <a href={`${REPOSITORY_URL}/issues`} target="_blank" rel="noreferrer">
            Contribute
          </a>
        </nav>
        <Link className="header-cta" href="/#catalog">
          All {problems.length} problems
        </Link>
      </header>

      <main>
        <section className="problem-hero">
          <div className="problem-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Prize Problem Ledger</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#catalog">{problem.collection || problem.family}</Link>
            <span aria-hidden="true">/</span>
            <span>{catalogId}</span>
            <span aria-hidden="true">/</span>
            <span>{problem.title}</span>
          </div>

          <div className="problem-hero-grid">
            <div className="problem-hero-copy">
              <p className="problem-catalog-id">
                <span>Permanent problem ID</span>
                <strong>{catalogId}</strong>
              </p>
              <div className="problem-status-row">
                <span className={`verification verification-${problem.verification}`}>
                  <span className="status-dot" />
                  {verificationLabel[problem.verification]}
                </span>
                <span>{problem.family}</span>
                <span>{problem.type}</span>
              </div>
              <p className="problem-field">{problem.field}</p>
              <h1>{problem.title}</h1>
              <p className="problem-statement">{humanizeMath(problem.statement)}</p>
              <div className="tag-row" aria-label="Topics">
                {problem.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <aside className="problem-ledger-card" aria-label="Problem summary">
              <span className="problem-ledger-label">Top listed reward</span>
              <strong>{reward?.label || "See terms"}</strong>
              <p>{reward?.sponsor || problem.sourceLabel}</p>
              <dl>
                <div>
                  <dt>Permanent ID</dt>
                  <dd>{catalogId}</dd>
                </div>
                <div>
                  <dt>Open since</dt>
                  <dd>{problem.openSince || "Unknown"}</dd>
                </div>
                <div>
                  <dt>Time open</dt>
                  <dd>{ageLabel(problem)}</dd>
                </div>
                <div>
                  <dt>References</dt>
                  <dd>{referenceCount(problem)}</dd>
                </div>
              </dl>
              <a className="take-on-link" href={participationUrl} target="_blank" rel="noreferrer">
                Read the rules &amp; take it on <span aria-hidden="true">↗</span>
              </a>
            </aside>
          </div>
        </section>

        <section className="problem-content">
          <div className="problem-main-column">
            <section className="problem-section">
              <div className="section-heading">
                <span>01</span>
                <h2>The problem</h2>
              </div>
              <p className="full-statement">{humanizeMath(problem.statement)}</p>
              {problem.context && (
                <p className="problem-context">{humanizeMath(problem.context)}</p>
              )}
              {problem.openSinceNote && (
                <div className="note-box">
                  <strong>Date note</strong>
                  {problem.openSinceNote}
                </div>
              )}
              <div className="facts-grid problem-facts">
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
              </div>
            </section>

            <section className="problem-section">
              <div className="section-heading">
                <span>02</span>
                <h2>Reward offers</h2>
              </div>
              <div className="reward-list problem-reward-list">
                {problem.rewards.map((offer, offerIndex) => (
                  <article className="reward-offer" key={`${offer.sponsor}-${offerIndex}`}>
                    <div className="reward-heading">
                      <div>
                        <small>Offer {String(offerIndex + 1).padStart(2, "0")}</small>
                        <strong>{offer.label}</strong>
                        <span>{offer.sponsor}</span>
                      </div>
                      <span className={`certainty certainty-${offer.certainty}`}>
                        {certaintyLabel[offer.certainty]}
                      </span>
                    </div>
                    <p>{offer.terms}</p>
                    {offer.expires && (
                      <p className="reward-meta">Published deadline: {offer.expires}</p>
                    )}
                    {offer.note && <p className="reward-note">{offer.note}</p>}
                    <div className="reference-links">
                      <a href={offer.sourceUrl} target="_blank" rel="noreferrer">
                        Award source ↗
                      </a>
                      {offer.rulesUrl && (
                        <a href={offer.rulesUrl} target="_blank" rel="noreferrer">
                          Rules ↗
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="problem-section">
              <div className="section-heading">
                <span>03</span>
                <h2>Sources &amp; reading</h2>
              </div>
              <div className="source-card problem-source-card">
                <span>{references.length} unique reference links</span>
                {references.map((reference) => (
                  <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer">
                    {reference.label} <b aria-hidden="true">↗</b>
                  </a>
                ))}
              </div>
            </section>
          </div>

          <aside className="problem-sidebar">
            <section className="participation-card">
              <span className="sidebar-number">Start here</span>
              <h2>Could this be your problem?</h2>
              <p>
                Read the primary statement, check the sponsor’s current rules, study the
                literature and share a rigorous result. The reward is secondary; the mathematics
                is the point.
              </p>
              <a href={participationUrl} target="_blank" rel="noreferrer">
                Open the sponsor source <span aria-hidden="true">↗</span>
              </a>
              <small>
                Prize Problem Ledger does not administer awards or guarantee that an offer
                will be paid.
              </small>
            </section>

            <section className="status-card">
              <span className={`verification verification-${problem.verification}`}>
                <span className="status-dot" />
                {verificationLabel[problem.verification]}
              </span>
              <p>{verificationNote[problem.verification]}</p>
            </section>

            <section className="contribution-card">
              <span className="sidebar-number">Open catalog</span>
              <h2>Know something newer?</h2>
              <p>
                Report a solved problem, changed reward, stronger source or missing prize. Every
                correction makes this collection more useful.
              </p>
              <a href={correctionUrl(problem)} target="_blank" rel="noreferrer">
                Improve this record <span aria-hidden="true">↗</span>
              </a>
            </section>
          </aside>
        </section>

        {related.length > 0 && (
          <section className="related-problems">
            <div className="section-heading">
              <span>04</span>
              <h2>Related open targets</h2>
            </div>
            <div className="related-grid">
              {related.map((entry) => (
                <Link key={entry.id} href={problemPath(entry)}>
                  <span>{entry.field}</span>
                  <strong>{entry.title}</strong>
                  <small>
                    {formatCatalogId(entry.catalogNumber)} ·{" "}
                    {topReward(entry)?.label || "See reward terms"} · {ageLabel(entry)}
                  </small>
                </Link>
              ))}
            </div>
          </section>
        )}

        <nav className="problem-pager" aria-label="Adjacent problems">
          {previous ? (
            <Link href={problemPath(previous)} rel="prev">
              <span>← {formatCatalogId(previous.catalogNumber)}</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={problemPath(next)} rel="next">
              <span>{formatCatalogId(next.catalogNumber)} →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>

      <footer>
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            ∴
          </span>
          <span>
            <b>Prize Problem Ledger</b>
            <small>PPL · Open reward index</small>
          </span>
        </Link>
        <p>
          One permanent PPL number for every indexed target.
          <br />
          Source-first, openly correctable and built to invite serious attempts.
          <br />
          <span className="footer-credit">
            Website maintained by{" "}
            <a href="https://gajjala.in" target="_blank" rel="noreferrer">
              Rishikesh Gajjala
            </a>
            {" · "}Thanks to{" "}
            <a
              href="https://mariokrenn.wordpress.com"
              target="_blank"
              rel="noreferrer"
            >
              Mario Krenn
            </a>{" "}
            for suggesting to make this site.
          </span>
        </p>
        <a href={`${REPOSITORY_URL}/issues/new/choose`} target="_blank" rel="noreferrer">
          Add a prize problem <span aria-hidden="true">↗</span>
        </a>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
