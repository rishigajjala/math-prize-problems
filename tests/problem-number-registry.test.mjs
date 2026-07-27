import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const EXPECTED_REGISTRY_HASH =
  "6887d868ea19d1d657c90c40545125961a5a087164bfe6c6c0b754fd77576174";

test("keeps the original 177 permanent PPL assignments immutable", () => {
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
    "An existing PPL number changed. Append new entries; never renumber or reuse an ID.",
  );
  assert.ok(
    canonicalRegistry.includes("krenn-inherited-vertex-coloring:109"),
  );
});
