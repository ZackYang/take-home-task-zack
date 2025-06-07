import type { Database } from "@db/sqlite";
import { createTable as createInsightsTable } from "./insights.ts";

export const createTables = async (db: Database) => {
  await db.prepare(createInsightsTable).run();
};
