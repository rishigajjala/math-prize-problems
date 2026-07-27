import type { PrizeProblemSource } from "./problems";

const checked = "2026-07-27";

const combinatorSource = "https://www.combinatorprize.org/";

const sCombinator: PrizeProblemSource = {
  id: "wolfram-s-combinator-universality",
  title: "Is the S combinator computation-universal by itself?",
  family: "Institutional",
  collection: "Wolfram Foundation challenges",
  type: "conjecture",
  field: "Theoretical computer science",
  tags: ["combinatory logic", "universality", "models of computation"],
  statement:
    "Prove or disprove Stephen Wolfram’s conjecture that the S combinator alone—without K or other primitive combinators—is computation-universal.",
  openSince: 2020,
  openSincePrecision: "conjecture and prize launch",
  verification: "verified",
  lastVerified: checked,
  rewards: [
    {
      label: "$20,000",
      amount: 20_000,
      currency: "USD",
      sponsor: "Wolfram Foundation",
      certainty: "documented",
      terms:
        "The first individual or group to submit a correct full proof to the committee wins. Work must be original, nonanonymous and presented as a technical research paper suitable for publication. Submissions remain open until a satisfactory solution is achieved.",
      sourceUrl: combinatorSource,
      rulesUrl: combinatorSource,
    },
  ],
  sourceLabel: "Official Wolfram S Combinator Challenge",
  sourceUrl: combinatorSource,
  rulesUrl: combinatorSource,
};

const nanongkaiSource = "https://sites.google.com/site/dannanongkai/open";
const nanongkaiFirst = "The official page reserves each cash prize for the first solver.";

const nanongkai: PrizeProblemSource[] = [
  {
    id: "nanongkai-omv",
    title: "Nanongkai · Online Matrix–Vector Multiplication conjecture",
    family: "Independent",
    collection: "Nanongkai Open €",
    type: "conjecture",
    field: "Algorithms",
    tags: ["OMv conjecture", "dynamic algorithms", "fine-grained complexity"],
    statement:
      "Prove or disprove the Online Matrix–Vector Multiplication conjecture: no truly subcubic algorithm solves the standard online Boolean matrix–vector product problem.",
    openSince: 2015,
    openSincePrecision: "original conjecture",
    openSinceNote: "The cash reward was first offered at ADFOCS 2018.",
    verification: "verified",
    lastVerified: checked,
    rewards: [
      {
        label: "€500",
        amount: 500,
        currency: "EUR",
        sponsor: "Danupon Nanongkai",
        certainty: "personal",
        terms: `${nanongkaiFirst} The current listing gives a 2028 expiry.`,
        sourceUrl: nanongkaiSource,
        rulesUrl: nanongkaiSource,
        expires: "2028-12-31",
      },
    ],
    sourceLabel: "Sponsor’s current Open € page",
    sourceUrl: nanongkaiSource,
    references: [
      {
        label: "Original OMv conjecture paper",
        url: "https://arxiv.org/abs/1511.06773",
      },
    ],
  },
  {
    id: "nanongkai-v-hinted-mv",
    title: "Nanongkai · v-hinted Matrix–Vector conjecture",
    family: "Independent",
    collection: "Nanongkai Open €",
    type: "conjecture",
    field: "Algorithms",
    tags: ["hinted matrix–vector multiplication", "dynamic algorithms", "fine-grained complexity"],
    statement:
      "Prove or disprove the v-hinted Matrix–Vector conjecture, Conjecture 5.2 of van den Brand, Nanongkai and Saranurak.",
    openSince: 2018,
    openSincePrecision: "reward first offered",
    verification: "verified",
    lastVerified: checked,
    rewards: [
      {
        label: "€300",
        amount: 300,
        currency: "EUR",
        sponsor: "Danupon Nanongkai",
        certainty: "personal",
        terms: `${nanongkaiFirst} The current listing gives a 2028 expiry.`,
        sourceUrl: nanongkaiSource,
        rulesUrl: nanongkaiSource,
        expires: "2028-12-31",
      },
    ],
    sourceLabel: "Sponsor’s current Open € page",
    sourceUrl: nanongkaiSource,
    references: [
      {
        label: "Conjecture 5.2 source paper",
        url: "https://arxiv.org/abs/1905.05067",
      },
    ],
  },
  {
    id: "nanongkai-cut-query-reachability",
    title: "Nanongkai · Cut-query reachability",
    family: "Independent",
    collection: "Nanongkai Open €",
    type: "conjecture",
    field: "Algorithms",
    tags: ["graph queries", "reachability", "query complexity"],
    statement:
      "Given a hidden directed unweighted graph where cut(S) returns the number of edges leaving S, either give an O(|V|^1.999)-query algorithm for s–t reachability or rule out O(|V|^1.001) queries; a smaller sub-bounty asks for any improvement below O(|V|²/log n).",
    openSince: 2024,
    openSincePrecision: "reward first offered",
    verification: "verified",
    lastVerified: checked,
    rewards: [
      {
        label: "€110 main target",
        amount: 110,
        currency: "EUR",
        sponsor: "Danupon Nanongkai",
        certainty: "personal",
        terms: `${nanongkaiFirst} Resolve either side of the main query-complexity target. The current listing expires in 2034.`,
        sourceUrl: nanongkaiSource,
        rulesUrl: nanongkaiSource,
        expires: "2034-12-31",
      },
      {
        label: "€5 improvement target",
        amount: 5,
        currency: "EUR",
        sponsor: "Danupon Nanongkai",
        certainty: "personal",
        terms:
          "Improve the O(|V|²/log n) cut-query upper bound, for example to O(|V|²/(log n log log n)). This is a sub-bounty attached to the same reachability problem.",
        sourceUrl: nanongkaiSource,
        rulesUrl: nanongkaiSource,
        expires: "2034-12-31",
      },
    ],
    sourceLabel: "Sponsor’s current Open € page",
    sourceUrl: nanongkaiSource,
    references: [
      {
        label: "Sponsor’s supporting note",
        url: "https://nextcloud.mpi-klsb.mpg.de/index.php/s/jBobpANjnjeJo3w",
      },
    ],
  },
  {
    id: "nanongkai-faster-algorithm-larger-description",
    title: "Nanongkai · Faster algorithm, larger description",
    family: "Independent",
    collection: "Nanongkai Open €",
    type: "existence",
    field: "Theoretical computer science",
    tags: ["description complexity", "time complexity", "algorithms"],
    statement:
      "In a Turing-machine or RAM model, determine whether a decision problem P can have a 10n-time algorithm, a particular 100n²-time algorithm A, yet every 10n-time algorithm for P has a description strictly larger than A.",
    openSince: null,
    openSincePrecision: "date not stated by sponsor",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      {
        label: "€5",
        amount: 5,
        currency: "EUR",
        sponsor: "Danupon Nanongkai",
        certainty: "personal",
        terms: `${nanongkaiFirst} No expiry is displayed for this €5 question; confirm before relying on the offer.`,
        sourceUrl: nanongkaiSource,
        rulesUrl: nanongkaiSource,
      },
    ],
    sourceLabel: "Sponsor’s current Open € page",
    sourceUrl: nanongkaiSource,
  },
];

const talagrandConditions = "https://michel.talagrand.net/prizes/prizes.pdf";

const talagrand: PrizeProblemSource[] = [
  {
    id: "talagrand-simple-combinatorics",
    title: "Talagrand · Simple combinatorics / discrete convexity",
    family: "Independent",
    collection: "Talagrand prize problems",
    type: "conjecture",
    field: "Probability",
    tags: ["product measures", "covering", "discrete convexity"],
    statement:
      "For biased product measure Pδ on {0,1}ᴺ, prove Talagrand’s dimension-free q-covering assertion for every high-measure family D—or meet the prize PDF’s stated weaker bound using a parameter δ′ depending only on δ.",
    openSince: 2005,
    openSincePrecision: "documented open by",
    verification: "verified",
    lastVerified: checked,
    rewards: [
      {
        label: "$1,000",
        amount: 1_000,
        currency: "USD",
        sponsor: "Michel Talagrand",
        certainty: "personal",
        terms:
          "Resolve the official statement or its explicitly qualifying relaxation. Talagrand’s general conditions say he will award prizes while able to understand the submitted proof; authorship is not required and no expiry is stated.",
        sourceUrl: "https://michel.talagrand.net/prizes/combinatorics.pdf",
        rulesUrl: talagrandConditions,
      },
    ],
    sourceLabel: "Sponsor’s official problem PDF",
    sourceUrl: "https://michel.talagrand.net/prizes/combinatorics.pdf",
    rulesUrl: talagrandConditions,
    references: [
      {
        label: "2025 NYU seminar · ongoing work",
        url: "https://math.nyu.edu/dynamic/calendars/seminars/graduate-student-postdoc-seminar/4331/",
      },
      {
        label: "SciLag open-problem record",
        url: "https://www.scilag.net/problem/P-240321.1",
      },
    ],
  },
  {
    id: "talagrand-ultimate-matching-d2",
    title: "Talagrand · Ultimate matching conjecture in dimension two",
    family: "Independent",
    collection: "Talagrand prize problems",
    type: "conjecture",
    field: "Probability",
    tags: ["random matching", "optimal transport", "empirical processes"],
    statement:
      "For two independent uniform N-point samples in the unit square and exponents α₁,α₂ with 1/α₁+1/α₂=1/2, prove Talagrand’s universal-probability matching bounds; either special target (∞,2) or (4,4) earns the full prize.",
    openSince: 2001,
    openSincePrecision: "approximate research-problem date",
    verification: "reconfirmation-needed",
    lastVerified: checked,
    rewards: [
      {
        label: "$1,000",
        amount: 1_000,
        currency: "USD",
        sponsor: "Michel Talagrand",
        certainty: "personal",
        terms:
          "A proof of the full statement or either explicitly listed special case earns the full prize under Talagrand’s general conditions.",
        sourceUrl: "https://michel.talagrand.net/prizes/matchings.pdf",
        rulesUrl: talagrandConditions,
        note: "The 2021 book still presents the 2D problem as open; the cash PDF dates to 2013, so reconfirm payout before reliance.",
      },
    ],
    sourceLabel: "Sponsor’s official matching-prize PDF",
    sourceUrl: "https://michel.talagrand.net/prizes/matchings.pdf",
    rulesUrl: talagrandConditions,
    references: [
      {
        label: "2021 research-problem treatment",
        url: "https://michel.talagrand.net/ULBSPRINGER.pdf",
      },
    ],
  },
];

const scottHub = "https://people.cs.uchicago.edu/~ridg/prizes/prizes.html";

const scottRows = [
  {
    id: "scott-freudenthal-inf-sup",
    title: "Inf-sup condition for quartics on the Freudenthal mesh",
    year: 2023,
    source: "https://people.cs.uchicago.edu/~ridg/prizes/kuhnprize.pdf",
    statement:
      "Prove and publish mesh-size-independent Scott–Vogelius inf-sup stability in three dimensions on the Freudenthal mesh for polynomial degree k≥4, or publish an analytical refutation.",
    terms:
      "The first person or group to prove and publish the result—or an analytical refutation—wins. Partial payment may be made for partial results; simultaneous independent submissions each receive the full amount, while a group splits its award.",
  },
  {
    id: "scott-zero-gradient",
    title: "Zero-gradient / Scott–Vogelius–Nitsche convergence",
    year: 2023,
    source: "https://people.cs.uchicago.edu/~ridg/prizes/zerogradprize.pdf",
    statement:
      "Publish a proof that the Scott–Vogelius–Nitsche method converges on curved boundaries, including the required computational study of the penalty parameter—or explain rigorously why the expected error rate fails.",
    terms:
      "A qualifying published proof must include the computational penalty-parameter study required by the prize PDF. First-solver priority and detailed adjudication are not specified.",
  },
  {
    id: "scott-strouhal",
    title: "Strouhal Prize · Periodic flow around a cylinder",
    year: 2025,
    source: "https://people.cs.uchicago.edu/~ridg/prizes/strouhalprize.pdf",
    statement:
      "Prove the existence of a nonconstant time-periodic two-dimensional Navier–Stokes solution for flow around a cylinder in the indicated Reynolds-number regime, roughly 50–1000, or prove that none exists.",
    terms:
      "Publish either the existence proof or the nonexistence proof described in the official PDF. First-solver priority and detailed adjudication are not specified.",
  },
];

const scott: PrizeProblemSource[] = scottRows.map((row) => ({
  id: row.id,
  title: `Ridgway Scott · ${row.title}`,
  family: "Institutional",
  collection: "Ridgway Scott Foundation",
  type: "conjecture",
  field: row.id === "scott-strouhal" ? "Partial differential equations" : "Numerical analysis",
  tags:
    row.id === "scott-strouhal"
      ? ["Navier–Stokes", "periodic solutions", "fluid dynamics"]
      : ["finite elements", "Scott–Vogelius", "stability"],
  statement: row.statement,
  openSince: row.year,
  openSincePrecision: "dated prize PDF",
  verification: "verified",
  lastVerified: checked,
  rewards: [
    {
      label: "$1,000",
      amount: 1_000,
      currency: "USD",
      sponsor: "Ridgway Scott Foundation",
      certainty: "documented",
      terms: row.terms,
      sourceUrl: row.source,
      rulesUrl: row.source,
    },
  ],
  sourceLabel: "Official Foundation prize PDF",
  sourceUrl: row.source,
  rulesUrl: row.source,
  references: [{ label: "Maintained official prize hub", url: scottHub }],
}));

const length72Source = "https://sites.google.com/site/professorstevendougherty/length72";

const length72: PrizeProblemSource = {
  id: "type-ii-72-36-16-code",
  title: "Does a Type II [72,36,16] binary code exist?",
  family: "Independent",
  collection: "Length-72 coding prize",
  type: "existence",
  field: "Coding theory",
  tags: ["self-dual codes", "binary codes", "extremal codes"],
  statement:
    "Determine whether an extremal Type II binary self-dual code with parameters [72,36,16] exists.",
  openSince: 1973,
  openSincePrecision: "original Sloane offer",
  openSinceNote: "The larger existence and nonexistence rewards were announced in 2000–2001.",
  verification: "reconfirmation-needed",
  lastVerified: checked,
  rewards: [
    {
      label: "$100 · existence",
      amount: 100,
      currency: "USD",
      sponsor: "Steven T. Dougherty",
      certainty: "personal",
      terms:
        "Paid once to the first solver after publication in a refereed reputable mathematics journal; the sponsors decide eligibility.",
      sourceUrl: length72Source,
    },
    {
      label: "$200 · nonexistence",
      amount: 200,
      currency: "USD",
      sponsor: "Masaaki Harada",
      certainty: "personal",
      terms:
        "Paid once to the first solver after publication in a refereed reputable mathematics journal; the sponsors decide eligibility.",
      sourceUrl: length72Source,
    },
    {
      label: "$10 · either resolution",
      amount: 10,
      currency: "USD",
      sponsor: "Neil Sloane",
      certainty: "personal",
      terms: "The sponsor page records Sloane’s standing $10 offer for either a proof or disproof.",
      sourceUrl: length72Source,
    },
  ],
  sourceLabel: "Current sponsor page",
  sourceUrl: length72Source,
};

const simonsSource = "https://simons.berkeley.edu/open-problems-cryptography-summer-2015";
const simonsTerms =
  "The Simons Institute page calls this a symbolic cash prize and names the payer and amount, but publishes no claim mechanics, deadline or recent renewal. Contact the proposer before relying on payment.";

const simonsRows: Array<{
  id: string;
  title: string;
  amount: number;
  sponsor: string;
  statement: string;
  references?: Array<{ label: string; url: string }>;
}> = [
  {
    id: "simons-lattice-one-way-permutation",
    title: "One-way permutations from a worst-case lattice assumption",
    amount: 100,
    sponsor: "Vinod Vaikuntanathan",
    statement:
      "Construct a cryptographic one-way permutation from a worst-case lattice assumption alone, or prove the requested implication impossible under the stated model.",
  },
  {
    id: "simons-io-from-plain-lwe",
    title: "Indistinguishability obfuscation from plain LWE",
    amount: 100,
    sponsor: "Amit Sahai",
    statement:
      "Construct indistinguishability obfuscation from the plain Learning With Errors assumption, without the stronger circular, evasive or succinct-LWE-style assumptions used in later work.",
    references: [
      {
        label: "2025 IACR status context",
        url: "https://www.iacr.org/news/index.php?next=25200",
      },
    ],
  },
  {
    id: "simons-dtisp-interactive-proofs",
    title: "Interactive proofs for DTISP(t,s)",
    amount: 100,
    sponsor: "Yael Tauman Kalai",
    statement:
      "For computations in DTISP(t,s), construct interactive proofs with prover time polynomial in t and verifier time polynomial in s for the full parameter range stated by the proposer.",
    references: [
      {
        label: "2026 ECCC partial progress",
        url: "https://eccc.weizmann.ac.il/report/2026/102/",
      },
    ],
  },
  {
    id: "simons-three-linear-map",
    title: "A secure 3-linear map with unique encoding and no noise",
    amount: 1_000,
    sponsor: "Dan Boneh",
    statement:
      "Construct a 3-linear map with unique encodings, no noise and a plausibly hard discrete-logarithm problem, under the exact challenge description.",
    references: [
      {
        label: "Recent multilinear-map status survey",
        url: "https://www.research-collection.ethz.ch/server/api/core/bitstreams/e80e29c7-7973-4859-be93-d5d9b9d48de2/content",
      },
    ],
  },
  {
    id: "simons-szk-equals-pzk",
    title: "Does SZK equal PZK?",
    amount: 100,
    sponsor: "Shafi Goldwasser",
    statement:
      "Decide whether statistical zero knowledge equals perfect zero knowledge, equivalently by transforming every SZK proof into a PZK proof under the challenge’s formulation.",
    references: [
      {
        label: "2024 open-status discussion",
        url: "https://api.repository.cam.ac.uk/server/api/core/bitstreams/f71e3497-29b9-4f2d-b902-131e8a91ce6c/content",
      },
    ],
  },
];

const simons: PrizeProblemSource[] = simonsRows.map((row) => ({
  id: row.id,
  title: `Simons cryptography · ${row.title}`,
  family: "Institutional",
  collection: "Simons 2015 cryptography problems",
  type: "conjecture",
  field: "Cryptography",
  tags: ["theoretical cryptography", "complexity assumptions", "open problem"],
  statement: row.statement,
  openSince: 2015,
  openSincePrecision: "prize workshop listing",
  verification: "reconfirmation-needed",
  lastVerified: checked,
  rewards: [
    {
      label: `$${row.amount.toLocaleString("en-US")}`,
      amount: row.amount,
      currency: "USD",
      sponsor: row.sponsor,
      certainty: "personal",
      terms: simonsTerms,
      sourceUrl: simonsSource,
      note: "The mathematical target remains open; direct sponsor confirmation of the symbolic offer is recommended.",
    },
  ],
  sourceLabel: "Official Simons Institute workshop page",
  sourceUrl: simonsSource,
  references: row.references,
}));

export const expandedSponsoredProblems: PrizeProblemSource[] = [
  sCombinator,
  ...nanongkai,
  ...talagrand,
  ...scott,
  length72,
  ...simons,
];
