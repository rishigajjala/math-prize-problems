import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const EXPECTED_REGISTRY_HASH =
  "af03a9a1ef8c988af811c392c171f48f3e28ac4d8ca642f18a92cce9ef74ef66";

test("locks the 177-entry launch PPL assignments", () => {
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
    "A launch-baseline PPL assignment changed. Append new entries; never renumber or reuse an ID.",
  );
  assert.ok(
    canonicalRegistry.includes("krenn-inherited-vertex-coloring:109"),
  );
  assert.ok(canonicalRegistry.includes("erdos-104:51"));
  assert.ok(canonicalRegistry.includes("erdos-1029:82"));
});
