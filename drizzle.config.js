import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_1aEht4cmbsky@ep-autumn-glade-aheanydc-pooler.c-3.us-east-1.aws.neon.tech/CarMax%3A%20Second-Hand%20Car%20Marketplace?sslmode=require&channel_binding=require'
  }
});
