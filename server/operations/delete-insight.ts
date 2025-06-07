import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): void => {
  console.log(`Deleting insight with id=${input.id}`);

  input.db.sql`DELETE FROM insights WHERE id = ${input.id}`;

  console.log("Insight deleted");
};
