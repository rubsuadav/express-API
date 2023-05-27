import { conn } from "../db.js";

export const getEmployeers = async (req, res) => {
  try {
    const [employers] = await conn.query("SELECT * FROM users");
    res.json(employers);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmployeerById = async (req, res) => {
  try {
    const [employers] = await conn.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (employers.length <= 0)
      return res.status(404).json({ msg: "Employeer not found" });
    res.json(employers[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createEmployeers = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const [result] = await conn.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, password, email]
    );
    res.send({ result });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateEmployeers = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;

    const [result] = await conn.query(
      "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?",
      [username, password, email, id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({ msg: "Employeer not found" });
    res.json({ id, username, password, email });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteEmployeers = async (req, res) => {
  try {
    const [employeer] = await conn.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (employeer.affectedRows <= 0)
      return res.status(404).json({ msg: "Employeer not found" });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
