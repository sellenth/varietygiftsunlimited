export type Season = "spring" | "summer" | "fall" | "winter";

export interface CalendarDate {
  month: number;
  day: number;
}
export interface SeasonalRelevance {
  /** Seasons in which the product should be promoted. Omit for evergreen items. */
  seasons?: readonly Season[];
  /** Optional annual merchandising anchor, such as October 1 for Halloween. */
  calendarDate?: CalendarDate;
  /** Lower values appear first when products have the same seasonal relevance. */
  priority?: number;
}

const SEASON_STARTS: Record<Season, CalendarDate> = {
  spring: { month: 3, day: 1 },
  summer: { month: 6, day: 1 },
  fall: { month: 9, day: 1 },
  winter: { month: 12, day: 1 },
};

// Captured once while Astro evaluates the build, so all generated pages use the
// same date and no browser-side reordering is necessary.
export const buildDate = new Date();

export function getSeasonForDate(date: Date): Season {
  const month = date.getUTCMonth() + 1;

  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "fall";
  return "winter";
}

function daysUntilCalendarDate(date: Date, target: CalendarDate): number {
  const today = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  let occurrence = Date.UTC(
    date.getUTCFullYear(),
    target.month - 1,
    target.day,
  );

  if (occurrence < today) {
    occurrence = Date.UTC(
      date.getUTCFullYear() + 1,
      target.month - 1,
      target.day,
    );
  }

  return Math.round((occurrence - today) / 86_400_000);
}

function daysUntilNextSeason(
  date: Date,
  relevance: SeasonalRelevance,
): number {
  if (relevance.calendarDate) {
    return daysUntilCalendarDate(date, relevance.calendarDate);
  }

  return Math.min(
    ...(relevance.seasons ?? []).map((season) =>
      daysUntilCalendarDate(date, SEASON_STARTS[season]),
    ),
  );
}

interface SeasonalProduct {
  id: string;
  name: string;
}

/**
 * Returns a new, deterministic product list for a single build date.
 * Current-season items lead, evergreen products follow, and future seasonal
 * products rotate into calendar order after them.
 */
export function sortProductsBySeason<T extends SeasonalProduct>(
  products: readonly T[],
  metadata: Readonly<Record<string, SeasonalRelevance>>,
  date: Date = buildDate,
): T[] {
  const currentSeason = getSeasonForDate(date);

  const rank = (product: T) => {
    const relevance = metadata[product.id];
    const seasons = relevance?.seasons ?? [];
    const isEvergreen = seasons.length === 0;
    const isCurrent = seasons.includes(currentSeason);

    return {
      bucket: isCurrent ? 0 : isEvergreen ? 1 : 2,
      days: isCurrent || isEvergreen
        ? 0
        : daysUntilNextSeason(date, relevance),
      priority: relevance?.priority ?? 100,
    };
  };

  return [...products].sort((a, b) => {
    const aRank = rank(a);
    const bRank = rank(b);

    return (
      aRank.bucket - bRank.bucket ||
      aRank.days - bRank.days ||
      aRank.priority - bRank.priority ||
      a.name.localeCompare(b.name) ||
      a.id.localeCompare(b.id)
    );
  });
}
