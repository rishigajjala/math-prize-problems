import type { PrizeProblem, RewardOffer } from "./problems";

const checked = "2026-07-27";

const kimberlingSource = "https://faculty.evansville.edu/ck6/integer/unsolved.html";
const kimberlingTerms =
  "Be first to publish a solution in a refereed journal, or submit a short proof that Kimberling accepts as correct and complete. For solutions after 1 January 2025, Kimberling says the stated amount will be donated in the solver’s name to the Online Encyclopedia of Integer Sequences; it is not direct cash to the solver.";

const kimberlingReward = (
  label: string,
  amount: number,
  terms = kimberlingTerms,
): RewardOffer => ({
  label,
  amount,
  currency: "USD",
  sponsor: "Clark Kimberling",
  certainty: "personal",
  terms,
  sourceUrl: kimberlingSource,
  note: "Current post-2025 form: a donation to OEIS in the solver’s name.",
});

const kimberling: PrizeProblem[] = [
  {
    id: "kimberling-kolakoski-five",
    title: "Kimberling #1 · Five Oldenburger–Kolakoski questions",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "conjecture",
    field: "Combinatorics on words",
    tags: ["Kolakoski sequence", "run lengths", "integer sequences"],
    statement:
      "Settle any one of five questions about the Oldenburger–Kolakoski sequence: find a formula for its nth term; prove recurrence of every occurring finite word; prove reversal closure; prove closure under swapping 1 and 2; or prove that the limiting frequency of 1 exists and equals one half.",
    context:
      "This is one shared $200 offer for resolving any one of the five questions, not five independently payable awards.",
    openSince: 1965,
    openSincePrecision: "modern problem source",
    openSinceNote:
      "Oldenburger discussed the sequence in 1939; Kolakoski independently posed the modern self-generating-runs problem in 1965. The five-question reward formulation is later.",
    verification: "verified",
    lastVerified: checked,
    rewards: [kimberlingReward("$200 shared offer", 200)],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
    references: [
      {
        label: "Five-question formulation",
        url: "https://www.math.buffalo.edu/~sww/0papers/million.buck.problems.mi.pdf",
      },
    ],
    oeis: ["A000002"],
  },
  {
    id: "kimberling-sequence-surjectivity",
    title: "Kimberling #2 · Does the Kimberling sequence contain every integer?",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "conjecture",
    field: "Number theory",
    tags: ["integer sequences", "surjectivity", "recurrence"],
    statement:
      "Prove or disprove that every positive integer occurs in the sequence beginning 1, 3, 5, 4, 10, 7, 15, 8, 20, 9, 18, 24, 31, 14, 28, ….",
    openSince: 1991,
    openSincePrecision: "original published problem",
    verification: "verified",
    lastVerified: checked,
    rewards: [kimberlingReward("$300", 300)],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
  },
  {
    id: "kimberling-hard-count",
    title: "Kimberling #4 · A Hard Count",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "conjecture",
    field: "Combinatorics",
    tags: ["self-descriptive process", "integer sequences", "iteration"],
    statement:
      "In Kimberling’s iterative counting process, prove or disprove that every positive integer is eventually written; the general form allows any finite positive initial count with distinct labels.",
    openSince: 1998,
    openSincePrecision: "original published special case",
    verification: "verified",
    lastVerified: checked,
    rewards: [kimberlingReward("$100", 100)],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
  },
  {
    id: "kimberling-curve-closest-sphere",
    title: "Kimberling #10 · Curve closest to a sphere",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "existence",
    field: "Geometry",
    tags: ["sphere", "closed curves", "optimization"],
    statement:
      "Find and prove optimal parametric equations for a simple closed curve of length 4π on the unit sphere that minimizes mean spherical distance from the sphere to the curve; ideally solve the version for every length L > 2π.",
    openSince: null,
    openSincePrecision: "date not stated by sponsor",
    verification: "verified",
    lastVerified: checked,
    rewards: [
      kimberlingReward(
        "$50–$100",
        100,
        `${kimberlingTerms} The page lists “$50 or $100”; the applicable amount depends on whether the special or general version is resolved and should be confirmed with the sponsor.`,
      ),
    ],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
  },
  {
    id: "kimberling-run-length-segments",
    title: "Kimberling #11 · Run-length segment containment",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "conjecture",
    field: "Combinatorics on words",
    tags: ["run lengths", "binary words", "integer sequences"],
    statement:
      "For the unique nontrivial binary sequence s with s(1)=1 and r(r(s))=s, prove or disprove that every finite segment of its run-length sequence r(s) also occurs in s.",
    openSince: 1997,
    openSincePrecision: "original published problem",
    verification: "verified",
    lastVerified: checked,
    rewards: [kimberlingReward("$75", 75)],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
    oeis: ["A025142", "A025143"],
  },
  {
    id: "kimberling-prime-separator-bounded-gaps",
    title: "Kimberling #12 · Prime-separator first-row gaps",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime separator array", "bounded gaps", "integer sequences"],
    statement:
      "In Kimberling’s prime-separator array, prove or disprove that the successive differences in the first row are bounded.",
    openSince: 2007,
    openSincePrecision: "sequence-record date",
    verification: "verified",
    lastVerified: checked,
    rewards: [kimberlingReward("$25", 25)],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
    oeis: ["A129258", "A129259"],
  },
  ...[
    {
      suffix: "a-positive-surjective",
      title: "a(k) visits every positive integer",
      statement:
        "Prove or refute that the self-generated sequence a(k) in Kimberling’s two-sequence algorithm runs through all positive integers.",
    },
    {
      suffix: "d-integer-surjective",
      title: "d(k) visits every integer",
      statement:
        "Prove or refute that the companion difference sequence d(k) in Kimberling’s two-sequence algorithm runs through all integers.",
    },
    {
      suffix: "positive-d-return",
      title: "Positive d-values recur within three steps",
      statement:
        "Prove or refute that whenever d(k)>0, at least one of d(k+1), d(k+2), or d(k+3) is positive.",
    },
    {
      suffix: "negative-d-return",
      title: "Negative d-values recur within three steps",
      statement:
        "Prove or refute that whenever d(k)<0, at least one of d(k+1), d(k+2), or d(k+3) is negative.",
    },
  ].map(
    (row, index): PrizeProblem => ({
      id: `kimberling-13-${row.suffix}`,
      title: `Kimberling #13.${index + 1} · ${row.title}`,
      family: "Independent",
      collection: "Kimberling rewards",
      type: "conjecture",
      field: "Combinatorics",
      tags: ["self-generated sequences", "integer sequences", "recurrence"],
      statement: row.statement,
      openSince: 2007,
      openSincePrecision: "sequence-record date",
      verification: "verified",
      lastVerified: checked,
      rewards: [
        kimberlingReward(
          "$25 proof · $20 counterexample",
          25,
          `${kimberlingTerms} Each of the four propositions has its own $25 proof / $20 counterexample offer.`,
        ),
      ],
      sourceLabel: "Sponsor’s live rewards page",
      sourceUrl: kimberlingSource,
      oeis: ["A131388", "A131389"],
    }),
  ),
  {
    id: "kimberling-primes-every-row",
    title: "Kimberling #15 · Infinitely many primes in every row",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime-producing polynomials", "Bunyakovsky conjecture", "arrays"],
    statement:
      "Prove or disprove that every row of Kimberling’s triangular-number interspersion array contains infinitely many primes.",
    context:
      "The sponsor notes that the claim reaches the difficulty of the Bunyakovsky conjecture for irreducible integer polynomials.",
    openSince: 2011,
    openSincePrecision: "sequence-record date",
    verification: "verified",
    lastVerified: checked,
    rewards: [kimberlingReward("$50", 50)],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
    oeis: ["A000027", "A185787"],
  },
  {
    id: "kimberling-interlacing-triangles",
    title: "Kimberling #18 · Triangles with interlacing rows",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "conjecture",
    field: "Enumerative combinatorics",
    tags: ["triangular arrays", "interlacing", "enumeration"],
    statement:
      "Enumerate the arrangements of 1 through n(n+1)/2 in a triangular array such that every entry in a row lies between the two adjacent entries immediately below it.",
    openSince: null,
    openSincePrecision: "date not stated by sponsor",
    verification: "verified",
    lastVerified: checked,
    rewards: [kimberlingReward("$50", 50)],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
  },
  {
    id: "kimberling-special-numbers",
    title: "Kimberling #23 · Special linearly recurrent Beatty subsequences",
    family: "Independent",
    collection: "Kimberling rewards",
    type: "conjecture",
    field: "Number theory",
    tags: ["Beatty sequences", "linear recurrences", "Diophantine approximation"],
    statement:
      "Characterize the real numbers r for which the Beatty sequence floor(nr) contains a homogeneous linearly recurrent subsequence.",
    openSince: null,
    openSincePrecision: "date not stated by sponsor",
    verification: "verified",
    lastVerified: checked,
    rewards: [kimberlingReward("$50", 50)],
    sourceLabel: "Sponsor’s live rewards page",
    sourceUrl: kimberlingSource,
  },
];

const boyerSource = "http://www.multimagie.com/English/Enigmas.htm";
const boyerTerms =
  "The first person to construct the requested square, or prove it impossible where the enigma permits, wins the listed cash prize and a bottle of champagne. The sponsor’s page says eight prizes remain, totaling €6,500; confirm submission logistics before relying on the offer.";

const boyerReward = (amount: number): RewardOffer => ({
  label: `€${amount.toLocaleString("en-US")}`,
  amount,
  currency: "EUR",
  sponsor: "Christian Boyer",
  certainty: "personal",
  terms: boyerTerms,
  sourceUrl: boyerSource,
  note: "Sponsor page remains online but its last recorded winner update is from 2017.",
});

const boyerRows: Array<{
  id: string;
  number: string;
  title: string;
  amount: number;
  statement: string;
}> = [
  {
    id: "boyer-magic-square-squares",
    number: "1",
    title: "3×3 magic square using at least seven squares",
    amount: 1_000,
    statement:
      "Construct a 3×3 magic square containing at least seven distinct squared integers that is not a rotation, reflection, or square multiple of the sole known seven-square example; a full square of nine distinct squares also resolves the classical problem.",
  },
  {
    id: "boyer-bimagic-5",
    number: "2",
    title: "5×5 bimagic square with distinct positive integers",
    amount: 1_000,
    statement:
      "Construct a 5×5 square of distinct positive integers whose rows, columns and main diagonals have equal sums both before and after every entry is squared, or prove impossibility.",
  },
  {
    id: "boyer-semi-magic-cubes-3",
    number: "3",
    title: "3×3 semi-magic square of cubes",
    amount: 1_000,
    statement:
      "Construct, or prove impossible, a 3×3 semi-magic square using distinct positive cubed integers, with all row and column sums equal.",
  },
  {
    id: "boyer-magic-cubes-4",
    number: "4",
    title: "4×4 magic square of cubes",
    amount: 1_000,
    statement:
      "Construct, or prove impossible, a 4×4 magic square using distinct positive cubed integers.",
  },
  {
    id: "boyer-magic-cubes-5",
    number: "4a",
    title: "5×5 magic square of cubes",
    amount: 500,
    statement:
      "Construct, or prove impossible, a 5×5 magic square using distinct positive cubed integers.",
  },
  {
    id: "boyer-magic-cubes-6",
    number: "4b",
    title: "6×6 magic square of cubes",
    amount: 500,
    statement:
      "Construct, or prove impossible, a 6×6 magic square using distinct positive cubed integers.",
  },
  {
    id: "boyer-add-mult-5",
    number: "6",
    title: "5×5 additive–multiplicative magic square",
    amount: 1_000,
    statement:
      "Construct, or prove impossible, a 5×5 square of distinct positive integers whose rows, columns and main diagonals have both equal sums and equal products.",
  },
  {
    id: "boyer-add-mult-6",
    number: "6a",
    title: "6×6 additive–multiplicative magic square",
    amount: 500,
    statement:
      "Construct, or prove impossible, a 6×6 square of distinct positive integers whose rows, columns and main diagonals have both equal sums and equal products.",
  },
];

const boyer: PrizeProblem[] = boyerRows.map((row) => ({
  id: row.id,
  title: `Boyer enigma #${row.number} · ${row.title}`,
  family: "Independent",
  collection: "Boyer magic-square enigmas",
  type: "existence",
  field: "Recreational mathematics",
  tags: ["magic squares", "Diophantine equations", "construction"],
  statement: row.statement,
  openSince: 2010,
  openSincePrecision: "cash contest launched",
  verification: "reconfirmation-needed",
  lastVerified: checked,
  rewards: [boyerReward(row.amount)],
  sourceLabel: "Sponsor’s remaining-enigmas page",
  sourceUrl: boyerSource,
  references:
    row.id === "boyer-magic-square-squares"
      ? [
          {
            label: "Research status and examples",
            url: "https://www.multimagie.com/English/SquaresOfSquares.htm",
          },
        ]
      : undefined,
}));

const okhotinSource =
  "https://citeseerx.ist.psu.edu/document?doi=d0e62d472c289c617866fde28ff6dd32758a73c7&repid=rep1&type=pdf";
const okhotinTerms =
  "Okhotin’s 2010 author update raises the award for the first correct solution of each remaining problem to C$360 and says the original terms remain in force. Because the primary terms page has not been refreshed since 2010, confirm claim procedure with the sponsor.";

const okhotinRows = [
  {
    id: "okhotin-boolean-limitations",
    title: "Limitations of Boolean grammars",
    statement:
      "Are there languages recognized in O(n²) time by deterministic linear-bounded automata that cannot be specified by Boolean grammars?",
  },
  {
    id: "okhotin-space-complexity",
    title: "Sublinear space for Boolean-grammar languages",
    statement:
      "Are the languages generated by Boolean grammars contained in deterministic space O(n^(1−ε)) for some ε>0?",
  },
  {
    id: "okhotin-greibach-normal-form",
    title: "Greibach normal form for Boolean grammars",
    statement:
      "Does every Boolean grammar have an equivalent Boolean grammar in Greibach normal form?",
  },
  {
    id: "okhotin-complementation",
    title: "Complement closure of conjunctive languages",
    statement: "Is the family of languages generated by conjunctive grammars closed under complementation?",
  },
  {
    id: "okhotin-inherent-ambiguity",
    title: "Inherent ambiguity for Boolean grammars",
    statement: "Does any language exist that is inherently ambiguous with respect to Boolean grammars?",
  },
  {
    id: "okhotin-ll-hierarchy",
    title: "Collapse of the Boolean LL(k) hierarchy",
    statement:
      "Is there a fixed k₀ such that Boolean LL(k) grammars generate the same language family as Boolean LL(k₀) grammars for every k≥k₀?",
  },
  {
    id: "okhotin-nonterminal-complexity",
    title: "Bounded nonterminal complexity of Boolean grammars",
    statement:
      "Is there a universal constant k such that every Boolean-grammar language has a Boolean grammar using at most k nonterminal symbols?",
  },
];

const okhotin: PrizeProblem[] = okhotinRows.map((row) => ({
  id: row.id,
  title: `Okhotin · ${row.title}`,
  family: "Independent",
  collection: "Okhotin grammar problems",
  type: "conjecture",
  field: "Formal languages",
  tags: ["Boolean grammars", "conjunctive grammars", "theoretical computer science"],
  statement: row.statement,
  openSince: 2007,
  openSincePrecision: "original problem survey",
  verification: "reconfirmation-needed",
  lastVerified: checked,
  rewards: [
    {
      label: "C$360",
      amount: 360,
      currency: "CAD",
      sponsor: "Alexander Okhotin",
      certainty: "personal",
      terms: okhotinTerms,
      sourceUrl: okhotinSource,
    },
  ],
  sourceLabel: "Author’s 2010 seven-problem update",
  sourceUrl: okhotinSource,
  references: [
    {
      label: "2013 field survey",
      url: "https://doi.org/10.1016/j.cosrev.2013.06.001",
    },
    {
      label: "Current University of Turku profile",
      url: "https://www.utu.fi/en/people/alexander-okhotin",
    },
  ],
}));

const sunSquareSource = "https://maths.nju.edu.cn/~zwsun/Square-sum.pdf";
const sunPrimeSource = "https://maths.nju.edu.cn/~zwsun/Prime-AP.pdf";
const sunCoverSource = "https://maths.nju.edu.cn/~zwsun/Cover.pdf";
const sunMixedSource = "https://arxiv.org/abs/0901.3075";
const sunRepresentationsSource = "https://arxiv.org/abs/1211.1588";

const sunReward = (
  label: string,
  amount: number,
  sourceUrl: string,
  terms: string,
  sponsor = "Zhi-Wei Sun",
): RewardOffer => ({
  label,
  amount,
  currency: "USD",
  sponsor,
  certainty: "personal",
  terms,
  sourceUrl,
});

const sun: PrizeProblem[] = [
  {
    id: "sun-1-3-5",
    title: "Sun · The 1–3–5 conjecture",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["four squares", "representations", "quadratic forms"],
    statement:
      "Every nonnegative integer n can be written as x²+y²+z²+w² with nonnegative integers x,y,z,w such that x+3y+5z is itself a square.",
    openSince: 2016,
    openSincePrecision: "exact formulation date",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$1,350",
        1_350,
        sunSquareSource,
        "The official slides offer US$1,350 for the first solution of the conjecture.",
      ),
    ],
    sourceLabel: "Author’s official prize slides",
    sourceUrl: sunSquareSource,
    references: [
      {
        label: "2021 computational report",
        url: "https://doi.org/10.1016/j.jnt.2021.01.003",
      },
    ],
  },
  {
    id: "sun-24-conjecture",
    title: "Sun · The 24-conjecture",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["four squares", "representations", "perfect squares"],
    statement:
      "Every nonnegative integer n can be written as x²+y²+z²+w² with nonnegative integers x,y,z,w such that both x and x+24y are perfect squares.",
    openSince: 2017,
    openSincePrecision: "exact formulation date",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$2,400",
        2_400,
        sunSquareSource,
        "The official slides offer US$2,400 for the first proof.",
      ),
    ],
    sourceLabel: "Author’s official prize slides",
    sourceUrl: sunSquareSource,
  },
  {
    id: "sun-alternating-consecutive-primes",
    title: "Sun · Alternating sums of consecutive primes",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime numbers", "alternating sums", "prime bounds"],
    statement:
      "For every positive integer m, find consecutive primes pₖ,…,pₙ within Sun’s stated bounds whose alternating sum pₙ−pₙ₋₁+⋯+(−1)ⁿ⁻ᵏpₖ equals m.",
    openSince: 2012,
    openSincePrecision: "exact formulation date",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$1,000",
        1_000,
        sunPrimeSource,
        "The official slides offer US$1,000 for the first proof.",
      ),
    ],
    sourceLabel: "Author’s official prime-conjecture slides",
    sourceUrl: sunPrimeSource,
  },
  {
    id: "sun-prime-unit-fractions",
    title: "Sun · Prime-shifted unit fractions",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["unit fractions", "prime numbers", "Egyptian fractions"],
    statement:
      "For each positive rational r and each sign d∈{−1,+1}, prove that r is a finite sum of reciprocals 1/(qⱼ+d) using distinct primes qⱼ.",
    openSince: 2015,
    openSincePrecision: "exact formulation date",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$1,000",
        1_000,
        sunPrimeSource,
        "Sun’s official slides record a US$1,000 prize for the first correct proof.",
      ),
    ],
    sourceLabel: "Author’s official prime-conjecture slides",
    sourceUrl: sunPrimeSource,
  },
  {
    id: "sun-disjoint-coset-indices",
    title: "Sun · Indices of pairwise disjoint group cosets",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Group theory",
    tags: ["cosets", "finite index", "covering systems"],
    statement:
      "If a₁G₁,…,aₖGₖ are pairwise disjoint left cosets of finite-index subgroups of a group G, prove that gcd([G:Gᵢ],[G:Gⱼ])≥k for some i<j.",
    openSince: 2004,
    openSincePrecision: "exact formulation year",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$200",
        200,
        sunCoverSource,
        "The author’s official survey offers US$200 for a proof of Conjecture 4.2.",
      ),
    ],
    sourceLabel: "Author’s official covering-systems survey",
    sourceUrl: sunCoverSource,
  },
  {
    id: "sun-primes-triangular-representations",
    title: "Sun · Prime and triangular-number representations",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime numbers", "triangular numbers", "additive number theory"],
    statement:
      "Prove both that every natural number except 216 is a prime-or-zero plus a triangular number, and that every odd integer greater than 3 is a prime plus x(x+1) for some positive integer x—or give an explicit counterexample to either part.",
    openSince: 2008,
    openSincePrecision: "paper formulation",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$1,000 proof · $200 counterexample",
        1_000,
        sunMixedSource,
        "US$1,000 is offered for the first positive resolution of both parts; US$200 is offered for the first explicit counterexample to either part.",
      ),
    ],
    sourceLabel: "Author’s refereed-paper preprint",
    sourceUrl: sunMixedSource,
    references: [
      {
        label: "Original triangular-number paper",
        url: "https://arxiv.org/abs/0803.3737",
      },
    ],
  },
  {
    id: "sun-prime-two-fibonacci",
    title: "Sun · A prime plus two Fibonacci numbers",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime numbers", "Fibonacci numbers", "additive number theory"],
    statement:
      "Every integer n>4 is the sum of an odd prime and two positive Fibonacci numbers, with one of the Fibonacci numbers odd.",
    openSince: 2008,
    openSincePrecision: "exact formulation date",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$5,000 proof · $250 counterexample",
        5_000,
        sunMixedSource,
        "US$5,000 is offered for the first positive solution published in a well-known mathematical journal; US$250 for the first explicit counterexample that the author can verify by computer.",
      ),
    ],
    sourceLabel: "Author’s refereed-paper preprint",
    sourceUrl: sunMixedSource,
    oeis: ["A154257"],
  },
  {
    id: "sun-prime-pell",
    title: "Sun · A prime plus Pell numbers",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime numbers", "Pell numbers", "additive number theory"],
    statement:
      "Every integer n>5 is the sum of an odd prime, a Pell number and twice a Pell number; the two Pell numbers may both be required positive.",
    openSince: 2009,
    openSincePrecision: "exact formulation date",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$1,000 proof · $100 counterexample",
        1_000,
        sunMixedSource,
        "US$1,000 is offered for the first positive solution published in a well-known mathematical journal; US$100 for the first explicit counterexample that the author can verify by computer.",
      ),
    ],
    sourceLabel: "Author’s refereed-paper preprint",
    sourceUrl: sunMixedSource,
    oeis: ["A000129"],
  },
  {
    id: "sun-prime-fibonacci-catalan",
    title: "Hou–Zeng · A prime, Fibonacci number and Catalan number",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime numbers", "Fibonacci numbers", "Catalan numbers"],
    statement:
      "Every integer n>4 is the sum of an odd prime, a positive Fibonacci number and a Catalan number.",
    openSince: 2009,
    openSincePrecision: "exact formulation month",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$1,000 proof · $200 counterexample",
        1_000,
        sunMixedSource,
        "US$1,000 is offered for the first positive solution published in a well-known mathematical journal; US$200 for the first explicit counterexample that the sponsors can verify by computer.",
        "Qing-Hu Hou and Jiang Zeng",
      ),
    ],
    sourceLabel: "Prize terms in Sun’s paper",
    sourceUrl: sunMixedSource,
    oeis: ["A154404"],
  },
  {
    id: "sun-n-plus-k-primes",
    title: "Sun · Simultaneous primes n+k and n+k²",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime numbers", "polynomials", "Bertrand-type results"],
    statement:
      "For every integer n>1, there is an integer k with 0≤k<n such that both n+k and n+k² are prime.",
    openSince: 2012,
    openSincePrecision: "preprint formulation",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$100",
        100,
        sunRepresentationsSource,
        "The author’s 2017 paper version announced US$100 for the first solution.",
      ),
    ],
    sourceLabel: "Author’s 100-conjecture paper",
    sourceUrl: sunRepresentationsSource,
    oeis: ["A185636"],
  },
  {
    id: "sun-two-power-plus-remainder-prime",
    title: "Sun · Write n=k+m with 2ᵏ+m prime",
    family: "Independent",
    collection: "Zhi-Wei Sun prizes",
    type: "conjecture",
    field: "Number theory",
    tags: ["prime numbers", "powers of two", "representations"],
    statement:
      "For every integer n>1, prove that there is an integer k with 1≤k<n for which 2ᵏ+n−k is prime.",
    context:
      "A 2026 preprint establishes a positive-density result but does not settle the universal conjecture.",
    openSince: 2013,
    openSincePrecision: "exact public formulation year",
    verification: "source-stated",
    lastVerified: checked,
    rewards: [
      sunReward(
        "$1,000",
        1_000,
        sunRepresentationsSource,
        "The author’s 2017 paper version announced US$1,000 for the first solution.",
      ),
    ],
    sourceLabel: "Author’s representations paper",
    sourceUrl: sunRepresentationsSource,
    references: [
      {
        label: "2026 positive-density progress",
        url: "https://arxiv.org/abs/2605.15758",
      },
    ],
    oeis: ["A231201"],
  },
];

export const expandedPersonalProblems: PrizeProblem[] = [
  ...kimberling,
  ...boyer,
  ...okhotin,
  ...sun,
];
