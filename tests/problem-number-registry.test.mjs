import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const EXPECTED_REGISTRY_HASH =
  "a8ad45cd63bde896ab0f24817699b1367e8fe8b205db52337cbbabba57d068e8";

test("locks the randomized 177-entry launch PPL assignments", () => {
  const source = readFileSync(
    new URL("../app/data/problem-numbers.ts", import.meta.url),
    "utf8",
  );
  const entries = Array.from(
    source.matchAll(/^\s+"([^"]+)":\s+(\d+),$/gm),
    (match) => [match[1], Number(match[2])],
  );

  assert.ok(entries.length >= 177);
  assert.deepEqual(
    entries.map(([, number]) => number).sort((a, b) => a - b),
    Array.from({ length: entries.length }, (_, index) => index + 1),
  );

  const canonicalRegistry = entries
    .filter(([, number]) => number <= 177)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([slug, number]) => `${slug}:${number}`)
    .join("\n");
  const registryHash = createHash("sha256")
    .update(canonicalRegistry)
    .digest("hex");

  assert.equal(
    registryHash,
    EXPECTED_REGISTRY_HASH,
    "A randomized launch-baseline PPL assignment changed. Append new entries; never reshuffle, renumber, or reuse an ID.",
  );
  assert.ok(canonicalRegistry.includes("krenn-inherited-vertex-coloring:7"));
  assert.ok(canonicalRegistry.includes("erdos-104:77"));
  assert.ok(canonicalRegistry.includes("erdos-1029:27"));
  assert.match(source, /ppl-fixed-random-v1:900b2e4e9f95b19f6e889221aa2b0e8d7b73dbb4/);
});
