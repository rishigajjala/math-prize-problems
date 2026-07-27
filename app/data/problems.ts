import erdosRows from "./erdos.json";
import { expandedComputationalProblems } from "./expanded-computational";
import { expandedPersonalProblems } from "./expanded-personal";
import { expandedSponsoredProblems } from "./expanded-sponsored";
import { PROBLEM_NUMBERS, catalogSlug } from "./problem-numbers";

export type Verification =
  | "verified"
  | "source-stated"
  | "renewal-pending"
  | "reconfirmation-needed";
export type Certainty = "institutional" | "documented" | "conditional" | "personal";

export type RewardOffer = {
  label: string;
  amount: number;
  currency: string;
  sponsor: string;
  certainty: Certainty;
  terms: string;
  sourceUrl: string;
  rulesUrl?: string;
  expires?: string;
  note?: string;
};

export type PrizeProblemSource = {
  id: string;
  title: string;
  family: "Institutional" | "Erdős" | "Independent";
  collection?: string;
  type: "conjecture" | "existence" | "computational target" | "verification challenge";
  field: string;
  tags: string[];
  statement: string;
  context?: string;
  openSince: number | null;
  openSincePrecision: string;
  openSinceNote?: string;
  verification: Verification;
  lastVerified: string;
  rewards: RewardOffer[];
  sourceLabel: string;
  sourceUrl: string;
  rulesUrl?: string;
  references?: Array<{
    label: string;
    url: string;
  }>;
  oeis?: string[];
};

export type PrizeProblem = PrizeProblemSource & {
  readonly catalogNumber: number;
};

const clayTerms =
  "Clay does not accept direct submissions. A proposed solution must be published in a qualifying outlet, at least two years must pass, and the work must gain general acceptance in the mathematics community while resolving the complete official formulation.";

const clayReward = (sourceUrl: string): RewardOffer => ({
  label: "$1,000,000",
  amount: 1_000_000,
  currency: "USD",
  sponsor: "Clay Mathematics Institute",
  certainty: "institutional",
  terms: clayTerms,
  sourceUrl,
  rulesUrl: "https://www.claymath.org/millennium-problems/rules/",
});

const millennium: PrizeProblemSource[] = [
  {
    id: "riemann-hypothesis",
    title: "Riemann hypothesis",
    family: "Institutional",
    type: "conjecture",
    field: "Number theory",
    tags: ["analytic number theory", "prime numbers", "zeta function"],
    statement: "Every non-trivial zero of the Riemann zeta function has real part 1/2.",
    context:
      "A statement about the hidden order in the prime numbers, and the oldest problem in this index.",
    openSince: 1859,
    openSincePrecision: "exact",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [clayReward("https://www.claymath.org/millennium/Riemann-Hypothesis/")],
    sourceLabel: "Official Clay problem page",
    sourceUrl: "https://www.claymath.org/millennium/Riemann-Hypothesis/",
    rulesUrl: "https://www.claymath.org/millennium-problems/rules/",
  },
  {
    id: "hodge-conjecture",
    title: "Hodge conjecture",
    family: "Institutional",
    type: "conjecture",
    field: "Algebraic geometry",
    tags: ["topology", "algebraic cycles", "complex geometry"],
    statement:
      "On a smooth projective complex algebraic variety, every rational Hodge class should be a rational linear combination of classes of algebraic cycles.",
    openSince: 1950,
    openSincePrecision: "exact",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [clayReward("https://www.claymath.org/millennium/hodge-conjecture/")],
    sourceLabel: "Official Clay problem page",
    sourceUrl: "https://www.claymath.org/millennium/hodge-conjecture/",
    rulesUrl: "https://www.claymath.org/millennium-problems/rules/",
  },
  {
    id: "birch-swinnerton-dyer",
    title: "Birch–Swinnerton-Dyer conjecture",
    family: "Institutional",
    type: "conjecture",
    field: "Number theory",
    tags: ["elliptic curves", "arithmetic geometry", "L-functions"],
    statement:
      "For an elliptic curve over the rationals, the order of vanishing of its L-function at s = 1 should equal the rank of its group of rational points.",
    openSince: 1965,
    openSincePrecision: "approximate",
    openSinceNote: "Developed in the early 1960s; 1965 is used as the canonical published date.",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [
      clayReward(
        "https://www.claymath.org/millennium/birch-and-swinnerton-dyer-conjecture/",
      ),
    ],
    sourceLabel: "Official Clay problem page",
    sourceUrl:
      "https://www.claymath.org/millennium/birch-and-swinnerton-dyer-conjecture/",
    rulesUrl: "https://www.claymath.org/millennium-problems/rules/",
  },
  {
    id: "p-versus-np",
    title: "P versus NP",
    family: "Institutional",
    type: "conjecture",
    field: "Theoretical computer science",
    tags: ["complexity theory", "algorithms", "computation"],
    statement:
      "If a solution can be checked efficiently, can it also be found efficiently? Equivalently: is P equal to NP?",
    openSince: 1971,
    openSincePrecision: "exact",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [clayReward("https://www.claymath.org/millennium/p-vs-np/")],
    sourceLabel: "Official Clay problem page",
    sourceUrl: "https://www.claymath.org/millennium/p-vs-np/",
    rulesUrl: "https://www.claymath.org/millennium-problems/rules/",
  },
  {
    id: "navier-stokes",
    title: "Navier–Stokes existence and smoothness",
    family: "Institutional",
    type: "existence",
    field: "Partial differential equations",
    tags: ["fluid dynamics", "analysis", "mathematical physics"],
    statement:
      "Resolve global existence and smoothness for the three-dimensional incompressible Navier–Stokes equations under the official conditions, or exhibit finite-time breakdown.",
    openSince: 1934,
    openSincePrecision: "historical modern form",
    openSinceNote:
      "The equations date to the 1820s–1840s; 1934 marks Leray’s modern 3D regularity question. The exact Clay formulation is from 2000.",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [clayReward("https://www.claymath.org/millennium/Navier-Stokes-Equation/")],
    sourceLabel: "Official Clay problem page",
    sourceUrl: "https://www.claymath.org/millennium/Navier-Stokes-Equation/",
    rulesUrl: "https://www.claymath.org/millennium-problems/rules/",
  },
  {
    id: "yang-mills",
    title: "Yang–Mills existence and mass gap",
    family: "Institutional",
    type: "existence",
    field: "Mathematical physics",
    tags: ["quantum field theory", "gauge theory", "analysis"],
    statement:
      "For every compact simple gauge group, construct a non-trivial quantum Yang–Mills theory on four-dimensional space that satisfies the official axioms and has a positive mass gap.",
    openSince: 2000,
    openSincePrecision: "canonical formulation",
    openSinceNote:
      "Yang–Mills theory began in 1954; the precise prize problem used for age sorting was formulated in 2000.",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [clayReward("https://www.claymath.org/millennium/yang-mills-the-maths-gap/")],
    sourceLabel: "Official Clay problem page",
    sourceUrl: "https://www.claymath.org/millennium/yang-mills-the-maths-gap/",
    rulesUrl: "https://www.claymath.org/millennium-problems/rules/",
  },
];

const institutional: PrizeProblemSource[] = [
  ...millennium,
  {
    id: "beal-conjecture",
    title: "Beal conjecture",
    family: "Institutional",
    type: "conjecture",
    field: "Number theory",
    tags: ["Diophantine equations", "Fermat-type equations", "prime factors"],
    statement:
      "If Aˣ + Bʸ = Cᶻ for positive integers with x, y and z all greater than 2, then A, B and C must have a common prime factor.",
    openSince: 1993,
    openSincePrecision: "exact",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [
      {
        label: "$1,000,000",
        amount: 1_000_000,
        currency: "USD",
        sponsor: "D. Andrew Beal / American Mathematical Society",
        certainty: "institutional",
        terms:
          "A proof or counterexample must be complete and published in a respected refereed mathematics journal. Unpublished manuscripts cannot be submitted directly to the AMS.",
        sourceUrl: "https://www.bealconjecture.com/",
        rulesUrl: "https://www.ams.org/profession/prizes-awards/ams-supported/beal-prize-rules",
      },
    ],
    sourceLabel: "Official Beal Conjecture site",
    sourceUrl: "https://www.bealconjecture.com/",
    rulesUrl: "https://www.ams.org/profession/prizes-awards/ams-supported/beal-prize-rules",
  },
  {
    id: "collatz-conjecture",
    title: "Collatz conjecture",
    family: "Institutional",
    type: "conjecture",
    field: "Number theory",
    tags: ["dynamical systems", "iteration", "integers"],
    statement:
      "Starting from any positive integer, repeatedly halve it when even and replace it by 3n + 1 when odd. Must the sequence always reach 1?",
    openSince: 1937,
    openSincePrecision: "usual attribution",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [
      {
        label: "¥120,000,000",
        amount: 120_000_000,
        currency: "JPY",
        sponsor: "Bakuage Co., Ltd.",
        certainty: "conditional",
        terms:
          "Proof or disproof must appear in a qualifying journal, then stand for at least two years and gain broad acceptance. The host retains discretion over consideration, the winner and full or partial payment.",
        sourceUrl: "https://mathprize.net/posts/collatz-conjecture/",
        rulesUrl: "https://mathprize.net/files/collatz-conjecture-rule-en-20210707.pdf",
        expires: "2031-07-06",
        note: "The legal terms allow amendment or withdrawal and make payment discretionary.",
      },
      {
        label: "€1,000",
        amount: 1_000,
        currency: "EUR",
        sponsor: "Ingo Althöfer",
        certainty: "personal",
        terms:
          "First solution of the ordinary 3n+1 conjecture. Computer-assisted proofs are allowed; legal recourse is excluded. The sponsor’s page gives a deadline of 31 December 2037.",
        sourceUrl: "https://althofer.de/collatz-prizes.html",
        rulesUrl: "https://althofer.de/collatz-prizes.html",
        expires: "2037-12-31",
      },
    ],
    sourceLabel: "Official prize page",
    sourceUrl: "https://mathprize.net/posts/collatz-conjecture/",
    rulesUrl: "https://mathprize.net/files/collatz-conjecture-rule-en-20210707.pdf",
  },
  {
    id: "prime-100m-digits",
    title: "Find a 100-million-digit prime",
    family: "Institutional",
    type: "computational target",
    field: "Computational number theory",
    tags: ["prime numbers", "distributed computing", "certification"],
    statement:
      "Be the first to identify and reproducibly certify a prime number with at least 100,000,000 decimal digits.",
    openSince: 1999,
    openSincePrecision: "program launch",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [
      {
        label: "$150,000",
        amount: 150_000,
        currency: "USD",
        sponsor: "Electronic Frontier Foundation",
        certainty: "institutional",
        terms:
          "A probable prime is not enough. The method, algorithm, source and hardware must be disclosed; the result must be reproducible, peer reviewed in an approved journal and independently verifiable.",
        sourceUrl: "https://www.eff.org/awards/coop",
        rulesUrl: "https://www.eff.org/awards/coop/rules",
      },
      {
        label: "$50,000 participant share",
        amount: 50_000,
        currency: "USD",
        sponsor: "GIMPS",
        certainty: "conditional",
        terms:
          "For a qualifying GIMPS participant only, if the discovery is independently verified and the EFF pays its award to GIMPS. This is an allocation of the EFF award, not an additional $50,000 on top of $150,000.",
        sourceUrl: "https://www.mersenne.org/legal/",
        rulesUrl: "https://www.mersenne.org/legal/",
        note: "Linked, non-stackable participant allocation.",
      },
    ],
    sourceLabel: "EFF Cooperative Computing Awards",
    sourceUrl: "https://www.eff.org/awards/coop",
    rulesUrl: "https://www.eff.org/awards/coop/rules",
  },
  {
    id: "prime-1b-digits",
    title: "Find a one-billion-digit prime",
    family: "Institutional",
    type: "computational target",
    field: "Computational number theory",
    tags: ["prime numbers", "distributed computing", "certification"],
    statement:
      "Be the first to identify and reproducibly certify a prime number with at least 1,000,000,000 decimal digits.",
    openSince: 1999,
    openSincePrecision: "program launch",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [
      {
        label: "$250,000",
        amount: 250_000,
        currency: "USD",
        sponsor: "Electronic Frontier Foundation",
        certainty: "institutional",
        terms:
          "A probable prime is not enough. The method, algorithm, source and hardware must be disclosed; the result must be reproducible, peer reviewed in an approved journal and independently verifiable.",
        sourceUrl: "https://www.eff.org/awards/coop",
        rulesUrl: "https://www.eff.org/awards/coop/rules",
      },
    ],
    sourceLabel: "EFF Cooperative Computing Awards",
    sourceUrl: "https://www.eff.org/awards/coop",
    rulesUrl: "https://www.eff.org/awards/coop/rules",
  },
  {
    id: "next-mersenne-prime",
    title: "Discover the next qualifying Mersenne prime",
    family: "Institutional",
    type: "computational target",
    field: "Computational number theory",
    tags: ["Mersenne primes", "distributed computing", "GIMPS"],
    statement:
      "Through GIMPS, discover a new Mersenne prime 2ᵖ − 1 below 100 million decimal digits and satisfy the program’s verification rules.",
    openSince: 2024,
    openSincePrecision: "current search cycle",
    openSinceNote:
      "The research-discovery reward program dates to 2008; the current target renewed after the 52nd known Mersenne prime was found in October 2024.",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [
      {
        label: "$3,000",
        amount: 3_000,
        currency: "USD",
        sponsor: "GIMPS / Mersenne Research, Inc.",
        certainty: "conditional",
        terms:
          "Requires authorized PrimeNet participation, complete evidence and data, independent verification and compliance with disclosure and announcement rules. The amount may be changed up to $5,000.",
        sourceUrl: "https://www.mersenne.org/",
        rulesUrl: "https://www.mersenne.org/legal/",
        note: "Paid from funds remaining after operating expenses; terms permit adjustment.",
      },
    ],
    sourceLabel: "Official GIMPS site",
    sourceUrl: "https://www.mersenne.org/",
    rulesUrl: "https://www.mersenne.org/legal/",
  },
  {
    id: "iut-challenger",
    title: "IUT Challenger Prize",
    family: "Institutional",
    type: "verification challenge",
    field: "Arithmetic geometry",
    tags: ["IUT theory", "abc conjecture", "proof verification"],
    statement:
      "Publish the first qualifying paper that demonstrates an essential and inherent flaw in Shinichi Mochizuki’s inter-universal Teichmüller theory.",
    openSince: 2023,
    openSincePrecision: "challenge launch",
    openSinceNote:
      "This is a falsification challenge about IUT, not a direct prize for proving or disproving the abc conjecture.",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [
      {
        label: "$1,000,000",
        amount: 1_000_000,
        currency: "USD",
        sponsor: "Nobuo Kawakami",
        certainty: "personal",
        terms:
          "The paper must be peer reviewed and accepted by a qualifying MathSciNet-indexed journal. Kawakami is the sole final adjudicator and the evaluation method is not disclosed.",
        sourceUrl: "https://zen.ac.jp/en/lp/icp",
        rulesUrl: "https://zen.ac.jp/en/lp/icp",
        note: "Private adjudication with opaque criteria; community status is disputed.",
      },
    ],
    sourceLabel: "Official challenge page",
    sourceUrl: "https://zen.ac.jp/en/lp/icp",
  },
];

const kcikReward = (): RewardOffer => ({
  label: "≈€2,026",
  amount: 2_026,
  currency: "EUR",
  sponsor: "National Quantum Information Centre (KCIK)",
  certainty: "conditional",
  terms:
    "The standing rule says every unsolved problem automatically reopens for the next year with the same rules and an award equal to that year in euros. The live intake page is stale at €2,023 and a January 2024 deadline, so the €2,026 value is formula-derived and current submission terms must be confirmed with KCIK.",
  sourceUrl: "https://kcik.ug.edu.pl/kcik-awards/",
  rulesUrl: "https://kcik.ug.edu.pl/wp-content/uploads/2021/12/2002.03233.pdf",
  note: "Nominally active under the automatic-renewal clause; 2026 intake details are unconfirmed.",
});

const krennAndKcik: PrizeProblemSource[] = [
  {
    id: "krenn-inherited-vertex-coloring",
    title: "Krenn-Gu conjecture",
    family: "Independent",
    type: "conjecture",
    field: "Graph theory",
    tags: ["perfect matchings", "quantum information", "edge coloring"],
    statement:
      "Resolve the Krenn-Gu conjecture on monochromatic inherited vertex colorings of edge-colored weighted graphs—either by proof or counterexample.",
    context:
      "The problem emerged from graph-theoretic models of quantum interference. Several substantial special cases are known, but the general conjecture remains open.",
    openSince: 2018,
    openSincePrecision: "first public formulation",
    openSinceNote: "First public MathOverflow formulation: 24 September 2018. Reward announced in 2019.",
    verification: "verified",
    lastVerified: "2026-07-26",
    rewards: [
      {
        label: "€3,000",
        amount: 3_000,
        currency: "EUR",
        sponsor: "Mario Krenn and Dominik Leitner",
        certainty: "personal",
        terms:
          "The first proof or counterexample wins. A proof must appear in a respected peer-reviewed journal; a counterexample must be confirmable, for example by software.",
        sourceUrl: "https://mariokrenn.wordpress.com/graph-theory-question/",
      },
    ],
    sourceLabel: "Sponsor’s live problem page",
    sourceUrl: "https://mariokrenn.wordpress.com/graph-theory-question/",
  },
  {
    id: "kcik-sic-povm",
    title: "KCIK #1 · SIC-POVM dimensions",
    family: "Independent",
    type: "existence",
    field: "Quantum information",
    tags: ["SIC-POVM", "quantum measurements", "algebra"],
    statement:
      "Give an infinite sequence of dimensions with explicit symmetric informationally complete generalized quantum measurements, or prove that only finitely many such dimensions exist.",
    openSince: 2020,
    openSincePrecision: "exact prize formulation",
    verification: "renewal-pending",
    lastVerified: "2026-07-26",
    rewards: [kcikReward()],
    sourceLabel: "KCIK Golden Award page",
    sourceUrl: "https://kcik.ug.edu.pl/kcik-awards/",
  },
  {
    id: "kcik-mub-d6",
    title: "KCIK #2 · Mutually unbiased bases in dimension 6",
    family: "Independent",
    type: "existence",
    field: "Quantum information",
    tags: ["mutually unbiased bases", "dimension six", "linear algebra"],
    statement:
      "Find four mutually unbiased bases in dimension 6, or prove that there are no seven mutually unbiased bases in that dimension.",
    openSince: 2020,
    openSincePrecision: "exact prize formulation",
    verification: "renewal-pending",
    lastVerified: "2026-07-26",
    rewards: [kcikReward()],
    sourceLabel: "KCIK Golden Award page",
    sourceUrl: "https://kcik.ug.edu.pl/kcik-awards/",
  },
  {
    id: "kcik-npt-bound-entanglement",
    title: "KCIK #4 · NPT bound entanglement",
    family: "Independent",
    type: "existence",
    field: "Quantum information",
    tags: ["bound entanglement", "partial transpose", "quantum states"],
    statement: "Determine whether bound-entangled states with negative partial transpose exist.",
    openSince: 2020,
    openSincePrecision: "exact prize formulation",
    verification: "renewal-pending",
    lastVerified: "2026-07-26",
    rewards: [kcikReward()],
    sourceLabel: "KCIK Golden Award page",
    sourceUrl: "https://kcik.ug.edu.pl/kcik-awards/",
  },
  {
    id: "kcik-werner-state",
    title: "KCIK #5 · Two-copy non-distillability",
    family: "Independent",
    type: "conjecture",
    field: "Quantum information",
    tags: ["Werner states", "distillability", "ququarts"],
    statement:
      "Show that the symmetric two-ququart Werner state whose partial transpose is proportional to a unitary operator is two-copy non-distillable.",
    openSince: 2020,
    openSincePrecision: "exact prize formulation",
    verification: "renewal-pending",
    lastVerified: "2026-07-26",
    rewards: [kcikReward()],
    sourceLabel: "KCIK Golden Award page",
    sourceUrl: "https://kcik.ug.edu.pl/kcik-awards/",
  },
];

const shallitSource = "https://cs.uwaterloo.ca/~shallit/Talks/bc4.pdf";
const shallitRules = "https://cs.uwaterloo.ca/~shallit/talks.html";

const shallitRows: Array<{
  n: number;
  title: string;
  amount: number;
  statement: string;
  year: number;
  field?: string;
}> = [
  {
    n: 1,
    title: "Improve the separating-words upper bound",
    amount: 100,
    statement:
      "Improve Robson’s O(n²⁄⁵(log n)³⁄⁵) upper bound on the number of DFA states needed in the worst case to separate two distinct length-n words.",
    year: 1989,
  },
  {
    n: 2,
    title: "Tight bounds for CFG word separation",
    amount: 10,
    statement:
      "Find matching upper and lower bounds for the number of productions needed by a Chomsky-normal-form context-free grammar to separate equal-length words.",
    year: 1999,
  },
  {
    n: 3,
    title: "NFA separating-word bounds",
    amount: 50,
    statement:
      "Find strong asymptotic bounds on the smallest nondeterministic finite automaton separating any two distinct words of length n.",
    year: 2014,
  },
  {
    n: 4,
    title: "DFA versus NFA separation gap",
    amount: 50,
    statement:
      "Find good bounds on the worst-case ratio between deterministic and nondeterministic state complexity for separating two words.",
    year: 2014,
  },
  {
    n: 5,
    title: "Reversal gap for separating words",
    amount: 10,
    statement:
      "Is the change in deterministic separating complexity between a pair of words and their reversals unbounded?",
    year: 2014,
  },
  {
    n: 6,
    title: "Context-free language interpolation",
    amount: 100,
    statement:
      "Given context-free L₁ ⊆ L₂ with infinite difference, must there be a context-free L₃ strictly interpolating them with both remaining differences infinite?",
    year: 1980,
  },
  {
    n: 7,
    title: "Are primitive binary words context-free?",
    amount: 200,
    statement:
      "Determine whether the language of primitive—non-power—words over the binary alphabet is context-free.",
    year: 2014,
  },
  {
    n: 8,
    title: "A ternary sequence with nonzero Hankel determinants",
    amount: 100,
    statement:
      "Does an infinite sequence on three real values exist for which every Hankel determinant of every order is nonzero?",
    year: 2014,
  },
  {
    n: 9,
    title: "Nonzero Hankel determinants for a morphic word",
    amount: 50,
    statement:
      "Does the fixed point generated by 1→12, 2→23, 3→14, 4→32 have all of its Hankel determinants nonzero?",
    year: 2014,
  },
  {
    n: 11,
    title: "Is the Thue–Morse word prime under transduction?",
    amount: 20,
    statement:
      "Under finite-state transduction equivalence, is the Thue–Morse infinite word prime?",
    year: 2014,
  },
  {
    n: 12,
    title: "Kolakoski letter frequencies",
    amount: 100,
    statement:
      "Do the limiting frequencies of 1 and 2 exist in the Oldenburger–Kolakoski word, and are both equal to one half?",
    year: 1965,
  },
  {
    n: 13,
    title: "Prime acceptance by an automaton",
    amount: 50,
    statement:
      "Is it decidable whether a given base-k DFA accepts the representation of at least one prime number?",
    year: 2014,
  },
  {
    n: 14,
    title: "Divisibility and automata",
    amount: 50,
    statement:
      "Is it decidable whether a DFA over pairs of base-k digits accepts some pair of integers (x, y) with x dividing y?",
    year: 2013,
  },
  {
    n: 15,
    title: "NFA length-universality complexity",
    amount: 25,
    statement:
      "Given an NFA, decide whether it accepts every word of some length. The problem is PSPACE-hard; is it in PSPACE?",
    year: 2012,
  },
  {
    n: 16,
    title: "When is a finite language’s star infinite?",
    amount: 25,
    statement:
      "Determine the computational complexity of deciding, from a finite language L, whether L* is infinite.",
    year: 2014,
  },
  {
    n: 17,
    title: "Factor universality of a finite language",
    amount: 25,
    statement:
      "Determine the complexity of deciding whether every finite word occurs as a contiguous factor of a word in L*, for a finite list L.",
    year: 2012,
  },
  {
    n: 18,
    title: "Shortest forbidden factor bounds",
    amount: 200,
    statement:
      "Close the gap between quadratic lower examples and the doubly exponential upper bound for the shortest word missing from the factors of L*.",
    year: 2012,
  },
  {
    n: 19,
    title: "Pierce expansion length",
    amount: 200,
    statement:
      "Significantly improve either the known upper or lower bound for the maximum length of a Pierce expansion as a function of its numerator.",
    year: 2014,
  },
];

const shallit: PrizeProblemSource[] = shallitRows.map((row) => ({
  id: `shallit-${row.n}`,
  title: `Shallit #${row.n} · ${row.title}`,
  family: "Independent",
  type: "conjecture",
  field: row.field || "Formal languages",
  tags: ["automata theory", "theoretical computer science", "formal languages"],
  statement: row.statement,
  openSince: row.year,
  openSincePrecision: row.year === 2014 ? "source-stated by 2014" : "historical source",
  verification: "source-stated",
  lastVerified: "2026-07-26",
  rewards: [
    {
      label: `£${row.amount}`,
      amount: row.amount,
      currency: "GBP",
      sponsor: "Jeffrey Shallit",
      certainty: "personal",
      terms:
        "Personal cash offer stated in Shallit’s official talk. The live talks page records subsequent updates, including a paid solution to one omitted problem; confirm claim procedure with the sponsor before relying on the award.",
      sourceUrl: shallitSource,
      rulesUrl: shallitRules,
    },
  ],
  sourceLabel: "Sponsor’s official problem slides",
  sourceUrl: shallitSource,
  rulesUrl: shallitRules,
}));

type ErdosRow = {
  id: string;
  title: string;
  family: "Erdős";
  type: "conjecture";
  field: string;
  tags: string[];
  statement: string;
  context?: string;
  openSince: number | null;
  openSincePrecision: string;
  prizeAmount: number;
  prizeCurrency: string;
  prizeLabel: string;
  sponsor: string;
  paymentCertainty: Certainty;
  verification: Verification;
  lastVerified: string;
  terms: string;
  sourceUrl: string;
  rulesUrl: string;
  sourceLabel: string;
  oeis?: string[];
};

const erdosFieldNames: Record<string, string> = {
  "Additive Combinatorics": "Additive combinatorics",
  "Graph Theory": "Graph theory",
  "Number Theory": "Number theory",
  "Primitive Sets": "Primitive sets",
  "Set Theory": "Set theory",
};

const erdos: PrizeProblemSource[] = (erdosRows as ErdosRow[]).map((row) => ({
  id: row.id,
  title: row.title,
  family: "Erdős",
  type: row.type,
  field: erdosFieldNames[row.field] || row.field,
  tags: row.tags,
  statement: row.statement,
  openSince: row.openSince,
  openSincePrecision: row.openSincePrecision,
  verification: row.verification,
  lastVerified: row.lastVerified,
  rewards: [
    {
      label: row.prizeLabel,
      amount: row.prizeAmount,
      currency: row.prizeCurrency,
      sponsor: row.sponsor,
      certainty: row.paymentCertainty,
      terms: row.terms,
      sourceUrl: row.sourceUrl,
      rulesUrl: row.rulesUrl,
    },
  ],
  sourceLabel: row.sourceLabel,
  sourceUrl: row.sourceUrl,
  rulesUrl: row.rulesUrl,
  oeis: row.oeis?.filter((value) => value.startsWith("A")),
}));

const problemSources: PrizeProblemSource[] = [
  ...institutional,
  ...krennAndKcik,
  ...shallit,
  ...erdos,
  ...expandedPersonalProblems,
  ...expandedComputationalProblems,
  ...expandedSponsoredProblems,
].sort((a, b) => a.title.localeCompare(b.title));

const sourceIds = new Set(problemSources.map((problem) => problem.id));
const registeredIds = Object.keys(PROBLEM_NUMBERS);
const registeredNumbers = Object.values(PROBLEM_NUMBERS);

if (
  sourceIds.size !== problemSources.length ||
  problemSources.some((problem) => /^\d{3}$/.test(problem.id)) ||
  registeredIds.length !== problemSources.length ||
  registeredIds.some((id) => !sourceIds.has(id)) ||
  new Set(registeredNumbers).size !== registeredNumbers.length ||
  registeredNumbers.some(
    (number) =>
      !Number.isInteger(number) || number < 1 || number > problemSources.length,
  )
) {
  throw new Error(
    "The permanent PPL number registry must contain each problem exactly once, use unique integers 1 through the catalog size, and reserve three-digit route IDs for PPL numbers.",
  );
}

export const problems: PrizeProblem[] = problemSources.map((problem) => ({
  ...problem,
  catalogNumber: PROBLEM_NUMBERS[problem.id],
})).sort((a, b) => a.catalogNumber - b.catalogNumber);

const problemsById = new Map<string, PrizeProblem>();

for (const problem of problems) {
  problemsById.set(problem.id, problem);
  problemsById.set(catalogSlug(problem.catalogNumber), problem);
}

export function getProblemById(id: string) {
  return problemsById.get(id);
}

export const fxToUsd: Record<string, number> = {
  USD: 1,
  EUR: 1.17,
  GBP: 1.34,
  JPY: 0.00675,
  INR: 0.0116,
  CAD: 0.73,
};

export function rewardUsd(offer: RewardOffer): number {
  return offer.amount * (fxToUsd[offer.currency] || 0);
}

export function topReward(problem: PrizeProblem): RewardOffer | null {
  if (!problem.rewards.length) return null;
  return [...problem.rewards].sort((a, b) => rewardUsd(b) - rewardUsd(a))[0];
}

export function topRewardUsd(problem: PrizeProblem): number {
  const reward = topReward(problem);
  return reward ? rewardUsd(reward) : 0;
}

export function referenceCount(problem: PrizeProblem): number {
  const urls = new Set<string>();
  urls.add(problem.sourceUrl);
  if (problem.rulesUrl) urls.add(problem.rulesUrl);
  problem.references?.forEach((reference) => urls.add(reference.url));
  problem.oeis?.forEach((sequence) => urls.add(`https://oeis.org/${sequence}`));
  problem.rewards.forEach((reward) => {
    urls.add(reward.sourceUrl);
    if (reward.rulesUrl) urls.add(reward.rulesUrl);
  });
  return urls.size;
}
