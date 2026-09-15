const MONTH_INDEX: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

/**
 * Parse a display date like "Jul 2024" / "Sept 2025" into a sortable
 * numeric key YYYYMM. Returns null when missing/unparseable.
 */
export function parseProjectDateKey(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/present|ongoing|now/i.test(trimmed)) return null;

  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{4})/);
  if (!match) {
    // Fall back to Date.parse for ISO strings, just in case.
    const t = Date.parse(trimmed);
    if (Number.isNaN(t)) return null;
    const d = new Date(t);
    return d.getFullYear() * 100 + (d.getMonth() + 1);
  }

  const month = MONTH_INDEX[match[1].toLowerCase()];
  const year = Number(match[2]);
  if (!month || Number.isNaN(year)) return null;
  return year * 100 + month;
}

/**
 * Sort projects so the most recent (by endDate) comes first.
 * - endDate null / "Present" (ongoing) sorts first.
 * - Then endDate desc, then startDate desc, then `order` asc as tiebreaker.
 */
export function sortProjectsByEndDate<T extends Record<string, any>>(
  projects: T[],
): T[] {
  return [...projects].sort((a, b) => {
    const aEnd = parseProjectDateKey(a.endDate);
    const bEnd = parseProjectDateKey(b.endDate);

    // Ongoing (null) first.
    if (aEnd === null && bEnd !== null) return -1;
    if (bEnd === null && aEnd !== null) return 1;
    if (aEnd !== null && bEnd !== null && aEnd !== bEnd) return bEnd - aEnd;

    const aStart = parseProjectDateKey(a.startDate);
    const bStart = parseProjectDateKey(b.startDate);
    if (aStart === null && bStart !== null) return 1;
    if (bStart === null && aStart !== null) return -1;
    if (aStart !== null && bStart !== null && aStart !== bStart)
      return bStart - aStart;

    // Legacy `order` field as final tiebreaker.
    const aOrder =
      typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER;
    const bOrder =
      typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });
}
