import assert from "node:assert/strict";
import test from "node:test";

let workerPromise;

function getWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);
  }
  return workerPromise;
}

async function render(path = "/") {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the 177-problem ledger with permanent links", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Prize Problem Ledger \(PPL\)<\/title>/i);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/prizeproblems\.org\/"/,
  );
  assert.match(html, /The problems are open\.<em>The rewards are real\.<\/em>/);
  assert.match(html, /Search by PPL number or exact statement, compare reward terms/);
  assert.match(html, /PPL 001/);
  assert.match(html, /PPL 177/);
  assert.match(html, /PPL numbers are identifiers, not ranks\./);
  assert.match(html, /<option value="title" selected="">Title · A to Z<\/option>/);
  assert.match(html, />177</);
  assert.match(html, /Riemann hypothesis/);
  assert.match(html, /Website maintained by/);
  assert.match(html, /Rishikesh Gajjala/);
  assert.match(html, /Mario Krenn/);
  assert.match(html, /for suggesting to make this site/);
  assert.match(html, /href="https:\/\/mariokrenn\.wordpress\.com"/);
  assert.doesNotMatch(html, /react-loading-skeleton|Your site is taking shape/);

  const paths = new Set(
    Array.from(html.matchAll(/href="(\/problems\/\d{3})"/g), (match) => match[1]),
  );
  assert.equal(paths.size, 177);
  assert.deepEqual(
    [...paths].sort(),
    Array.from({ length: 177 }, (_, index) => `/problems/${String(index + 1).padStart(3, "0")}`),
  );

  const cardTitles = Array.from(
    html.matchAll(/<h3><a[^>]*>([^<]+)<\/a><\/h3>/g),
    (match) => match[1],
  );
  const cardIds = Array.from(
    html.matchAll(/<a[^>]*class="catalog-number"[^>]*>PPL (\d{3})<\/a>/g),
    (match) => Number(match[1]),
  );
  const launchCardIds = cardIds.filter((catalogNumber) => catalogNumber <= 177);
  assert.deepEqual(
    [...launchCardIds].sort((a, b) => a - b),
    Array.from({ length: 177 }, (_, index) => index + 1),
    "the randomized launch IDs remain a complete 1–177 permutation",
  );
  assert.notDeepEqual(
    launchCardIds,
    Array.from({ length: 177 }, (_, index) => index + 1),
    "PPL IDs are independent of the A–Z display order",
  );
  const erdosNumbers = cardTitles
    .filter((title) => title.startsWith("Erdős Problem #"))
    .map((title) => Number(title.match(/#(\d+)/)?.[1]));
  assert.deepEqual(
    erdosNumbers,
    [...erdosNumbers].sort((a, b) => a - b),
    "A–Z uses natural numeric order for numbered problem titles",
  );
});

test("renders numbered pages and preserves legacy aliases", async () => {
  const cases = [
    {
      paths: ["/problems/056", "/problems/riemann-hypothesis"],
      id: "PPL 056",
      title: "Riemann hypothesis",
    },
    {
      paths: ["/problems/054", "/problems/erdos-1"],
      id: "PPL 054",
      title: "Erdős Problem #1",
    },
    {
      paths: ["/problems/077", "/problems/erdos-104"],
      id: "PPL 077",
      title: "Erdős Problem #104",
    },
    {
      paths: ["/problems/027", "/problems/erdos-1029"],
      id: "PPL 027",
      title: "Erdős Problem #1029",
    },
    {
      paths: ["/problems/007", "/problems/krenn-inherited-vertex-coloring"],
      id: "PPL 007",
      title: "Krenn-Gu conjecture",
    },
  ];

  for (const { paths, id, title } of cases) {
    for (const path of paths) {
      const response = await render(path);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.match(html, /Permanent problem ID/i);
      assert.match(html, new RegExp(id));
      if (title) assert.match(html, new RegExp(title));
      assert.match(html, /Reward offers/);
      assert.match(html, /Sources &amp; reading/);
      assert.match(html, /Read the rules &amp; take it on/);
      assert.match(
        html,
        new RegExp(
          `rel="canonical" href="https://prizeproblems.org/problems/${id.slice(-3)}/"`,
        ),
      );
    }
  }
});

test("all 177 indexed problem routes render", async () => {
  const rootResponse = await render();
  const rootHtml = await rootResponse.text();
  const paths = [
    ...new Set(
      Array.from(rootHtml.matchAll(/href="(\/problems\/\d{3})"/g), (match) => match[1]),
    ),
  ];
  assert.equal(paths.length, 177);

  for (let offset = 0; offset < paths.length; offset += 16) {
    const batch = paths.slice(offset, offset + 16);
    const responses = await Promise.all(batch.map((path) => render(path)));
    responses.forEach((response, index) => {
      assert.equal(response.status, 200, batch[index]);
    });
  }
});

test("sitemap lists the catalog and all 177 problem pages", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.equal((xml.match(/<url>/g) || []).length, 178);
  assert.match(xml, /\/problems\/007\//);
  assert.match(xml, /\/problems\/056\//);
  assert.doesNotMatch(xml, /\/problems\/riemann-hypothesis/);
  assert.doesNotMatch(xml, /\/problems\/erdos-1/);
});

test("unknown problem IDs return 404", async () => {
  for (const path of ["/problems/999", "/problems/not-a-real-prize-problem"]) {
    const response = await render(path);
    assert.equal(response.status, 404, path);
  }
});
