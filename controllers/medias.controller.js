const pool = require("../config/db");

const addMedia = async (req, res) => {
  try {
    const { news_id,media_type,media_url,uploaded_at } = req.body;

    if (!news_id||!media_type ||!media_url ||!uploaded_at) {
      return res.status(400).json({ error: "malumotlar majburiiy!!! (media.controller.js dan) majburiy" });
    }
    const newMedia = await pool.query(
      `INSERT INTO Media (news_id,media_type,media_url,uploaded_at) VALUES ($1,$2,$3,$4) RETURNING *`,
      [news_id, media_type, media_url, uploaded_at]
    );

    res
      .status(201)
      .json({ message: "Yangi yangilik qo'shildi", media: newMedia.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM Media");
    res.json({ media: results.rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const getMediaById = async (req, res) => {
  try {
    const id = req.params.id;

    const results = await pool.query(`SELECT * FROM Media WHERE id=$1`, [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Media topilmadi" });
    }

    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const updateMedia = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;

    const update = await pool.query(
      `UPDATE Media SET news_id=$1,media_type=$2,media_url=$4,uploaded_at=$5 WHERE id=$6 RETURNING *`,
      [news_id, media_type, media_url, uploaded_at,id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Media topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Media yangilandi", media: update.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteMedia = await pool.query(
      `DELETE FROM Media WHERE id=$1 RETURNING *`,
      [id]
    );

    if (deleteMedia.rowCount === 0) {
      return res.status(404).json({ error: "Media topilmadi" });
    }

    res.status(200).json({ message: "Media o'chirildi" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "O‘chirishda xatolik" });
  }
};

module.exports = {
  addMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};
