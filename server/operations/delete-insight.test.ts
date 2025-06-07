import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting insights from the database", () => {
  describe("when insight exists", () => {
    withDB((fixture) => {
      const insights: Insight[] = [
        { id: 1, brand: 0, createdAt: new Date(), text: "1" },
        { id: 2, brand: 0, createdAt: new Date(), text: "2" },
      ];

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        deleteInsight({ ...fixture, id: 1 });
      });

      it("removes the insight from the database", () => {
        const [row] = fixture.db.sql<Insight>`
          SELECT * FROM insights WHERE id = 1
        `;
        expect(row).toBeUndefined();
      });

      it("keeps other insights intact", () => {
        const [row] = fixture.db.sql<Insight>`
          SELECT * FROM insights WHERE id = 2
        `;
        expect(row).toBeDefined();
        expect(row).toMatchObject({
          id: 2,
          brand: 0,
          text: "2",
        });
      });
    });
  });

  describe("when insight does not exist", () => {
    withDB((fixture) => {
      it("does not throw an error", () => {
        expect(() => deleteInsight({ ...fixture, id: 999 })).not.toThrow();
      });
    });
  });
});
