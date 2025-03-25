const pool = require("../config/db");

const getViewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(`SELECT views FROM Comments WHERE id=$1`, [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment topilmadi" });
    }

    res.json({ views: result.rows[0].views });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ma'lumot olishda xatolik" });
  }
};

const increaseViews = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await pool.query(
      `UPDATE Comments SET views = views + 1 WHERE id=$1 RETURNING views`,
      [id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Comment topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Views oshirildi", views: update.rows[0].views });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

const decreaseViews = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await pool.query(
      `UPDATE Comments SET views = GREATEST(views - 1, 0) WHERE id=$1 RETURNING views`,
      [id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Comment topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Views kamaytirildi", views: update.rows[0].views });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

module.exports = { getViewsById, increaseViews, decreaseViews };
