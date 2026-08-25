const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

const WORK_LOGS_ROOT = path.join(__dirname, "..", "work_logs");
const CATEGORIES = ["coding", "wrenching", "microelectronics", "general"];
const HEADING_RE = /^#{3,4}\s+(.+?)\s*$/gm;

function stripFrontMatter(raw) {
  if (!raw.startsWith("---\n")) return { meta: {}, body: raw };
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) return { meta: {}, body: raw };
  const fm = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const meta = {};
  const titleMatch = fm.match(/^title:\s*"([^"]+)"|^title:\s*(.+)$/m);
  if (titleMatch) meta.title = (titleMatch[1] || titleMatch[2]).trim();
  const catMatch = fm.match(/^categories:\s*\[([^\]]+)\]/m);
  if (catMatch) {
    meta.categories = catMatch[1].split(",").map((s) => s.trim());
  }
  return { meta, body };
}

function normalizeYear(yearStr) {
  const y = parseInt(yearStr, 10);
  if (y >= 100) return y;
  return 2000 + y;
}

function toIsoDate(month, day, yearStr) {
  const y = normalizeYear(yearStr);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = DateTime.fromObject({ year: y, month: m, day: d });
  if (!dt.isValid) return null;
  return dt.toISODate();
}

function cleanHeadingText(text) {
  return text
    .replace(/:$/, "")
    .replace(/\s*\((morning|afternoon)\)\s*$/i, "")
    .replace(/\s+(morning|afternoon)\s*$/i, "")
    .trim();
}

function parseDatesFromHeading(rawText) {
  const text = cleanHeadingText(rawText);
  if (!text) return [];

  if (/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(text)) {
    return [];
  }
  if (/^(current|future|new entry|must do|nice but|bom|required hardware|knob|windshield|precursor|raspberry|yoshimura|isuzu pickup)/i.test(text)) {
    return [];
  }

  const dates = new Set();

  if (/\band\b/i.test(text)) {
    const parts = text.split(/\s+and\s+/i);
    for (const part of parts) {
      for (const iso of parseDatesFromHeading(part.replace(/\band\b/i, ""))) {
        dates.add(iso);
      }
    }
    if (dates.size) return [...dates];
  }

  const rangeMatch = text.match(/^(\d{1,2})\/(\d{1,2})-(\d{1,2})\/(\d{2,4})/);
  if (rangeMatch) {
    const [, mm, d1, d2, yy] = rangeMatch;
    const start = parseInt(d1, 10);
    const end = parseInt(d2, 10);
    for (let day = start; day <= end; day++) {
      const iso = toIsoDate(mm, day, yy);
      if (iso) dates.add(iso);
    }
    return [...dates];
  }

  const singleRe = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g;
  let match;
  while ((match = singleRe.exec(text)) !== null) {
    const iso = toIsoDate(match[1], match[2], match[3]);
    if (iso) dates.add(iso);
  }

  return [...dates];
}

function looksDateLike(text) {
  return /\d{1,2}\/\d{1,2}(?:\/|\-\d)/.test(text);
}

function walkMarkdownFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMarkdownFiles(full, out);
    } else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md") {
      out.push(full);
    }
  }
  return out;
}

function categoryFromPath(filePath) {
  const rel = path.relative(WORK_LOGS_ROOT, filePath);
  return rel.split(path.sep)[0];
}

function urlFromPath(filePath) {
  const category = categoryFromPath(filePath);
  const slug = path.basename(filePath, ".md");
  return `/${category}/${slug}/`;
}

function logIdFromPath(filePath) {
  return path.relative(WORK_LOGS_ROOT, filePath).replace(/\\/g, "/");
}

function parseWorkLogFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, body } = stripFrontMatter(raw);
  const category = meta.categories?.[0] || categoryFromPath(filePath);
  const title = meta.title || path.basename(filePath, ".md");
  const url = urlFromPath(filePath);
  const logId = logIdFromPath(filePath);

  const sessions = [];
  const unparsed = [];

  for (const match of body.matchAll(HEADING_RE)) {
    const headingText = match[1].trim();
    const dates = parseDatesFromHeading(headingText);
    if (dates.length) {
      sessions.push({ heading: headingText, dates });
    } else if (looksDateLike(headingText)) {
      unparsed.push({ logId, title, heading: headingText });
    }
  }

  const logDaysSet = new Set();
  for (const session of sessions) {
    for (const date of session.dates) {
      logDaysSet.add(date);
    }
  }

  return {
    logId,
    title,
    category,
    url,
    sessions: sessions.length,
    logDays: [...logDaysSet].sort(),
    unparsed,
  };
}

function emptyCategoryCounts() {
  return Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
}

function buildByWeek(logDayRecords) {
  const weekMap = new Map();

  for (const record of logDayRecords) {
    const weekStart = DateTime.fromISO(record.date).startOf("week").toISODate();
    if (!weekMap.has(weekStart)) {
      weekMap.set(weekStart, emptyCategoryCounts());
    }
    weekMap.get(weekStart)[record.category] += 1;
  }

  return [...weekMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([weekStart, counts]) => ({
      weekStart,
      weekLabel: DateTime.fromISO(weekStart).toFormat("LLL d"),
      ...counts,
      total: Object.values(counts).reduce((sum, n) => sum + n, 0),
    }));
}

function buildHeatmap(logDayRecords) {
  const dayMap = new Map();

  for (const record of logDayRecords) {
    if (!dayMap.has(record.date)) {
      dayMap.set(record.date, { count: 0, logs: [] });
    }
    const entry = dayMap.get(record.date);
    if (!entry.logs.some((l) => l.logId === record.logId)) {
      entry.count += 1;
      entry.logs.push({
        logId: record.logId,
        title: record.title,
        url: record.url,
        category: record.category,
      });
    }
  }

  return Object.fromEntries(
    [...dayMap.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => [date, value])
  );
}

module.exports = () => {
  const files = walkMarkdownFiles(WORK_LOGS_ROOT);
  const parsedFiles = files.map(parseWorkLogFile).filter((f) => f.logDays.length > 0);

  const logDayRecords = [];
  for (const file of parsedFiles) {
    for (const date of file.logDays) {
      logDayRecords.push({
        date,
        logId: file.logId,
        title: file.title,
        category: file.category,
        url: file.url,
      });
    }
  }

  const byCategory = emptyCategoryCounts();
  for (const record of logDayRecords) {
    if (byCategory[record.category] !== undefined) {
      byCategory[record.category] += 1;
    }
  }

  const heatmap = buildHeatmap(logDayRecords);
  const calendarDays = Object.keys(heatmap).length;
  const multiLogDays = Object.entries(heatmap)
    .filter(([, v]) => v.count >= 2)
    .map(([date, v]) => ({
      date,
      dateDisplay: DateTime.fromISO(date).toFormat("LLL d, yyyy"),
      count: v.count,
      logs: v.logs,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const logs = parsedFiles
    .map((file) => ({
      logId: file.logId,
      title: file.title,
      category: file.category,
      url: file.url,
      days: file.logDays.length,
      sessions: file.sessions,
      first: file.logDays[0] || null,
      last: file.logDays[file.logDays.length - 1] || null,
    }))
    .sort((a, b) => b.days - a.days || a.title.localeCompare(b.title));

  const unparsed = parsedFiles.flatMap((f) => f.unparsed);

  const totalSessions = parsedFiles.reduce((sum, f) => sum + f.sessions, 0);

  return {
    generated: new Date().toISOString(),
    totals: {
      logDays: logDayRecords.length,
      sessions: totalSessions,
      calendarDays,
      multiLogDays: multiLogDays.length,
      logs: parsedFiles.length,
    },
    byCategory,
    byWeek: buildByWeek(logDayRecords),
    heatmap,
    multiLogDays,
    logs,
    unparsed,
  };
};
