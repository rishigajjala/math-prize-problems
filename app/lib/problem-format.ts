import type { Certainty, PrizeProblem, Verification } from "../data/problems";
import { catalogSlug, formatCatalogId } from "../data/problem-numbers";

export const SITE_URL = "https://gajjala.in/math-prize-problems";
export const REPOSITORY_URL = "https://github.com/rishigajjala/math-prize-problems";
export const CATALOG_YEAR = 2026;
export { formatCatalogId };

export const verificationLabel: Record<Verification, string> = {
  verified: "Verified open",
  "source-stated": "Source-stated",
  "renewal-pending": "Renewal check",
  "reconfirmation-needed": "Reconfirm sponsor",
};

export const certaintyLabel: Record<Certainty, string> = {
  institutional: "Institutional",
  documented: "Documented",
  conditional: "Conditional",
  personal: "Personal offer",
};

export function ageLabel(problem: PrizeProblem) {
  if (!problem.openSince) return "Age unknown";
  const age = CATALOG_YEAR - problem.openSince;
  return `${age} ${age === 1 ? "year" : "years"} open`;
}

export function problemPath(problem: PrizeProblem) {
  return `/problems/${catalogSlug(problem.catalogNumber)}`;
}

export function correctionUrl(problem: PrizeProblem) {
  const catalogId = formatCatalogId(problem.catalogNumber);
  const params = new URLSearchParams({
    template: "correct-entry.yml",
    title: `Correction: ${catalogId} · ${problem.title}`,
    problem: `${SITE_URL}${problemPath(problem)}/`,
  });
  return `${REPOSITORY_URL}/issues/new?${params.toString()}`;
}

export function humanizeMath(value: string) {
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

export function metadataDescription(problem: PrizeProblem) {
  const reward = problem.rewards[0]?.label;
  const lead = reward ? `${reward} reward: ` : "";
  const description = `${lead}${humanizeMath(problem.statement)}`;
  return description.length > 158 ? `${description.slice(0, 155).trimEnd()}…` : description;
}
