import { describe, expect, it } from "vitest";
import {
  getSeasonForDate,
  sortProductsBySeason,
  type SeasonalRelevance,
} from "./season";

const products = [
  { id: "winter", name: "Winter" },
  { id: "evergreen", name: "Evergreen" },
  { id: "fall", name: "Fall" },
  { id: "summer-b", name: "Summer B" },
  { id: "summer-a", name: "Summer A" },
  { id: "spring", name: "Spring" },
];

const metadata = {
  winter: { seasons: ["winter"] },
  fall: { seasons: ["fall"], calendarDate: { month: 10, day: 1 } },
  "summer-a": { seasons: ["summer"], priority: 10 },
  "summer-b": { seasons: ["summer"], priority: 20 },
  spring: { seasons: ["spring"] },
} satisfies Record<string, SeasonalRelevance>;

describe("getSeasonForDate", () => {
  it.each([
    ["2026-03-01", "spring"],
    ["2026-06-01", "summer"],
    ["2026-09-01", "fall"],
    ["2026-12-01", "winter"],
    ["2027-02-28", "winter"],
  ])("maps %s to %s", (date, expected) => {
    expect(getSeasonForDate(new Date(`${date}T12:00:00Z`))).toBe(expected);
  });
});
describe("sortProductsBySeason", () => {
  it("puts current summer products first, then evergreen and upcoming dates", () => {
    const result = sortProductsBySeason(
      products,
      metadata,
      new Date("2026-08-17T12:00:00Z"),
    );

    expect(result.map(({ id }) => id)).toEqual([
      "summer-a",
      "summer-b",
      "evergreen",
      "fall",
      "winter",
      "spring",
    ]);
  });

  it("rotates current winter products to the front without mutating input", () => {
    const original = [...products];
    const result = sortProductsBySeason(
      products,
      metadata,
      new Date("2026-12-15T12:00:00Z"),
    );

    expect(result[0].id).toBe("winter");
    expect(products).toEqual(original);
  });
});
