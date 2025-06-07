import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): Insight => {
  console.log(`Creating insight for brand=${input.brand}`);

  const createdAt = new Date().toISOString();

  const result = input.db.sql<Insight>`
    INSERT INTO insights (brand, createdAt, text)
    VALUES (${input.brand}, ${createdAt}, ${input.text})
    RETURNING *
  `[0];

  const insight = { ...result, createdAt: new Date(result.createdAt) };
  console.log("Insight created:", insight);
  return insight;
};
