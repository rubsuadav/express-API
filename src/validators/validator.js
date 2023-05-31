import { pool } from "../db.js";

export function validateData(data) {
  const { username, password, email } = data;
  const errors = [];

  if (!username || typeof username !== "string") {
    errors.push("Username is required");
  } else if (username.length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!email || typeof email !== "string") {
    errors.push("Email is required ");
  } else if (!isValidEmail(email)) {
    errors.push("Email is not valid");
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function validateUniquesDatas(data) {
  const { username, email } = data;
  const errors = [];
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (result.length > 0) {
      if (result[0].username === username) {
        errors.push("Username already exists");
      }
      if (result[0].email === email) {
        errors.push("Email already exists");
      }
    }
  } catch (error) {
    errors.push(error.message);
  } finally {
    conn.release();
  }

  return errors;
}
