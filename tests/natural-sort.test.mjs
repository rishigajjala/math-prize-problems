import assert from "node:assert/strict";
import test from "node:test";
import { compareNaturalText } from "../app/lib/natural-sort.mjs";

test("sorts numbered titles naturally in the A–Z mode", () => {
  const erdosTitles = [
    "Erdős Problem #1029",
    "Erdős Problem #104",
    "Erdős Problem #20",
    "Erdős Problem #3",
  ];

  assert.deepEqual([...erdosTitles].sort(compareNaturalText), [
    "Erdős Problem #3",
    "Erdős Problem #20",
    "Erdős Problem #104",
    "Erdős Problem #1029",
  ]);

  assert.ok(
    compareNaturalText(
      "Kimberling #2 · Does the Kimberling sequence contain every integer?",
      "Kimberling #10 · Curve closest to a sphere",
    ) < 0,
  );
});
