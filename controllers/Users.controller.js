const pool = require("../config/db");

const addUser = async (req, res) => {
  try {
    const { name, user_code } = req.body;

    if (!name || !user_code) {
      return res.status(400).json({ error: "Ism va user_code majburiy" });
    }

    const newUser = await pool.query(
      `INSERT INTO users (name, user_code) VALUES ($1, $2) RETURNING *`,
      [name, user_code]
    );

    res.status(201).json({
      message: "Yangi foydalanuvchi qo‘shildi",
      newUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Serverda xatolik",error });
    console.error(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users");
    res.json({ users: results.rows });
  } catch (error) {
    res.status(500).json({ error: "Ma'lumotlarni olishda xatolik" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    res.json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Ma'lumotlarni olishda xatolik" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, user_code } = req.body;
    const id = req.params.id;

    const update = await pool.query(
      "UPDATE users SET name=$1, user_code=$2 WHERE id=$3 RETURNING *",
      [name, user_code, id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Foydalanuvchi yangilandi", user: update.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUser = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );

    if (deleteUser.rowCount === 0) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    res.status(200).json({ message: "Foydalanuvchi o‘chirildi" });
  } catch (error) {
    res.status(500).json({ error: "O‘chirishda xatolik" });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
