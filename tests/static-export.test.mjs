import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const outputDirectory = new URL("../out/", import.meta.url);
const outputPath = fileURLToPath(outputDirectory);
const pagesUrl = "https://prizeproblems.org";

function readOutput(path) {
  return readFileSync(new URL(path, outputDirectory), "utf8");
}

test("exports the catalog at the custom-domain root", () => {
  const html = readOutput("index.html");
  assert.match(html, /Prize Problem Ledger \(PPL\)/);
  assert.match(html, /PPL 001/);
  assert.match(html, /PPL 177/);
  assert.match(html, /<option value="title" selected="">Title · A to Z<\/option>/);
  assert.match(html, /Website maintained by/);
  assert.match(html, /Rishikesh Gajjala/);
  assert.match(html, /Mario Krenn/);
  assert.match(html, /for suggesting to make this site/);
  assert.match(html, /href="https:\/\/mariokrenn\.wordpress\.com"/);
  assert.match(html, /Prize value · low first/);
  assert.doesNotMatch(html, /All currencies/);
  assert.match(html, /reference links indexed/);
  assert.match(html, /\/_next\//);
  assert.match(html, new RegExp(`rel="canonical" href="${pagesUrl}/"`));
  assert.doesNotMatch(html, /(?:href|src)="\/math-prize-problems\//);
  assert.doesNotMatch(html, /gajjala\.in\/math-prize-problems/);
  assert.doesNotMatch(html, /chatgpt\.site/);

  const paths = new Set(
    Array.from(
      html.matchAll(/href="(\/problems\/\d{3}\/)"/g),
      (match) => match[1],
    ),
  );
  assert.equal(paths.size, 177);
  assert.deepEqual(
    [...paths].sort(),
    Array.from(
      { length: 177 },
      (_, index) =>
        `/problems/${String(index + 1).padStart(3, "0")}/`,
    ),
  );

  const cardTitles = Array.from(
    html.matchAll(/<h3><a[^>]*>([^<]+)<\/a><\/h3>/g),
    (match) => match[1],
  );
  const cardIds = Array.from(
    html.matchAll(/<a[^>]*class="catalog-number"[^>]*>PPL (\d{3})<\/a>/g),
    (match) => Number(match[1]),
  );
  assert.deepEqual(
    cardIds.filter((catalogNumber) => catalogNumber <= 177),
    Array.from({ length: 177 }, (_, index) => index + 1),
    "the 177 launch PPL IDs use their frozen natural A–Z order",
  );
  const erdosNumbers = cardTitles
    .filter((title) => title.startsWith("Erdős Problem #"))
    .map((title) => Number(title.match(/#(\d+)/)?.[1]));
  assert.deepEqual(
    erdosNumbers,
    [...erdosNumbers].sort((a, b) => a - b),
    "A–Z uses natural numeric order for numbered problem titles",
  );
  assert.ok(
    cardTitles.findIndex((title) => title.startsWith("Kimberling #2 ·")) <
      cardTitles.findIndex((title) => title.startsWith("Kimberling #10 ·")),
    "natural title sorting applies outside the Erdős collection",
  );
});

test("exports all 177 permanent problem pages", () => {
  const html = readOutput("index.html");
  const ids = [
    ...new Set(
      Array.from(
        html.matchAll(/href="\/problems\/(\d{3})\/"/g),
        (match) => match[1],
      ),
    ),
  ];
  assert.equal(ids.length, 177);

  for (const id of ids) {
    const path = join(outputPath, "problems", id, "index.html");
    assert.ok(existsSync(path), `missing ${id}`);
    const problemHtml = readFileSync(path, "utf8");
    assert.match(problemHtml, new RegExp(`PPL ${id}`), id);
    assert.match(problemHtml, /Permanent problem ID/i, id);
    assert.match(
      problemHtml,
      new RegExp(`rel="canonical" href="${pagesUrl}/problems/${id}/"`),
      id,
    );
    assert.doesNotMatch(problemHtml, /chatgpt\.site/, id);
  }
});

test("keeps all 177 legacy slug pages as aliases to numbered pages", () => {
  const routeDirectories = readdirSync(join(outputPath, "problems"), {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const numericRoutes = routeDirectories.filter((id) => /^\d{3}$/.test(id));
  const legacyRoutes = routeDirectories.filter((id) => !/^\d{3}$/.test(id));

  assert.equal(numericRoutes.length, 177);
  assert.equal(legacyRoutes.length, 177);

  for (const id of legacyRoutes) {
    const html = readFileSync(join(outputPath, "problems", id, "index.html"), "utf8");
    const visibleId = html.match(/<title>PPL (\d{3}):/)?.[1];
    const canonicalId = html.match(
      new RegExp(`rel="canonical" href="${pagesUrl}/problems/(\\d{3})/"`),
    )?.[1];
    assert.ok(visibleId, `missing visible PPL ID for ${id}`);
    assert.ok(canonicalId, `missing numeric canonical for ${id}`);
    assert.equal(canonicalId, visibleId, `mismatched alias for ${id}`);
  }

  assert.match(readOutput("problems/005/index.html"), /Beal conjecture/);
  assert.match(readOutput("problems/033/index.html"), /Erdős Problem #1/);
  assert.match(readOutput("problems/051/index.html"), /Erdős Problem #104/);
  assert.match(readOutput("problems/082/index.html"), /Erdős Problem #1029/);
  assert.match(readOutput("problems/097/index.html"), /Kimberling #2/);
  assert.match(readOutput("problems/109/index.html"), /Krenn-Gu conjecture/);
  assert.match(readOutput("problems/129/index.html"), /Poseidon-31/);
  assert.match(readOutput("problems/138/index.html"), /Riemann hypothesis/);
  assert.match(readOutput("problems/143/index.html"), /Shallit #2/);
  assert.match(readOutput("problems/177/index.html"), /Yang–Mills existence and mass gap/);
  assert.match(
    readOutput("problems/riemann-hypothesis/index.html"),
    new RegExp(`rel="canonical" href="${pagesUrl}/problems/138/"`),
  );
  assert.match(
    readOutput("problems/krenn-inherited-vertex-coloring/index.html"),
    new RegExp(`rel="canonical" href="${pagesUrl}/problems/109/"`),
  );
});

test("exports GitHub Pages sitemap, robots and 404 files", () => {
  const sitemap = readOutput("sitemap.xml");
  assert.equal((sitemap.match(/<url>/g) || []).length, 178);
  assert.match(sitemap, new RegExp(`${pagesUrl}/problems/138/`));
  assert.doesNotMatch(sitemap, /\/problems\/riemann-hypothesis\//);
  assert.doesNotMatch(sitemap, /chatgpt\.site/);

  const robots = readOutput("robots.txt");
  assert.match(robots, new RegExp(`${pagesUrl}/sitemap\\.xml`));

  assert.ok(existsSync(new URL("404.html", outputDirectory)));
});
