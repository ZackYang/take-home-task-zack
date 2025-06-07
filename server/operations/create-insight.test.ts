import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import createInsight from "./create-insight.ts";

describe("creating insights in the database", () => {
  withDB((fixture) => {
    const input = {
      brand: 1,
      text: "Test insight",
    };

    let result: Insight;

    beforeAll(() => {
      result = createInsight({ ...fixture, ...input });
    });

    it("returns the created insight", () => {
      expect(result).toMatchObject({
        brand: input.brand,
        text: input.text,
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it("persists the insight in the database", () => {
      const [row] = fixture.db.sql<Insight>`
        SELECT * FROM insights WHERE id = ${result.id}
      `;
      expect(row).toBeDefined();
      expect(row).toMatchObject({
        id: result.id,
        brand: input.brand,
        text: input.text,
      });
    });
  });
});
