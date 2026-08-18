import { describe, expect, it } from "vitest";
import { products } from "./products";
import {
  orderProductsForBuild,
  productSeasonality,
} from "./productSeasonality";

describe("product seasonality metadata", () => {
  it("only references products that exist in the catalog", () => {
    const productIds = new Set(products.map(({ id }) => id));

    expect(
      Object.keys(productSeasonality).filter((id) => !productIds.has(id)),
    ).toEqual([]);
  });

  it("does not lead the shirts category with winter sweaters in summer", () => {
    const shirts = orderProductsForBuild(
      products.filter(({ category }) => category === "shirts"),
      new Date("2026-08-17T12:00:00Z"),
    );

    expect(shirts.slice(0, 3).map(({ id }) => id)).toEqual([
      "freudian-tank",
      "gym-brat-cropped-shirt",
      "too-cute-to-quit",
    ]);

    const firstWinterSweater = shirts.findIndex(({ id }) =>
      [
        "dachshund-sweater",
        "bear-coffee-sweater",
        "moo-sweater",
        "capybara-sweater",
      ].includes(id),
    );
    const lastFallProduct = shirts.findLastIndex(({ id }) =>
      [
        "halloween-ghosts",
        "cats-pumpkins-t-shirt",
        "cats-pumpkins-crewneck",
        "pumpkin-sweater",
      ].includes(id),
    );

    expect(firstWinterSweater).toBeGreaterThan(lastFallProduct);
  });
});
