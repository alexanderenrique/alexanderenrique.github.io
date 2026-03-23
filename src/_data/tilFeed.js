const fs = require("fs");
const path = require("path");

const TIL_PATH = path.join(__dirname, "..", "general", "Today-I-Learned.md");
const HEADING = /^#{3,4}\s+(\d{2})\/(\d{2})\/(\d{4})\s*$/gm;

function stripFrontMatter(raw) {
  if (!raw.startsWith("---\n")) return raw;
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) return raw;
  return raw.slice(end + 5);
}

function extractBullets(block) {
  const out = [];
  for (const line of block.split("\n")) {
    const t = line.trimEnd();
    const m = t.match(/^\s*-\s+(.+)$/);
    if (m) out.push(m[1]);
  }
  return out;
}

function parseLearnings(content) {
  const marker = "\n## Learnings";
  let idx = content.indexOf(marker);
  if (idx === -1) return [];
  let body = content.slice(idx + marker.length);

  const matches = [...body.matchAll(HEADING)];
  const items = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length;
    const block = body.slice(start, end);
    const [, mm, dd, yyyy] = m;
    items.push({
      date: `${yyyy}-${mm}-${dd}`,
      dateDisplay: `${mm}/${dd}/${yyyy}`,
      learnings: extractBullets(block),
    });
  }
  return items;
}

module.exports = () => {
  const raw = fs.readFileSync(TIL_PATH, "utf8");
  const content = stripFrontMatter(raw);
  return {
    title: "Today I Learned",
    generated: new Date().toISOString(),
    source: "general/Today-I-Learned.md",
    items: parseLearnings(content),
  };
};
