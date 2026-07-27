import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const outputDirectory = new URL("../out/", import.meta.url);
const outputPath = fileURLToPath(outputDirectory);
const pagesOrigin = "https://rishigajjala.github.io";
const pagesBasePath = "/math-prize-problems";
const pagesUrl = `${pagesOrigin}${pagesBasePath}`;

function readOutput(path) {
  return readFileSync(new URL(path, outputDirectory), "utf8");
}

test("exports the catalog under the GitHub Pages project path", () => {
  const html = readOutput("index.html");
  assert.match(html, /Prize Problems — The Open Ledger/);
  assert.match(html, new RegExp(`${pagesBasePath}/_next/`));
  assert.match(html, new RegExp(`rel="canonical" href="${pagesUrl}/"`));
  assert.doesNotMatch(html, /chatgpt\.site/);

  const paths = new Set(
    Array.from(
      html.matchAll(/href="(\/math-prize-problems\/problems\/[^"]+\/)"/g),
      (match) => match[1],
    ),
  );
  assert.equal(paths.size, 177);
});

test("exports all 177 permanent problem pages", () => {
  const html = readOutput("index.html");
  const ids = [
    ...new Set(
      Array.from(
        html.matchAll(/href="\/math-prize-problems\/problems\/([^"/]+)\/"/g),
        (match) => match[1],
      ),
    ),
  ];
  assert.equal(ids.length, 177);

  for (const id of ids) {
    const path = join(outputPath, "problems", id, "index.html");
    assert.ok(existsSync(path), `missing ${id}`);
    const problemHtml = readFileSync(path, "utf8");
    assert.match(problemHtml, /permanent prize-problem dossier/i, id);
    assert.match(
      problemHtml,
      new RegExp(`rel="canonical" href="${pagesUrl}/problems/${id}/"`),
      id,
    );
    assert.doesNotMatch(problemHtml, /chatgpt\.site/, id);
  }
});

test("exports GitHub Pages sitemap, robots and 404 files", () => {
  const sitemap = readOutput("sitemap.xml");
  assert.equal((sitemap.match(/<url>/g) || []).length, 178);
  assert.match(sitemap, new RegExp(`${pagesUrl}/problems/riemann-hypothesis/`));
  assert.doesNotMatch(sitemap, /chatgpt\.site/);

  const robots = readOutput("robots.txt");
  assert.match(robots, new RegExp(`${pagesUrl}/sitemap\\.xml`));

  assert.ok(existsSync(new URL("404.html", outputDirectory)));
});
