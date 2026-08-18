import {
  sortProductsBySeason,
  type SeasonalRelevance,
} from "../config/season";
import type { Product } from "./products";

const SPRING_SUMMER = ["spring", "summer"] as const;
const FALL = ["fall"] as const;
const WINTER = ["winter"] as const;

/**
 * Merchandising metadata lives beside the catalog instead of in page templates.
 * Products omitted from this map are treated as evergreen.
 */
export const productSeasonality = {
  // Warm-weather shirts
  "freudian-tank": { seasons: SPRING_SUMMER, priority: 10 },
  "gym-brat-cropped-shirt": { seasons: SPRING_SUMMER, priority: 20 },
  "too-cute-to-quit": { seasons: SPRING_SUMMER, priority: 30 },
  "keep-going": { seasons: SPRING_SUMMER, priority: 31 },
  "hustle-blue-print": { seasons: SPRING_SUMMER, priority: 32 },
  "hustle-orange-print": { seasons: SPRING_SUMMER, priority: 33 },
  "hustle-pink-print": { seasons: SPRING_SUMMER, priority: 34 },
  "corgi-yoga": { seasons: SPRING_SUMMER, priority: 40 },
  "golden-yoga": { seasons: SPRING_SUMMER, priority: 41 },
  "great-dane-yoga": { seasons: SPRING_SUMMER, priority: 42 },
  "husky-yoga": { seasons: SPRING_SUMMER, priority: 43 },
  "cool-aunts-club": { seasons: SPRING_SUMMER, priority: 50 },
  "what-the": { seasons: SPRING_SUMMER, priority: 51 },
  "cat-yoga": { seasons: SPRING_SUMMER, priority: 52 },
  cats: { seasons: SPRING_SUMMER, priority: 53 },
  doge: { seasons: SPRING_SUMMER, priority: 54 },
  "doge-moon": { seasons: SPRING_SUMMER, priority: 55 },
  tabby: { seasons: SPRING_SUMMER, priority: 56 },
  tanner: { seasons: SPRING_SUMMER, priority: 57 },
  tong: { seasons: SPRING_SUMMER, priority: 58 },

  // Fall and Halloween collection. October 1 keeps these ahead of winter in
  // the upcoming calendar while the whole fall season counts as relevant.
  "halloween-ghosts": {
    seasons: FALL,
    calendarDate: { month: 10, day: 1 },
    priority: 10,
  },
  "cats-pumpkins-t-shirt": {
    seasons: FALL,
    calendarDate: { month: 10, day: 1 },
    priority: 20,
  },
  "cats-pumpkins-crewneck": {
    seasons: FALL,
    calendarDate: { month: 10, day: 1 },
    priority: 30,
  },
  "pumpkin-sweater": {
    seasons: FALL,
    calendarDate: { month: 10, day: 1 },
    priority: 40,
  },
  "halloween-bandana": {
    seasons: FALL,
    calendarDate: { month: 10, day: 1 },
    priority: 50,
  },
  "halloween-bow-tie": {
    seasons: FALL,
    calendarDate: { month: 10, day: 1 },
    priority: 51,
  },

  // Cold-weather shirts
  "dachshund-sweater": { seasons: WINTER, priority: 10 },
  "bear-coffee-sweater": { seasons: WINTER, priority: 20 },
  "moo-sweater": { seasons: WINTER, priority: 30 },
  "capybara-sweater": { seasons: WINTER, priority: 40 },
} satisfies Record<string, SeasonalRelevance>;

export function orderProductsForBuild(
  products: readonly Product[],
  date?: Date,
): Product[] {
  return sortProductsBySeason(products, productSeasonality, date);
}
