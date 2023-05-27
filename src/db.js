import { createPool } from "mysql2/promise";
import {
  DB_HOST,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
} from "./config.js";

export const conn = createPool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});
conn.execute("DROP TABLE IF EXISTS users");
conn
  .execute(
    "CREATE TABLE IF NOT EXISTS users (" +
      "id INT(11) NOT NULL AUTO_INCREMENT," +
      "username VARCHAR(255) NOT NULL," +
      "password VARCHAR(255) NOT NULL," +
      "email VARCHAR(255) NOT NULL," +
      "created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
      "PRIMARY KEY (id)" +
      ");"
  )
  .then(() => {
    console.log("Table users created");
    conn.execute(
      "INSERT INTO users (username, password, email)" +
        "VALUES" +
        "('admin', 'admin', 'admin@gmail.com')," +
        "('user', 'user', 'user@gmail.com');"
    );
    console.log("Default users created");
  });
