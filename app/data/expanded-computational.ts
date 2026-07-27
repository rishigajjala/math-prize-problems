import type { PrizeProblemSource, RewardOffer } from "./problems";

const checked = "2026-07-27";

const rule30Source = "https://rule30prize.org/";
const rule30Terms =
  "The first correct full proof wins. Submissions may be by an individual or group and must be original work presented in a paper suitable for publication; the prize committee’s decision is final.";

const rule30Rows = [
  {
    id: "rule30-center-nonperiodic",
    title: "Rule 30 center-column non-periodicity",
    statement: "Prove or disprove that the center column of the Rule 30 cellular automaton is non-periodic.",
  },
  {
    id: "rule30-equal-frequency",
    title: "Rule 30 center-column equal frequencies",
    statement:
      "Prove or disprove that 0 and 1 occur with asymptotically equal frequency in the center column of Rule 30.",
  },
  {
    id: "rule30-irreducibility",
    title: "Rule 30 computational irreducibility",
    statement:
      "Prove or disprove that computing the nth center-column cell of Rule 30 necessarily requires at least order-n computational effort.",
  },
];

const rule30: PrizeProblemSource[] = rule30Rows.map((row) => ({
  id: row.id,
  title: row.title,
  family: "Independent",
  collection: "Wolfram Rule 30 prizes",
  type: "conjecture",
  field: "Cellular automata",
  tags: ["Rule 30", "dynamical systems", "computational complexity"],
  statement: row.statement,
  openSince: 2019,
  openSincePrecision: "prize launch",
  verification: "verified",
  lastVerified: checked,
  rewards: [
    {
      label: "$10,000",
      amount: 10_000,
      currency: "USD",
      sponsor: "Stephen Wolfram / Wolfram Research",
      certainty: "documented",
      terms: rule30Terms,
      sourceUrl: rule30Source,
      rulesUrl: rule30Source,
    },
  ],
  sourceLabel: "Official Rule 30 prize site",
  sourceUrl: rule30Source,
  references: [
    {
      label: "Prize-launch announcement",
      url: "https://announcements.wolfram.com/2019/announcing-the-rule-30-prizes/",
    },
  ],
}));

const althoferSource = "https://althofer.de/collatz-prizes.html";
const althoferTerms =
  "First solution wins; computer-assisted proofs are allowed, the sponsor excludes legal recourse, and the offer expires on 31 December 2037.";

const althoferRows: Array<{
  id: string;
  title: string;
  amount: number;
  year: number | null;
  statement: string;
}> = [
  {
    id: "althofer-stochastic-collatz",
    title: "Althöfer · Stochastic ± Collatz convergence",
    amount: 300,
    year: 2026,
    statement:
      "Starting from any odd positive integer, repeatedly choose 3n+1 or 3n−1 by a fair coin and then remove every factor of 2. Prove that the process reaches 1 almost surely.",
  },
  {
    id: "althofer-generalized-xn1-divergence",
    title: "Althöfer · A divergent Xn+1 orbit",
    amount: 25,
    year: null,
    statement:
      "Determine whether some odd multiplier X≥5 and odd starting value n₀ produce an Xn+1 trajectory that tends to infinity.",
  },
  {
    id: "althofer-9n1-from-one",
    title: "Althöfer · Does the 9n+1 orbit from 1 diverge?",
    amount: 50,
    year: null,
    statement: "Prove or disprove that the 9n+1 trajectory starting from 1 tends to infinity.",
  },
  {
    id: "althofer-optimal-3n-plus-minus-game",
    title: "Althöfer · Optimal-play 3n±1 game",
    amount: 500,
    year: 2023,
    statement:
      "Prove that every odd starting value reaches 1 in the sponsor’s adversarial 3n±1 game under optimal play, or give a counterexample.",
  },
];

const althofer: PrizeProblemSource[] = althoferRows.map((row) => ({
  id: row.id,
  title: row.title,
  family: "Independent",
  collection: "Althöfer Collatz prizes",
  type: "conjecture",
  field: "Dynamical systems",
  tags: ["Collatz variants", "integer iteration", "discrete dynamics"],
  statement: row.statement,
  openSince: row.year,
  openSincePrecision: row.year ? "sponsor-stated or introduction year" : "date not stated",
  verification: "verified",
  lastVerified: checked,
  rewards: [
    {
      label: `€${row.amount}`,
      amount: row.amount,
      currency: "EUR",
      sponsor: "Ingo Althöfer",
      certainty: "personal",
      terms: althoferTerms,
      sourceUrl: althoferSource,
      rulesUrl: althoferSource,
      expires: "2037-12-31",
    },
  ],
  sourceLabel: "Sponsor’s current Collatz-prize page",
  sourceUrl: althoferSource,
}));

const goldbachSource = "https://www.dimostriamogoldbach.it/en/prizes/";
const goldbachTerms =
  "The first received solution judged valid must be submitted in Italian or English and published under CC BY-SA 3.0. Payment is by Italian bank transfer. The private sponsor’s current page reports no solutions received.";

const goldbachRows = [
  {
    id: "goldbach-t-space-three-moduli",
    title: "Approximate t-space for three moduli",
    amount: 100,
    statement:
      "Find a finite-case arithmetic formula f that universally approximates the sponsor’s t_space_(n₁,n₂,n₃)(x) within n₃²/2.",
  },
  {
    id: "goldbach-complementary-multiples",
    title: "Complementary n₁-multiples avoiding n₂ and n₃",
    amount: 100,
    statement:
      "For primes n₁<n₂<n₃ and n>1, prove that positive h+k=n exist such that neither n₁h−1 nor n₁k+1 is divisible by n₂ or n₃.",
  },
  {
    id: "goldbach-preceding-spaces-finite-form",
    title: "Finite-form representation of preceding spaces",
    amount: 200,
    statement:
      "Prove the sponsor’s stated finite-index f/g representation for positive x avoiding all specified nᵢ when x+1 is divisible by n₁.",
  },
];

const goldbach: PrizeProblemSource[] = goldbachRows.map((row) => ({
  id: row.id,
  title: `Let’s Prove Goldbach · ${row.title}`,
  family: "Independent",
  collection: "Let’s Prove Goldbach",
  type: "conjecture",
  field: "Number theory",
  tags: ["divisibility", "finite formulas", "Goldbach project"],
  statement: row.statement,
  openSince: null,
  openSincePrecision: "prize date not published",
  verification: "source-stated",
  lastVerified: checked,
  rewards: [
    {
      label: `€${row.amount}`,
      amount: row.amount,
      currency: "EUR",
      sponsor: "Dimostriamo Goldbach team",
      certainty: "personal",
      terms: goldbachTerms,
      sourceUrl: goldbachSource,
      rulesUrl: goldbachSource,
    },
  ],
  sourceLabel: "Sponsor’s live prize page",
  sourceUrl: goldbachSource,
  rulesUrl: "https://www.dimostriamogoldbach.it/en/info-and-contacts/",
}));

const proximitySource = "https://proximityprize.org/";
const proximityPaper = "https://eprint.iacr.org/2026/680";
const proximityTerms =
  "This is a preliminary shared prize program rather than a guaranteed per-problem payout. Accepted public, peer-reviewed work may receive all or part of the US$1,000,000 pool; judges may divide it among full, partial and complementary results, and the published details may change.";

const proximityRows = [
  {
    id: "proximity-grand-mca",
    title: "Proximity Prize · Grand MCA challenge",
    statement:
      "For constant-rate Reed–Solomon codes over the specified smooth domains and rates, determine the largest normalized distance δ* for which the maximum-correlated-agreement error meets the target security level.",
  },
  {
    id: "proximity-grand-list-decoding",
    title: "Proximity Prize · Grand list-decoding challenge",
    statement:
      "For the formal prize parameters, determine the largest normalized distance δ* for which the relevant Reed–Solomon list size remains at most the target fraction of the field.",
  },
];

const proximity: PrizeProblemSource[] = proximityRows.map((row) => ({
  id: row.id,
  title: row.title,
  family: "Institutional",
  collection: "Ethereum Proximity Prize",
  type: "conjecture",
  field: "Coding theory",
  tags: ["Reed–Solomon codes", "list decoding", "proof systems"],
  statement: row.statement,
  openSince: 2025,
  openSincePrecision: "program origin; formal paper 2026",
  verification: "renewal-pending",
  lastVerified: checked,
  rewards: [
    {
      label: "Share of $1,000,000 pool",
      amount: 1_000_000,
      currency: "USD",
      sponsor: "Ethereum Foundation Proximity Prize",
      certainty: "conditional",
      terms: proximityTerms,
      sourceUrl: proximitySource,
      rulesUrl: proximityPaper,
      note: "The two grand challenges share one pool; the listed value is not guaranteed for either record.",
    },
  ],
  sourceLabel: "Official preliminary prize site",
  sourceUrl: proximitySource,
  rulesUrl: proximityPaper,
}));

const poseidonSource = "https://www.poseidon-initiative.info/";
const poseidonCollisionRewards: RewardOffer[] = [
  { q: 4, amount: 64_000 },
  { q: 5, amount: 128_000 },
  { q: 6, amount: 256_000 },
  { q: 7, amount: 512_000 },
].map(({ q, amount }) => ({
  label: `$${amount.toLocaleString("en-US")} · q=${q}`,
  amount,
  currency: "USD",
  sponsor: "Ethereum Foundation / Poseidon Initiative",
  certainty: "documented",
  terms:
    `Find a Poseidon1/KoalaBear partial collision matching the first ${q} output elements for the published instance. The first qualifying submission wins; a report is due within one month and code/report must become public under the posted timetable.`,
  sourceUrl: poseidonSource,
  rulesUrl: poseidonSource,
  expires: "2029-01-01",
  note: "Nested milestones: a stronger collision also meets weaker thresholds, and the rules do not clearly guarantee stacked payouts.",
}));

const poseidonCollision: PrizeProblemSource = {
  id: "poseidon-koalabear-partial-collision",
  title: "Poseidon1/KoalaBear partial-collision milestones",
  family: "Institutional",
  collection: "Poseidon Initiative",
  type: "computational target",
  field: "Cryptography",
  tags: ["Poseidon hash", "collision resistance", "finite fields"],
  statement:
    "For the published 15-element Poseidon1/KoalaBear input instance H(0xc09de4,·), find two distinct inputs whose first q output elements collide, for any still-open milestone q=4,5,6,7.",
  openSince: 2026,
  openSincePrecision: "current challenge round",
  verification: "verified",
  lastVerified: checked,
  rewards: poseidonCollisionRewards,
  sourceLabel: "Official Poseidon Initiative rules",
  sourceUrl: poseidonSource,
  rulesUrl: poseidonSource,
};

const poseidonZeroTest: PrizeProblemSource = {
  id: "poseidon-zero-test-record-2026",
  title: "Poseidon 2026 zero-test record",
  family: "Institutional",
  collection: "Poseidon Initiative",
  type: "computational target",
  field: "Cryptography",
  tags: ["Poseidon hash", "algebraic attacks", "finite fields"],
  statement:
    "Find a degree-7 polynomial over the stated quadratic extension field whose root is formed from the first two Poseidon1 RF=6 outputs, and set a new record for the number of partial rounds broken beyond the already verified records.",
  openSince: 2026,
  openSincePrecision: "current challenge round",
  verification: "verified",
  lastVerified: checked,
  rewards: [
    {
      label: "Share of $40,000 ranking pool",
      amount: 40_000,
      currency: "USD",
      sponsor: "Ethereum Foundation / Poseidon Initiative",
      certainty: "conditional",
      terms:
        "A ranked two-phase record program: phase 1 closes 1 August 2026 and phase 2 closes 1 December 2026. Existing records through RP11 are already claimed; only higher accepted records remain eligible.",
      sourceUrl: poseidonSource,
      rulesUrl: poseidonSource,
      expires: "2026-12-01",
      note: "Shared ranking pool, not a guaranteed $40,000 for one submission.",
    },
  ],
  sourceLabel: "Official Poseidon Initiative rules",
  sourceUrl: poseidonSource,
  rulesUrl: poseidonSource,
};

const poseidonAttackRows = [
  { id: "poseidon-256-reduced-round", title: "Poseidon-256" },
  { id: "poseidon-64-reduced-round", title: "Poseidon-64" },
  { id: "poseidon-31-reduced-round", title: "Poseidon-31" },
];

const poseidonAttacks: PrizeProblemSource[] = poseidonAttackRows.map((row) => ({
  id: row.id,
  title: `${row.title} reduced-round attack`,
  family: "Institutional",
  collection: "Poseidon Initiative",
  type: "computational target",
  field: "Cryptography",
  tags: ["Poseidon hash", "cryptanalysis", "reduced-round attacks"],
  statement:
    `Improve the published best reduced-round attack against ${row.title} and break a specified security property under the program’s formal rules.`,
  openSince: 2026,
  openSincePrecision: "current grant round",
  verification: "verified",
  lastVerified: checked,
  rewards: [
    {
      label: "At least $5,000 from $90,000 fund",
      amount: 5_000,
      currency: "USD",
      sponsor: "Ethereum Foundation / Poseidon Initiative",
      certainty: "conditional",
      terms:
        "Publish an improved attack as an IACR ePrint by the end of 2026. Awards are discretionary, start at $5,000 and share a $90,000 fund across eligible Poseidon attack results; program authors are excluded.",
      sourceUrl: poseidonSource,
      rulesUrl: poseidonSource,
      expires: "2026-12-31",
      note: "One paper spanning several parameter families may not earn separate awards.",
    },
  ],
  sourceLabel: "Official Poseidon Initiative rules",
  sourceUrl: poseidonSource,
  rulesUrl: poseidonSource,
}));

const mimcIndex = "https://crypto.ethereum.org/bounties";
const mimcRules = "https://crypto.ethereum.org/bounties/mimc-hash-challenge";
const mimcRows = [
  { id: "mimc-bn254-collision", title: "BN254", fieldTag: "BN254" },
  { id: "mimc-bls12-381-collision", title: "BLS12-381", fieldTag: "BLS12-381" },
];

const mimc: PrizeProblemSource[] = mimcRows.map((row) => ({
  id: row.id,
  title: `MiMC collision over ${row.title}`,
  family: "Institutional",
  collection: "Ethereum cryptography bounties",
  type: "computational target",
  field: "Cryptography",
  tags: ["MiMC", row.fieldTag, "hash collisions"],
  statement:
    `Find a collision in the specified 220-round MiMCSponge / MiMC-Feistel construction over the ${row.title} scalar field.`,
  openSince: 2020,
  openSincePrecision: "challenge launch",
  verification: "verified",
  lastVerified: checked,
  rewards: [
    {
      label: "$20,000",
      amount: 20_000,
      currency: "USD",
      sponsor: "Ethereum Foundation and Protocol Labs",
      certainty: "documented",
      terms:
        "Submit a nonanonymous collision by email under the official rules. Payment may be in USD, ETH or DAI; no deadline is stated and the current bounty index shows no claimed marker.",
      sourceUrl: mimcIndex,
      rulesUrl: mimcRules,
    },
  ],
  sourceLabel: "Official Ethereum bounty index",
  sourceUrl: mimcIndex,
  rulesUrl: mimcRules,
}));

const hagerSource = "https://people.clas.ufl.edu/hager/files/prize.pdf";
const hager: PrizeProblemSource = {
  id: "hager-reverse-markov-quadrature",
  title: "Hager · Reverse-Markov quadrature conjecture",
  family: "Independent",
  collection: "Hager prize problem",
  type: "conjecture",
  field: "Numerical analysis",
  tags: ["quadrature", "polynomial inequalities", "Gauss–Radau nodes"],
  statement:
    "For a polynomial p of degree at most n at the specified Gauss or Radau nodes, prove the reverse-Markov bounds in Hager’s statement: p(−1)=0 and bounded nodal derivatives should force bounded nodal values.",
  openSince: 2015,
  openSincePrecision: "dated prize statement",
  verification: "reconfirmation-needed",
  lastVerified: checked,
  rewards: [
    {
      label: "¥10,000",
      amount: 10_000,
      currency: "JPY",
      sponsor: "William W. Hager",
      certainty: "personal",
      terms: "The first correct solution wins under the concise conditions in the author’s prize PDF.",
      sourceUrl: hagerSource,
      note: "The prize PDF is dated 2015. A 2026 University of Florida migration page still lists it, but the sponsor should reconfirm before reliance.",
    },
  ],
  sourceLabel: "Author’s official prize PDF",
  sourceUrl: hagerSource,
  references: [
    {
      label: "2026 University of Florida migration listing",
      url: "https://people.clas.ufl.edu/hager/content-removed/",
    },
  ],
};

const eccSource = "https://www.certicom.com/content/certicom/en/the-certicom-ecc-challenge.html";
const eccRules = "https://www.certicom.com/content/dam/certicom/images/pdfs/challenge-2009.pdf";
const eccRows = [
  { id: "ecc2k-130", label: "ECC2K-130", amount: 20_000, description: "Koblitz binary-field, 131-bit subgroup" },
  { id: "ecc2-131", label: "ECC2-131", amount: 20_000, description: "random binary-field, 131-bit subgroup" },
  { id: "eccp-131", label: "ECCp-131", amount: 20_000, description: "prime-field, 131-bit subgroup" },
  { id: "ecc2k-163", label: "ECC2K-163", amount: 30_000, description: "Koblitz binary-field, 163-bit subgroup" },
  { id: "ecc2-163", label: "ECC2-163", amount: 30_000, description: "random binary-field, 163-bit subgroup" },
  { id: "eccp-163", label: "ECCp-163", amount: 30_000, description: "prime-field, 163-bit subgroup" },
  { id: "ecc2-191", label: "ECC2-191", amount: 40_000, description: "binary-field, 191-bit subgroup" },
  { id: "eccp-191", label: "ECCp-191", amount: 40_000, description: "prime-field, 191-bit challenge identifier" },
  { id: "ecc2k-238", label: "ECC2K-238", amount: 50_000, description: "Koblitz binary-field, 239-bit level" },
  { id: "ecc2-238", label: "ECC2-238", amount: 50_000, description: "random binary-field, 239-bit level" },
  { id: "eccp-239", label: "ECCp-239", amount: 50_000, description: "prime-field, 239-bit level" },
  { id: "ecc2k-358", label: "ECC2K-358", amount: 100_000, description: "Koblitz binary-field, 359-bit level" },
  { id: "ecc2-353", label: "ECC2-353", amount: 100_000, description: "random binary-field, 359-bit level" },
  { id: "eccp-359", label: "ECCp-359", amount: 100_000, description: "prime-field, 359-bit level" },
];

const ecc: PrizeProblemSource[] = eccRows.map((row) => ({
  id: `certicom-${row.id}`,
  title: `Certicom ECC challenge · ${row.label}`,
  family: "Institutional",
  collection: "Certicom ECC Challenge",
  type: "computational target",
  field: "Cryptography",
  tags: ["elliptic curves", "discrete logarithm", row.description],
  statement:
    `For the published ${row.label} instance (${row.description}), compute the private scalar ℓ satisfying ℓP=Q and document the complete method.`,
  openSince: 1997,
  openSincePrecision: "challenge launch",
  verification: "source-stated",
  lastVerified: checked,
  rewards: [
    {
      label: `$${row.amount.toLocaleString("en-US")}`,
      amount: row.amount,
      currency: "USD",
      sponsor: "Certicom Corp. / BlackBerry",
      certainty: "documented",
      terms:
        "The first correct emailed solution wins after third-party verification. Individuals or groups may enter; a group splits one award. The sponsor is sole arbiter and reserves rights to change amounts or terminate the challenge.",
      sourceUrl: eccSource,
      rulesUrl: eccRules,
      note: "The current official ECC page says the challenge still runs; the detailed rules were last updated in 2009, so confirm logistics before major work.",
    },
  ],
  sourceLabel: "Official outstanding-challenges page",
  sourceUrl: eccSource,
  rulesUrl: eccRules,
  references: [
    {
      label: "Current Certicom ECC overview",
      url: "https://www.certicom.com/en/ecc",
    },
  ],
}));

const rc5: PrizeProblemSource = {
  id: "distributed-net-rc5-72",
  title: "distributed.net RC5-72 key recovery",
  family: "Institutional",
  collection: "distributed.net",
  type: "computational target",
  field: "Cryptography",
  tags: ["RC5", "key search", "distributed computing"],
  statement:
    "Recover the unknown 72-bit key and plaintext for distributed.net’s published RC5-32/12/9 ciphertext, ordinarily by contributing verified key-space work to the live distributed search.",
  openSince: 2002,
  openSincePrecision: "project launch",
  verification: "verified",
  lastVerified: checked,
  rewards: [
    {
      label: "$4,000 allocation",
      amount: 4_000,
      currency: "USD",
      sponsor: "Distributed Computing Technologies, Inc.",
      certainty: "documented",
      terms:
        "The operative replacement pledge allocates $1,000 to the finder, $1,000 to the finder’s team—or the finder if unaffiliated—and $2,000 to the Free Software Foundation. The first verified key ends the project.",
      sourceUrl: "https://www.distributed.net/RC5",
      rulesUrl: "https://blogs.distributed.net/2008/09/08/02/09/bovine/",
      note: "Only $2,000 of the base allocation can reach the finder/team; the remainder is a designated donation.",
    },
  ],
  sourceLabel: "Current project page · in progress",
  sourceUrl: "https://www.distributed.net/RC5",
  rulesUrl: "https://blogs.distributed.net/2008/09/08/02/09/bovine/",
};

export const expandedComputationalProblems: PrizeProblemSource[] = [
  ...rule30,
  ...althofer,
  ...goldbach,
  ...proximity,
  poseidonCollision,
  poseidonZeroTest,
  ...poseidonAttacks,
  ...mimc,
  hager,
  ...ecc,
  rc5,
];
