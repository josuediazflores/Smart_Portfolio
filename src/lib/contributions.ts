/**
 * GitHub contribution calendar for the landing heatmap.
 * Live data comes from github-contributions-api.jogruber.de (no auth), cached for 24h via ISR.
 * If the fetch fails, a static seeded pattern shaped to the last known count is used instead.
 */

export const GITHUB_USER = "josuediazflores";

/** Five grey levels, lightest to darkest. */
export const LEVEL_COLORS = ["#f0efeb", "#d2d2d0", "#a3a3a1", "#5c5c5e", "#1d1d1f"] as const;

export type ContributionData = {
  total: number;
  /** 53 weeks x 7 weekdays, column-major. null = outside the shown range. */
  cells: (number | null)[];
  months: string[];
  rangeLabel: string;
  live: boolean;
};

const WEEKS = 53;
const DAYS = 7;
const CELLS = WEEKS * DAYS;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type ApiDay = { date: string; count: number; level: number };
type ApiResponse = { total?: Record<string, number>; contributions?: ApiDay[] };

export async function getContributions(user: string = GITHUB_USER): Promise<ContributionData> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) throw new Error(`contributions api responded ${res.status}`);
    const json = (await res.json()) as ApiResponse;
    const days = (json.contributions ?? []).filter((d) => typeof d.date === "string");
    if (days.length < 300) throw new Error("contributions api returned too few days");
    const total = json.total?.lastYear ?? days.reduce((n, d) => n + (d.count || 0), 0);
    return shape(days, total);
  } catch {
    return fallback();
  }
}

function utc(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function toLevel(level: number | undefined, count: number): number {
  if (typeof level === "number" && level >= 0 && level <= 4) return Math.round(level);
  if (!count) return 0;
  if (count < 4) return 1;
  if (count < 7) return 2;
  if (count < 10) return 3;
  return 4;
}

function shape(days: ApiDay[], total: number): ContributionData {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const lastDow = utc(sorted[sorted.length - 1].date).getUTCDay();
  const trailing = 6 - lastDow;
  const capacity = CELLS - trailing;
  const shown = sorted.slice(Math.max(0, sorted.length - capacity));
  const leading = CELLS - trailing - shown.length;

  const cells: (number | null)[] = [
    ...new Array<null>(leading).fill(null),
    ...shown.map((d) => toLevel(d.level, d.count)),
    ...new Array<null>(trailing).fill(null),
  ];

  // Label months from the end of the first column (first full week), like GitHub's calendar does.
  const first = utc(shown[Math.min(6, shown.length - 1)].date);
  const last = utc(shown[shown.length - 1].date);
  const m0 = first.getUTCMonth();
  const months = Array.from({ length: 6 }, (_, i) => MONTHS[(m0 + 2 * i) % 12]);
  const rangeLabel = `${MONTHS[m0]} ${first.getUTCFullYear()} – ${MONTHS[last.getUTCMonth()]} ${last.getUTCFullYear()}`;

  return { total, cells, months, rangeLabel, live: true };
}

/** Static, seeded pattern shaped to the last known count (1,011 contributions, Sep 2025 – Aug 2026). */
function fallback(): ContributionData {
  let seed = 1011;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  // Sep 1 2025 was a Monday (1 leading blank); Aug 31 2026 is a Monday (5 trailing blanks).
  const leading = 1;
  const trailing = 5;
  const cells: (number | null)[] = new Array<null>(leading).fill(null);
  for (let i = 0; i < CELLS - leading - trailing; i++) {
    const dow = (i + leading) % DAYS;
    const weekend = dow === 0 || dow === 6;
    const r = rand();
    let level = r < 0.22 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : r < 0.92 ? 3 : 4;
    if (weekend && rand() < 0.5) level = Math.max(0, level - 2);
    cells.push(level);
  }
  cells.push(...new Array<null>(trailing).fill(null));
  return {
    total: 1011,
    cells,
    months: ["Sep", "Nov", "Jan", "Mar", "May", "Jul"],
    rangeLabel: "Sep 2025 – Aug 2026",
    live: false,
  };
}
