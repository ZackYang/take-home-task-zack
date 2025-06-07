import type { Insight } from "$models/insight.ts";
import { InsightModel } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): Insight => {
  console.log(`Creating insight for brand=${input.brand}`);

  const createdAt = new Date();

  const validated = InsightModel.parse({
    brand: input.brand,
    text: input.text,
    createdAt,
  });

  if (!validated) {
    throw new Error("Invalid input: " + JSON.stringify(input));
  }

  const result = input.db.sql<Insight>`
    INSERT INTO insights (brand, createdAt, text)
    VALUES (${input.brand}, ${createdAt.toISOString()}, ${input.text})
    RETURNING *
  `[0];

  const insight = { ...result, createdAt: new Date(result.createdAt) };
  console.log("Insight created:", insight);
  return insight;
};
