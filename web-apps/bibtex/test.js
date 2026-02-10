#!/usr/bin/env node
// Test suite for Paper BibTeX Lookup
// Run: node test.js

const TIMEOUT = 15000;
let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await Promise.race([
      fn(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), TIMEOUT)
      ),
    ]);
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
    passed++;
  } catch (err) {
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    ${err.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || "Assertion failed");
}

// ---------- Input type detection ----------

function detectInputType(query) {
  query = query.trim();

  const arxivUrlMatch = query.match(/arxiv\.org\/(?:abs|pdf)\/([^\s?#]+)/i);
  const arxivNewId = query.match(/^(\d{4}\.\d{4,5})(v\d+)?$/);
  const arxivOldId = query.match(/^([a-z-]+\/\d{7})(v\d+)?$/i);
  const arxivPrefixId = query.match(/^arXiv:(\d{4}\.\d{4,5})(v\d+)?$/i);
  const doiMatch =
    query.match(/^(10\.\d{4,}\/\S+)$/i) ||
    query.match(/doi\.org\/(10\.\d{4,}\/\S+)/i);
  const openreviewMatch = query.match(
    /openreview\.net\/forum\?id=([A-Za-z0-9_-]+)/i
  );
  const s2Match = query.match(
    /semanticscholar\.org\/paper\/[^/]+\/([a-f0-9]+)/i
  );

  if (arxivUrlMatch || arxivNewId || arxivOldId || arxivPrefixId) {
    const id =
      arxivUrlMatch?.[1] ||
      arxivNewId?.[1] ||
      arxivOldId?.[1] ||
      arxivPrefixId?.[1];
    return { type: "arxiv", id: id.replace(/\.pdf$/i, "").replace(/v\d+$/, "") };
  }
  if (doiMatch) return { type: "doi", id: doiMatch[1] || doiMatch[0] };
  if (openreviewMatch) return { type: "openreview", id: openreviewMatch[1] };
  if (s2Match) return { type: "s2", id: s2Match[1] };
  if (query.includes("/") && query.includes("10."))
    return { type: "doi", id: query };
  return { type: "search", id: query };
}

// ---------- API helpers (matching what the app should do) ----------

async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, options);
    if (res.status === 429 && i < retries) {
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
      continue;
    }
    return res;
  }
}

async function fetchS2(paperId) {
  const fields =
    "title,authors,year,venue,publicationVenue,externalIds,journal";
  const url = `https://api.semanticscholar.org/graph/v1/paper/${encodeURIComponent(paperId)}?fields=${fields}`;
  return fetchWithRetry(url);
}

async function fetchCrossRefBibtex(doi) {
  const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}/transform/application/x-bibtex`);
  return res;
}

async function fetchOpenReviewV1(id) {
  return fetch(`https://api.openreview.net/notes?id=${id}`);
}

async function fetchS2Search(query) {
  const fields =
    "title,authors,year,venue,publicationVenue,externalIds,journal";
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=1&fields=${fields}`;
  return fetchWithRetry(url);
}

async function fetchOpenAlex(query) {
  const url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per_page=1&select=title,publication_year,authorships,primary_location,ids`;
  return fetch(url);
}

// ================================================
// Test groups
// ================================================

async function runParsingTests() {
  console.log("\n\x1b[1mInput Parsing\x1b[0m");

  await test("bare arXiv new-style ID", () => {
    const r = detectInputType("1706.03762");
    assert(r.type === "arxiv", `expected arxiv, got ${r.type}`);
    assert(r.id === "1706.03762", `expected 1706.03762, got ${r.id}`);
  });

  await test("bare arXiv ID with version", () => {
    const r = detectInputType("1706.03762v5");
    assert(r.type === "arxiv");
    assert(r.id === "1706.03762", `version should be stripped: ${r.id}`);
  });

  await test("arXiv abs URL", () => {
    const r = detectInputType("https://arxiv.org/abs/1706.03762");
    assert(r.type === "arxiv");
    assert(r.id === "1706.03762");
  });

  await test("arXiv pdf URL", () => {
    const r = detectInputType("https://arxiv.org/pdf/1706.03762.pdf");
    assert(r.type === "arxiv");
    assert(r.id === "1706.03762");
  });

  await test("arXiv URL with version", () => {
    const r = detectInputType("https://arxiv.org/abs/1706.03762v5");
    assert(r.type === "arxiv");
    assert(r.id === "1706.03762", `version should be stripped: ${r.id}`);
  });

  await test("arXiv old-style ID", () => {
    const r = detectInputType("hep-th/9901001");
    assert(r.type === "arxiv");
    assert(r.id === "hep-th/9901001");
  });

  await test("arXiv: prefixed ID", () => {
    const r = detectInputType("arXiv:1706.03762");
    assert(r.type === "arxiv");
    assert(r.id === "1706.03762");
  });

  await test("bare DOI", () => {
    const r = detectInputType("10.1038/nature14539");
    assert(r.type === "doi", `expected doi, got ${r.type}`);
    assert(r.id === "10.1038/nature14539");
  });

  await test("DOI URL", () => {
    const r = detectInputType("https://doi.org/10.1038/nature14539");
    assert(r.type === "doi");
    assert(r.id === "10.1038/nature14539");
  });

  await test("OpenReview URL", () => {
    const r = detectInputType(
      "https://openreview.net/forum?id=rygGQyrFvH"
    );
    assert(r.type === "openreview");
    assert(r.id === "rygGQyrFvH");
  });

  await test("Semantic Scholar URL", () => {
    const r = detectInputType(
      "https://www.semanticscholar.org/paper/Attention-is-All-you-Need-Vaswani-Shazeer/204e3073870fae3d05bcbc2f6a8e263d9b72e776"
    );
    assert(r.type === "s2");
    assert(r.id === "204e3073870fae3d05bcbc2f6a8e263d9b72e776");
  });

  await test("plain title → search", () => {
    const r = detectInputType("Attention Is All You Need");
    assert(r.type === "search");
  });

  await test("5-digit arXiv ID", () => {
    const r = detectInputType("2301.13688");
    assert(r.type === "arxiv");
    assert(r.id === "2301.13688");
  });

  await test("arXiv URL with query params", () => {
    const r = detectInputType(
      "https://arxiv.org/abs/2301.13688?context=cs"
    );
    assert(r.type === "arxiv");
    assert(r.id === "2301.13688");
  });
}

async function runAPITests() {
  console.log("\n\x1b[1mAPI Integration (live network calls)\x1b[0m");

  await test("S2: arXiv lookup (Attention Is All You Need)", async () => {
    const res = await fetchS2("arXiv:1706.03762");
    if (res.status === 429) return; // rate-limited from test suite, skip
    assert(res.ok, `S2 returned ${res.status}`);
    const data = await res.json();
    assert(data.title.includes("Attention"), `wrong title: ${data.title}`);
    assert(data.year === 2017, `wrong year: ${data.year}`);
  });

  await test("S2: DOI lookup may 404 → need CrossRef fallback", async () => {
    const res = await fetchS2("DOI:10.1038/nature14539");
    if (!res.ok) {
      // Expected: S2 can't find this DOI, so CrossRef fallback is needed
      const cr = await fetchCrossRefBibtex("10.1038/nature14539");
      assert(cr.ok, `CrossRef also failed: ${cr.status}`);
      const bib = await cr.text();
      assert(bib.includes("@"), `CrossRef didn't return BibTeX: ${bib.slice(0, 100)}`);
      assert(bib.includes("LeCun") || bib.includes("lecun"), `Missing author: ${bib.slice(0, 200)}`);
    } else {
      const data = await res.json();
      assert(data.title, "S2 returned ok but no title");
    }
  });

  await test("CrossRef: direct DOI → BibTeX", async () => {
    const res = await fetchCrossRefBibtex("10.1038/nature14539");
    assert(res.ok, `CrossRef returned ${res.status}`);
    const bib = (await res.text()).trim();
    assert(bib.startsWith("@"), `Not BibTeX: ${bib.slice(0, 50)}`);
    assert(bib.includes("Deep learning") || bib.includes("deep learning"), "Missing title");
  });

  await test("CrossRef: DOI with slash in suffix", async () => {
    const res = await fetchCrossRefBibtex("10.18653/v1/N19-1423");
    assert(res.ok, `CrossRef returned ${res.status}`);
    const bib = (await res.text()).trim();
    assert(bib.startsWith("@"), `Not BibTeX: ${bib.slice(0, 50)}`);
  });

  await test("OpenReview v1: known paper", async () => {
    const res = await fetchOpenReviewV1("rygGQyrFvH");
    assert(res.ok, `OR returned ${res.status}`);
    const data = await res.json();
    const note = data.notes?.[0];
    assert(note, "No notes returned");
    assert(
      note.content.title === "The Curious Case of Neural Text Degeneration" ||
      note.content.title?.value === "The Curious Case of Neural Text Degeneration",
      `wrong title: ${note.content.title}`
    );
    // _bibtex field should be present
    const bibtex = note.content._bibtex;
    assert(bibtex, "_bibtex field missing from OpenReview response");
    assert(bibtex.includes("@"), `_bibtex not valid: ${bibtex?.slice(0, 50)}`);
  });

  await test("S2 search: title query (or 429 → OpenAlex fallback)", async () => {
    const res = await fetchS2Search("Attention Is All You Need");
    if (res.ok) {
      const data = await res.json();
      assert(data.data?.length > 0, "No results");
      assert(
        data.data[0].title.toLowerCase().includes("attention"),
        `wrong result: ${data.data[0].title}`
      );
    } else {
      // 429 is expected; verify OpenAlex fallback works
      assert(res.status === 429, `unexpected status: ${res.status}`);
      const oaRes = await fetchOpenAlex("Attention Is All You Need");
      assert(oaRes.ok, `OpenAlex fallback also failed: ${oaRes.status}`);
      const data = await oaRes.json();
      assert(data.results?.[0], "OpenAlex fallback returned no results");
    }
  });

  await test("S2 search: BERT title (or 429 → OpenAlex fallback)", async () => {
    const res = await fetchS2Search(
      "BERT: Pre-training of Deep Bidirectional Transformers"
    );
    if (res.ok) {
      const data = await res.json();
      assert(data.data?.length > 0, "No results for BERT");
      assert(
        data.data[0].title.toLowerCase().includes("bert"),
        `wrong result: ${data.data[0].title}`
      );
    } else {
      assert(res.status === 429, `unexpected status: ${res.status}`);
      const oaRes = await fetchOpenAlex("BERT: Pre-training of Deep Bidirectional Transformers");
      assert(oaRes.ok, `OpenAlex fallback also failed: ${oaRes.status}`);
    }
  });

  await test("OpenAlex: title search (Attention)", async () => {
    const res = await fetchOpenAlex("Attention Is All You Need");
    assert(res.ok, `OpenAlex returned ${res.status}`);
    const data = await res.json();
    const work = data.results?.[0];
    assert(work, "No results from OpenAlex");
    assert(
      work.title.toLowerCase().includes("attention"),
      `wrong result: ${work.title}`
    );
  });

  await test("OpenAlex: title search (BERT)", async () => {
    const res = await fetchOpenAlex(
      "BERT: Pre-training of Deep Bidirectional Transformers"
    );
    assert(res.ok, `OpenAlex returned ${res.status}`);
    const data = await res.json();
    const work = data.results?.[0];
    assert(work, "No results from OpenAlex for BERT");
    assert(
      work.title.toLowerCase().includes("bert"),
      `wrong result: ${work.title}`
    );
  });

  await test("OpenReview v1: API works (but CORS blocks browser)", async () => {
    const res = await fetchOpenReviewV1("rygGQyrFvH");
    assert(res.ok, `OR returned ${res.status}`);
    const data = await res.json();
    const note = data.notes?.[0];
    const bib = note.content._bibtex?.trim();
    assert(bib, "_bibtex field missing");
    assert(bib.includes("@inproceedings"), `wrong type: ${bib.slice(0, 40)}`);
  });

  await test("DOI fallback: S2 404 → CrossRef succeeds", async () => {
    const s2res = await fetchS2("DOI:10.1038/nature14539");
    if (!s2res.ok) {
      const cr = await fetchCrossRefBibtex("10.1038/nature14539");
      assert(cr.ok, `CrossRef failed: ${cr.status}`);
      const bib = (await cr.text()).trim();
      assert(bib.startsWith("@"), "CrossRef didn't return BibTeX");
    }
  });
}

async function runBibtexFormatTests() {
  console.log("\n\x1b[1mBibTeX Formatting\x1b[0m");

  // Simulate the formatBibtex function
  function formatBibtex(paper) {
    const title = paper.title || "Unknown";
    const authors = (paper.authors || []).map((a) => a.name);
    const year = paper.year || new Date().getFullYear();
    const venue =
      paper.publicationVenue?.name ||
      paper.venue ||
      paper.journal?.name ||
      "";
    const arxivId = paper.externalIds?.ArXiv;
    const doi = paper.externalIds?.DOI;

    const firstAuthor =
      authors[0]
        ?.split(" ")
        .pop()
        ?.toLowerCase()
        .replace(/[^a-z]/g, "") || "unknown";
    const firstWord =
      title
        .split(/\s+/)[0]
        ?.toLowerCase()
        .replace(/[^a-z]/g, "") || "paper";
    const key = `${firstAuthor}${year}${firstWord}`;

    const authorStr = authors.join(" and ");

    const venueNames = [venue, paper.venue || ""]
      .map((v) => v.toLowerCase())
      .join(" ");
    const confKeywords = [
      "conference", "proceedings", "neurips", "nips", "icml", "iclr",
      "cvpr", "iccv", "eccv", "acl", "emnlp", "naacl",
      "aaai", "ijcai", "sigir", "www", "kdd",
    ];
    const isConference = confKeywords.some((k) => venueNames.includes(k));

    const entryType = isConference ? "inproceedings" : "article";
    const venueField = isConference ? "booktitle" : "journal";

    let bibtex = `@${entryType}{${key},
  title={${title}},
  author={${authorStr}},
  ${venueField}={${venue || (arxivId ? `arXiv preprint arXiv:${arxivId}` : "Unknown")}},
  year={${year}}`;
    if (arxivId)
      bibtex += `,\n  eprint={${arxivId}},\n  archivePrefix={arXiv}`;
    if (doi) bibtex += `,\n  doi={${doi}}`;
    bibtex += "\n}";
    return bibtex;
  }

  await test("conference paper format", () => {
    const bib = formatBibtex({
      title: "Attention Is All You Need",
      authors: [{ name: "Ashish Vaswani" }, { name: "Noam Shazeer" }],
      year: 2017,
      venue: "NeurIPS",
      publicationVenue: {
        name: "Neural Information Processing Systems",
      },
      externalIds: { ArXiv: "1706.03762" },
    });
    assert(bib.startsWith("@inproceedings{"), `wrong type: ${bib.slice(0, 30)}`);
    assert(bib.includes("booktitle="), "missing booktitle");
    assert(bib.includes("vaswani2017attention"), `wrong key: ${bib}`);
    assert(bib.includes("eprint={1706.03762}"), "missing eprint");
  });

  await test("journal paper format", () => {
    const bib = formatBibtex({
      title: "Deep learning",
      authors: [{ name: "Yann LeCun" }],
      year: 2015,
      venue: "Nature",
      externalIds: { DOI: "10.1038/nature14539" },
    });
    assert(bib.startsWith("@article{"), `wrong type: ${bib.slice(0, 30)}`);
    assert(bib.includes("journal="), "missing journal");
    assert(bib.includes("doi={10.1038/nature14539}"), "missing doi");
  });

  await test("arXiv preprint (no venue)", () => {
    const bib = formatBibtex({
      title: "Some Paper",
      authors: [{ name: "Jane Doe" }],
      year: 2024,
      venue: "",
      externalIds: { ArXiv: "2401.00001" },
    });
    assert(bib.includes("arXiv preprint"), "should say arXiv preprint");
  });

  await test("handles missing authors gracefully", () => {
    const bib = formatBibtex({
      title: "Orphan Paper",
      authors: [],
      year: 2024,
      venue: "Workshop",
    });
    assert(bib.includes("unknown2024orphan"), `wrong key: ${bib}`);
    assert(bib.includes("author={}"), "should have empty author");
  });

  await test("special chars in title don't break key", () => {
    const bib = formatBibtex({
      title: "GPT-4 Technical Report",
      authors: [{ name: "OpenAI" }],
      year: 2023,
      venue: "",
      externalIds: { ArXiv: "2303.08774" },
    });
    assert(bib.includes("openai2023gpt"), `wrong key: ${bib}`);
  });
}

// ---------- Run ----------

(async () => {
  console.log("Paper BibTeX Lookup — Test Suite\n");

  await runParsingTests();
  await runBibtexFormatTests();
  await runAPITests();

  console.log(
    `\n\x1b[1mResults: ${passed} passed, ${failed} failed\x1b[0m`
  );
  process.exit(failed > 0 ? 1 : 0);
})();
