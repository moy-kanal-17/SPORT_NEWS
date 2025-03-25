const pool = require("../config/db");

const addComments = async (req, res) => {
  try {
    const { user_id,news_id,content,created_at,reply_comment_id,is_approved,is_deleted,views,likes } = req.body;

    if ( !user_id||!news_id||!content||!created_at||!reply_comment_id||!is_approved||!is_deleted||!views||!likes) {
      return res
        .status(400)
        .json({
          error: "malumotlar majburiiy!!! (comments.controller.js dan) majburiy",
        });
    }
    const newComments = await pool.query(
      `INSERT INTO Comments (user_id,news_id,content,created_at,reply_comment_id,is_approved,is_deleted,views,likes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        user_id,
        news_id,
        content,
        created_at,
        reply_comment_id,
        is_approved,
        is_deleted,
        views,
        likes,
      ]
    );

    res
      .status(201)
      .json({ message: "Yangi comments qo'shildi", comments: newComments.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM Comments");
    res.json({ comments: results.rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const getCommentsById = async (req, res) => {
  try {
    const id = req.params.id;

    const results = await pool.query(`SELECT * FROM Comments WHERE id=$1`, [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Comments topilmadi" });
    }

    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const updateComments = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;

    const update = await pool.query(
      `UPDATE Comments SET user_id=$1,news_id=$2,content=$3,created_at=$4,reply_comment_id=$5,is_approved=$6,is_deleted=$7,views=$8,likes=$9 WHERE id=$10 RETURNING *`,
      [user_id,news_id,content,created_at,reply_comment_id,is_approved,is_deleted,views,likes, id]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Comments topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Comments yangilandi", comments: update.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

const deleteComments = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteComments = await pool.query(
      `DELETE FROM Comments WHERE id=$1 RETURNING *`,
      [id]
    );

    if (deleteComments.rowCount === 0) {
      return res.status(404).json({ error: "Comments topilmadi" });
    }

    res.status(200).json({ message: "Comments o'chirildi" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "O‘chirishda xatolik" });
  }
};

module.exports = {
  addComments,
  getAllComments,
  getCommentsById,
  updateComments,
  deleteComments,
};
