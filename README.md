# Prize Problem Ledger (PPL)

An open, source-linked library of mathematical problems with cash rewards and
permanent citation numbers.

**177 unresolved targets. 177 immutable PPL numbers. One place to compare the
mathematics, reward terms, status evidence, and primary references.**

[Visit the live catalog](https://prizeproblems.org/)

## Why this exists

Prize problems are scattered across institutional pages, personal websites,
papers, challenge programs, and maintained problem databases. Offers change.
Problems get solved. Sponsor pages disappear.

Prize Problem Ledger turns those fragments into an auditable public collection:

- one stable number and URL for every problem;
- exact reward amounts, sponsors, deadlines, and caveats;
- separate labels for verified, source-stated, renewal-pending, and
  sponsor-reconfirmation records;
- direct links to primary rules and scholarly references;
- search and sorting by prize value, time open, and reference depth.

The reward is an invitation. The mathematics is the point.

## Permanent problem IDs

Every accepted entry receives an append-only identifier such as **PPL 017**.
The founding 177-entry registry was finalized once in natural title order
before launch. That launch mapping is the immutable baseline: its numbers are
never changed or reused, and new entries receive the next unused number.

Use the short form in papers, posts, and conversations:

> We solved PPL 017.

The full citation form is `PPL 017: [Problem title] — Prize Problem Ledger`.
Legacy title-based URLs remain available, while canonical links use the
permanent number.

## Browse and participate

- [Browse all prize problems](https://prizeproblems.org/#catalog)
- [Propose a missing problem](https://github.com/rishigajjala/math-prize-problems/issues/new?template=add-problem.yml)
- [Correct an existing record](https://github.com/rishigajjala/math-prize-problems/issues/new?template=correct-entry.yml)
- [Read the contribution guide](CONTRIBUTING.md)

If you know that a problem was solved, a reward was claimed, or a sponsor
changed the terms, please open an issue with a direct source.

## Current collections

The catalog includes:

- the six open Millennium Prize Problems;
- strict-open rewarded Erdős problems;
- Beal, Collatz, Rule 30, S-combinator, Certicom ECC, Poseidon, MiMC, and RC5
  challenges;
- Kimberling, Boyer, Okhotin, Zhi-Wei Sun, Talagrand, Nanongkai, Althöfer, and
  Scott Foundation offers;
- selected cryptography, graph theory, coding theory, combinatorics, and
  computational targets.

Private bounties have no central registry, so the collection does not claim
literal completeness. It does claim transparent sourcing and honest uncertainty.

## Run locally

Requirements: Node.js 22.13 or newer and pnpm.

```bash
pnpm install
pnpm run dev
```

Validation:

```bash
pnpm run lint
pnpm run build
pnpm test
GITHUB_PAGES=true pnpm run build:pages
pnpm run test:pages
```

The route test verifies the catalog and every indexed `/problems/[id]` page.

## Project structure

- `app/page.tsx` — searchable catalog
- `app/problems/[id]/page.tsx` — permanent problem dossier
- `app/data/` — source-linked records and the permanent PPL number registry
- `app/sitemap.ts` — root page plus every problem URL
- `.github/ISSUE_TEMPLATE/` — structured additions and corrections

The public site is exported as static HTML and deployed automatically to GitHub
Pages from the `main` branch.
