import { pool } from "../db.js";
import { validateData, validateUniquesDatas } from "../validators/validator.js";

export const getEmployeers = async (req, res) => {
  try {
    const [employers] = await pool.query("SELECT * FROM users");
    if (employers.length <= 0)
      return res.status(404).json({ msg: "Employeers not found" });
    res.json(employers);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmployeerById = async (req, res) => {
  const id = req.params.id;
  try {
    const [employers] = await pool.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    if (employers.length <= 0)
      return res.status(404).json({ msg: "Employeer not found" });
    res.status(200).json(employers[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createEmployeers = async (req, res) => {
  const { username, password, email } = req.body;
  const validationErrors = validateData({ username, password, email });
  const uniqueErrors = await validateUniquesDatas({ username, email });

  if (uniqueErrors.length > 0) {
    return res.status(409).json({ errors: uniqueErrors });
  }

  if (validationErrors.length > 0) {
    return res.status(409).json({ errors: validationErrors });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, password, email]
    );
    res.status(201).json({ message: "Employeer created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateEmployeers = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  const validationErrors = validateData({ username, password, email });
  const uniqueErrors = await validateUniquesDatas({ username, email });

  if (uniqueErrors.length > 0) {
    return res.status(409).json({ errors: uniqueErrors });
  }

  if (validationErrors.length > 0) {
    return res.status(409).json({ errors: validationErrors });
  }

  try {
    const [result] = await pool.query(
      "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?",
      [username, password, email, id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({ msg: "Employeer not found" });
    res.status(200).json({ message: "Employeer updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteEmployeers = async (req, res) => {
  const id = req.params.id;
  try {
    const [employeer] = await pool.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);
    if (employeer.affectedRows <= 0)
      return res.status(404).json({ msg: "Employeer not found" });
    res.status(204).json({ message: "Employeer deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
