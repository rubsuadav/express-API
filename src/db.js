import { createPool } from "mysql2/promise";
import {
  DB_HOST,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
} from "./config.js";
import { createTables, dropTables, insertData } from "./models/models.js";

export const pool = createPool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

await dropTables();
await createTables();
await insertData();
