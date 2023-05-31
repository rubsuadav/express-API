import { pool } from "../db.js";

export async function createTables() {
  const conn = await pool.getConnection();
  //conn.execute("DROP TABLE IF EXISTS users");
  try {
    await conn.query(`
       CREATE TABLE IF NOT EXISTS users (
         id INT(11) NOT NULL AUTO_INCREMENT,
         username VARCHAR(255) NOT NULL,
         password VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
         PRIMARY KEY (id)
         ); 
    `);
    console.log("Table users created");
  } catch (error) {
    console.log("Error creating table users", error);
  } finally {
    conn.release();
  }
}

export async function dropTables() {
  const conn = await pool.getConnection();
  try {
    await conn.query("DROP TABLE IF EXISTS users");
    console.log("Table users droped");
  } catch (error) {
    console.log("Error droping table users", error);
  } finally {
    conn.release();
  }
}

export async function insertData() {
  const conn = await pool.getConnection();
  try {
    await conn.query(`
    INSERT INTO users (username, password, email)
    VALUES
    ('admin', 'admin', 'admin@gmail.com'),
    ('user', 'user', 'user@gmail.com'); 
    `);
    console.log("Data inserted");
  } catch (error) {
    console.log("Error inserting data", error);
  } finally {
    conn.release();
  }
}
