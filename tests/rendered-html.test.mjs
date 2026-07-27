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
  assert.match(html, /<title>Prize Problems — The Open Ledger<\/title>/i);
  assert.match(html, /The problems are open\.<em>The rewards are real\.<\/em>/);
  assert.match(html, /Search exact statements, compare reward terms/);
  assert.match(html, />177</);
  assert.match(html, /Riemann hypothesis/);
  assert.doesNotMatch(html, /react-loading-skeleton|Your site is taking shape/);

  const paths = new Set(
    Array.from(html.matchAll(/href="(\/problems\/[^"]+)"/g), (match) => match[1]),
  );
  assert.equal(paths.size, 177);
});

test("renders individual institutional and Erdős problem pages", async () => {
  for (const path of ["/problems/riemann-hypothesis", "/problems/erdos-1"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /permanent prize-problem dossier/i);
    assert.match(html, /Reward offers/);
    assert.match(html, /Sources &amp; reading/);
    assert.match(html, /Read the rules &amp; take it on/);
    assert.match(html, new RegExp(`rel="canonical" href="[^"]*${path}`));
  }
});

test("all 177 indexed problem routes render", async () => {
  const rootResponse = await render();
  const rootHtml = await rootResponse.text();
  const paths = [
    ...new Set(Array.from(rootHtml.matchAll(/href="(\/problems\/[^"]+)"/g), (match) => match[1])),
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
  assert.match(xml, /\/problems\/riemann-hypothesis/);
  assert.match(xml, /\/problems\/erdos-1/);
});

test("unknown problem IDs return 404", async () => {
  const response = await render("/problems/not-a-real-prize-problem");
  assert.equal(response.status, 404);
});
