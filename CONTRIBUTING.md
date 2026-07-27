# Contributing to Prize Problems

Prize Problems is an open, source-first catalog. The quickest way to help is to
[propose a problem](https://github.com/rishigajjala/math-prize-problems/issues/new?template=add-problem.yml)
or [correct an existing entry](https://github.com/rishigajjala/math-prize-problems/issues/new?template=correct-entry.yml).

## What belongs in the catalog

An entry needs all three:

1. A specific unresolved mathematical target: proof, disproof, construction,
   certified computation, or another objectively judgeable result.
2. A monetary reward tied to resolving that target.
3. A traceable source for the amount, sponsor, and claim conditions.

General grants, medals, token-only rewards, expired competitions, and solved
problems do not qualify. Historical offers whose sponsor has not recently
reconfirmed them may be included only with the explicit
`reconfirmation-needed` label.

## Source hierarchy

Prefer sources in this order:

1. Sponsor or award-giver rules.
2. A maintained canonical problem database.
3. Original papers and scholarly references.
4. Discovery sources only when they lead to stronger evidence.

Do not use a search-result page as the evidence for a catalog claim.

## Editing a record

Records live in:

- `app/data/problems.ts`
- `app/data/expanded-personal.ts`
- `app/data/expanded-computational.ts`
- `app/data/expanded-sponsored.ts`
- `app/data/erdos.json`

Treat every `id` as a permanent public URL slug. Correcting a title must not
silently change the ID.

Each record should state:

- the exact problem and mathematical field;
- when it became open, with honest date precision;
- every current reward offer, sponsor, currency, deadline, terms, and caveat;
- its verification label and last-checked date;
- primary rules and useful scholarly references.

## Local checks

Use Node.js 22 or newer and pnpm:

```bash
pnpm install
pnpm run lint
pnpm run build
pnpm test
```

The route test checks that all indexed problem pages render successfully. A
pull request should also explain the evidence supporting every status or reward
change.
