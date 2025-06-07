import { Database } from "@db/sqlite";
import type * as insightsTableType from "$tables/insights.ts";
import * as insightsTable from "$tables/insights.ts";
import { HasDBClient } from "./shared.ts";
import { afterAll, beforeAll } from "@std/testing/bdd";

type Fixture = HasDBClient & {
  insights: {
    insert(insights: insightsTableType.Insert[]): void;
    selectAll(): insightsTableType.Row[];
  };
};

export const withDB = <R>(fn: (fixture: Fixture) => R): R => {
  const db = new Database(":memory:");

  beforeAll(() => {
    db.exec(insightsTable.createTable);
  });

  afterAll(() => db.close());

  return fn({
    db,
    insights: {
      selectAll() {
        return db.sql<insightsTableType.Row>`SELECT * FROM insights`;
      },
      insert(insights) {
        for (const item of insights) {
          db.exec(insightsTable.insertStatement(item));
        }
      },
    },
  });
};
