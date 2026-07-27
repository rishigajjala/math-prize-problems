# Prize Problems — The Open Ledger

An open, source-linked library of mathematical problems with cash rewards.

**177 unresolved targets. 177 permanent problem pages. One place to compare the
mathematics, reward terms, status evidence, and primary references.**

[Visit the live catalog](https://math-prize-ledger-2026.gsmrishi.chatgpt.site)

## Why this exists

Prize problems are scattered across institutional pages, personal websites,
papers, challenge programs, and maintained problem databases. Offers change.
Problems get solved. Sponsor pages disappear.

Prize Problems turns those fragments into an auditable public collection:

- one stable URL for every problem;
- exact reward amounts, sponsors, deadlines, and caveats;
- separate labels for verified, source-stated, renewal-pending, and
  sponsor-reconfirmation records;
- direct links to primary rules and scholarly references;
- search and sorting by prize value, time open, and reference depth.

The reward is an invitation. The mathematics is the point.

## Browse and participate

- [Browse all prize problems](https://math-prize-ledger-2026.gsmrishi.chatgpt.site/#catalog)
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
```

The route test verifies the catalog and every indexed `/problems/[id]` page.

## Project structure

- `app/page.tsx` — searchable catalog
- `app/problems/[id]/page.tsx` — permanent problem dossier
- `app/data/` — source-linked problem records
- `app/sitemap.ts` — root page plus every problem URL
- `.github/ISSUE_TEMPLATE/` — structured additions and corrections

The site uses [vinext](https://github.com/cloudflare/vinext) and is deployed on
Cloudflare Workers through Sites.
