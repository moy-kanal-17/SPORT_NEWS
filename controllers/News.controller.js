const pool = require("../config/db");

const addNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title va content majburiy" });
    }

    const newNews = await pool.query(
      `INSERT INTO News (title, content) VALUES ($1, $2) RETURNING *`,
      [title, content]
    );

    res
      .status(201)
      .json({ message: "Yangi yangilik qo'shildi", news: newNews.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

const getAllNews = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM News");
    res.json({ news: results.rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const getNewsById = async (req, res) => {
  try {
    const id = req.params.id;

    const results = await pool.query(`SELECT * FROM News WHERE id=$1`, [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Yangilik topilmadi" });
    }

    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const updateNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;

    const update = await pool.query(
      `UPDATE News SET title=$1, content=$2 WHERE id=$3 RETURNING *`,
      [title, content, id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Yangilik topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Yangilik yangilandi", news: update.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteNews = await pool.query(
      `DELETE FROM News WHERE id=$1 RETURNING *`,
      [id]
    );

    if (deleteNews.rowCount === 0) {
      return res.status(404).json({ error: "Yangilik topilmadi" });
    }

    res.status(200).json({ message: "Yangilik o'chirildi" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "O‘chirishda xatolik" });
  }
};

module.exports = {
  addNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
