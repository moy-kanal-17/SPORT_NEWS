const pool = require("../config/db");

const addNewsWithLang = async (req, res) => {
  try {
    const { news_id, lang, title, content } = req.body;

    if (!news_id || !lang || !title || !content) {
      return res
        .status(400)
        .json({ error: "Barcha maydonlar to'ldirilishi kerak" });
    }

    const newNewsLang = await pool.query(
      `INSERT INTO NewsWithLangs (news_id, lang, title, content) VALUES ($1, $2, $3, $4) RETURNING *`,
      [news_id, lang, title, content]
    );

    res
      .status(201)
      .json({
        message: "Yangilik tarjimasi qo'shildi",
        news: newNewsLang.rows[0],
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

const getAllNewsWithLangs = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM NewsWithLangs");
    res.json({ news: results.rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const getNewsWithLangById = async (req, res) => {
  try {
    const id = req.params.id;

    const results = await pool.query(
      `SELECT * FROM NewsWithLangs WHERE id=$1`,
      [id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Yangilik tarjimasi topilmadi" });
    }

    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const updateNewsWithLang = async (req, res) => {
  try {
    const { lang, title, content } = req.body;
    const id = req.params.id;

    const update = await pool.query(
      `UPDATE NewsWithLangs SET lang=$1, title=$2, content=$3 WHERE id=$4 RETURNING *`,
      [lang, title, content, id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Yangilik tarjimasi topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Yangilik tarjimasi yangilandi", news: update.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

const deleteNewsWithLang = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteNewsLang = await pool.query(
      `DELETE FROM NewsWithLangs WHERE id=$1 RETURNING *`,
      [id]
    );

    if (deleteNewsLang.rowCount === 0) {
      return res.status(404).json({ error: "Yangilik tarjimasi topilmadi" });
    }

    res.status(200).json({ message: "Yangilik tarjimasi o'chirildi" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "O‘chirishda xatolik" });
  }
};

module.exports = {
  addNewsWithLang,
  getAllNewsWithLangs,
  getNewsWithLangById,
  updateNewsWithLang,
  deleteNewsWithLang,
};
