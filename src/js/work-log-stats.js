(function () {
  "use strict";

  const CATEGORY_ORDER = ["coding", "wrenching", "microelectronics", "general"];
  const CATEGORY_LABELS = {
    coding: "Coding",
    wrenching: "Wrenching",
    microelectronics: "Microelectronics",
    general: "General",
  };
  const CATEGORY_COLORS = {
    coding: "#8b5cf6",
    wrenching: "#f59e0b",
    microelectronics: "#10b981",
    general: "#3b82f6",
  };

  function readData() {
    const el = document.getElementById("work-log-stats-data");
    if (!el) return null;
    try {
      return JSON.parse(el.textContent);
    } catch (err) {
      console.error("Work log stats: invalid JSON", err);
      return null;
    }
  }

  function formatNumber(n) {
    return n.toLocaleString();
  }

  function fillTotals(root, totals) {
    root.querySelectorAll("[data-stat]").forEach((node) => {
      const key = node.getAttribute("data-stat");
      if (totals[key] !== undefined) {
        node.textContent = formatNumber(totals[key]);
      }
    });
  }

  function isoToDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  function toIsoLocal(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function startOfWeekSunday(date) {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function heatLevel(count) {
    if (!count) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count === 3) return 3;
    return 4;
  }

  function buildHeatmapWeeks(heatmap, weekCount) {
    const dates = Object.keys(heatmap).sort();
    if (!dates.length) return [];

    const end = isoToDate(dates[dates.length - 1]);
    const start = addDays(end, -(weekCount * 7 - 1));
    const gridStart = startOfWeekSunday(start);

    const weeks = [];
    let cursor = new Date(gridStart);
    const endTime = end.getTime();

    while (cursor.getTime() <= endTime || weeks.length < weekCount) {
      const week = [];
      for (let day = 0; day < 7; day++) {
        const iso = toIsoLocal(cursor);
        const entry = heatmap[iso];
        week.push({
          iso,
          count: entry ? entry.count : 0,
          logs: entry ? entry.logs : [],
          inRange: cursor.getTime() >= start.getTime() && cursor.getTime() <= endTime,
        });
        cursor = addDays(cursor, 1);
      }
      weeks.push(week);
      if (weeks.length >= weekCount && cursor.getTime() > endTime) break;
    }

    return weeks.slice(-weekCount);
  }

  function buildFullHeatmapWeeks(heatmap) {
    const dates = Object.keys(heatmap).sort();
    if (!dates.length) return [];

    const start = startOfWeekSunday(isoToDate(dates[0]));
    const end = isoToDate(dates[dates.length - 1]);
    const weeks = [];
    let cursor = new Date(start);

    while (cursor.getTime() <= end.getTime()) {
      const week = [];
      for (let day = 0; day < 7; day++) {
        const iso = toIsoLocal(cursor);
        const entry = heatmap[iso];
        week.push({
          iso,
          count: entry ? entry.count : 0,
          logs: entry ? entry.logs : [],
          inRange: true,
        });
        cursor = addDays(cursor, 1);
      }
      weeks.push(week);
    }

    return weeks;
  }

  function monthLabelForWeek(week, prevMonthKey) {
    const firstInRange = week.find((cell) => cell.inRange) || week[0];
    if (!firstInRange) return { label: "", monthKey: prevMonthKey };
    const date = isoToDate(firstInRange.iso);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    if (monthKey === prevMonthKey) {
      return { label: "", monthKey };
    }
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return { label: months[date.getMonth()], monthKey };
  }

  function renderHeatmap(container, heatmap, mode) {
    const weeks =
      mode === "compact"
        ? buildHeatmapWeeks(heatmap, 26)
        : buildFullHeatmapWeeks(heatmap);

    container.innerHTML = "";
    container.setAttribute("role", "img");
    container.setAttribute(
      "aria-label",
      "Calendar heatmap of work log activity by day"
    );

    const body = document.createElement("div");
    body.className = "work-log-stats__heatmap-body";

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const labelCol = document.createElement("div");
    labelCol.className = "work-log-stats__heatmap-labels";
    labelCol.innerHTML =
      '<span class="work-log-stats__heatmap-month-spacer" aria-hidden="true"></span>' +
      dayLabels
        .map(
          (label) =>
            `<span class="work-log-stats__heatmap-day-label">${label}</span>`
        )
        .join("");
    body.appendChild(labelCol);

    const main = document.createElement("div");
    main.className = "work-log-stats__heatmap-main";

    const monthRow = document.createElement("div");
    monthRow.className = "work-log-stats__heatmap-months";

    const grid = document.createElement("div");
    grid.className = "work-log-stats__heatmap-grid";

    let prevMonthKey = null;
    weeks.forEach((week) => {
      const { label, monthKey } = monthLabelForWeek(week, prevMonthKey);
      prevMonthKey = monthKey;

      const monthCell = document.createElement("span");
      monthCell.className = "work-log-stats__heatmap-month-label";
      monthCell.textContent = label;
      monthRow.appendChild(monthCell);

      const col = document.createElement("div");
      col.className = "work-log-stats__heatmap-week";
      week.forEach((cell) => {
        const btn = document.createElement("span");
        btn.className = "work-log-stats__heatmap-cell";
        if (!cell.inRange) {
          btn.classList.add("work-log-stats__heatmap-cell--out");
        }
        btn.dataset.level = String(heatLevel(cell.count));
        btn.title =
          cell.count > 0
            ? `${cell.iso}: ${cell.count} log${cell.count === 1 ? "" : "s"}`
            : cell.iso;
        col.appendChild(btn);
      });
      grid.appendChild(col);
    });

    main.appendChild(monthRow);
    main.appendChild(grid);
    body.appendChild(main);
    container.appendChild(body);

    const legend = document.createElement("div");
    legend.className = "work-log-stats__heatmap-legend";
    legend.innerHTML =
      '<span>Less</span>' +
      [0, 1, 2, 3, 4]
        .map(
          (level) =>
            `<span class="work-log-stats__heatmap-cell work-log-stats__heatmap-cell--legend" data-level="${level}"></span>`
        )
        .join("") +
      "<span>More</span>";
    container.appendChild(legend);
  }

  function createWeeklyChart(canvas, byWeek) {
    const labels = byWeek.map((w) => w.weekLabel);
    const datasets = CATEGORY_ORDER.map((category) => ({
      label: CATEGORY_LABELS[category],
      data: byWeek.map((w) => w[category] || 0),
      backgroundColor: CATEGORY_COLORS[category],
      stack: "activity",
    }));

    return new Chart(canvas, {
      type: "bar",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, ticks: { maxRotation: 45, minRotation: 45 } },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: { stepSize: 1 },
            title: { display: true, text: "worklog entries/week" },
          },
        },
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  function createBusiestLogsChart(canvas, logs) {
    const top = logs.slice(0, 10);
    return new Chart(canvas, {
      type: "bar",
      data: {
        labels: top.map((l) => l.title),
        datasets: [
          {
            label: "Log days",
            data: top.map((l) => l.days),
            backgroundColor: top.map((l) => CATEGORY_COLORS[l.category] || "#6b7280"),
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
      },
    });
  }

  function renderMultiLogTable(tbody, multiLogDays, urlPrefix) {
    tbody.innerHTML = "";
    if (!multiLogDays.length) {
      tbody.innerHTML =
        '<tr><td colspan="2">No multi-log days yet.</td></tr>';
      return;
    }

    multiLogDays.forEach((day) => {
      const tr = document.createElement("tr");
      const logsHtml = day.logs
        .map(
          (log) =>
            `<a href="${urlPrefix}${log.url}">${escapeHtml(log.title)}</a> <span class="work-log-stats__tag work-log-stats__tag--${log.category}">${CATEGORY_LABELS[log.category]}</span>`
        )
        .join("<br>");
      tr.innerHTML = `<td>${escapeHtml(day.dateDisplay)}</td><td>${logsHtml}</td>`;
      tbody.appendChild(tr);
    });
  }

  function renderLogsTable(tbody, logs, urlPrefix) {
    tbody.innerHTML = "";
    logs.forEach((log) => {
      const tr = document.createElement("tr");
      tr.innerHTML =
        `<td><a href="${urlPrefix}${log.url}">${escapeHtml(log.title)}</a></td>` +
        `<td><span class="work-log-stats__tag work-log-stats__tag--${log.category}">${CATEGORY_LABELS[log.category]}</span></td>` +
        `<td>${log.days}</td>` +
        `<td>${log.last || "—"}</td>`;
      tbody.appendChild(tr);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function init() {
    const root = document.querySelector(".work-log-stats");
    if (!root) return;

    const data = readData();
    if (!data) return;

    const mode = root.getAttribute("data-mode") || "full";
    const urlPrefix = root.getAttribute("data-url-prefix") || "";

    fillTotals(root, data.totals);

    const heatmapEl = root.querySelector("[data-heatmap]");
    if (heatmapEl) {
      renderHeatmap(heatmapEl, data.heatmap, mode);
    }

    if (typeof Chart === "undefined") {
      console.warn("Work log stats: Chart.js not loaded");
      return;
    }

    const weeklyCanvas = root.querySelector('[data-chart="weekly"]');
    if (weeklyCanvas) {
      createWeeklyChart(weeklyCanvas, data.byWeek);
    }

    if (mode === "full") {
      const busiestCanvas = root.querySelector('[data-chart="busiest"]');
      if (busiestCanvas) {
        createBusiestLogsChart(busiestCanvas, data.logs);
      }

      const multiBody = root.querySelector("[data-table='multi-log'] tbody");
      if (multiBody) {
        renderMultiLogTable(multiBody, data.multiLogDays, urlPrefix);
      }

      const logsBody = root.querySelector("[data-table='logs'] tbody");
      if (logsBody) {
        renderLogsTable(logsBody, data.logs, urlPrefix);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
