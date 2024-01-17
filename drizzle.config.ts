import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    ssl: true,
    user: process.env.POSTGRES_USER as string,
    host: process.env.POSTGRES_HOST as string,
    database: process.env.POSTGRES_DATABASE as string,
    password: process.env.POSTGRES_PASSWORD as string,
  },
} satisfies Config;
