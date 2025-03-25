const pool = require("../config/db");

const getLikesById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(`SELECT likes FROM Comments WHERE id=$1`, [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment topilmadi" });
    }

    res.json({ likes: result.rows[0].likes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ma'lumot olishda xatolik" });
  }
};
const increaseLikes = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await pool.query(
      `UPDATE Comments SET likes = likes + 1 WHERE id=$1 RETURNING likes`,
      [id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Comment topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Likes oshirildi", likes: update.rows[0].likes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

const decreaseLikes = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await pool.query(
      `UPDATE Comments SET likes = GREATEST(likes - 1, 0) WHERE id=$1 RETURNING likes`,
      [id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Comment topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Likes kamaytirildi", likes: update.rows[0].likes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

module.exports = { getLikesById, increaseLikes, decreaseLikes };
