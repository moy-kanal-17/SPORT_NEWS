const pool = require("../config/db");

const addReports = async (req, res) => {
  try {
    const {
      user_id,
      news_id,
      reason,
      status,
      created_at
    } = req.body;

    if ((!user_id || !news_id || !reason ||!status||! created_at)) {
      return res.status(400).json({
        error: "malumotlar majburiiy!!! (reports.controller.js dan) majburiy",
      });
    }
    const newReports = await pool.query(
      `INSERT INTO Reports (user_id, news_id, reason, status, created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [user_id, news_id, reason, status, created_at]
    );

    res
      .status(201)
      .json({
        message: "Yangi reports qo'shildi",
        reports: newReports.rows[0],
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Serverda xatolik" });
  }
};

const getAllReports = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM Reports");
    res.json({ reports: results.rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const getReportsById = async (req, res) => {
  try {
    const id = req.params.id;

    const results = await pool.query(`SELECT * FROM Reports WHERE id=$1`, [
      id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Reports topilmadi" });
    }

    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Malumot olishda xatolik" });
  }
};

const updateReports = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;

    const update = await pool.query(
      `UPDATE Reports SET user_id=$1,news_id=$2,reason=$3, status=$4, created_at=$5 WHERE id=$6 RETURNING *`,
      [
user_id, news_id, reason, status, created_at,id
      ]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ error: "Reports topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Reports yangilandi", reports: update.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Yangilashda xatolik" });
  }
};

const deleteReports = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteReports = await pool.query(
      `DELETE FROM Reports WHERE id=$1 RETURNING *`,
      [id]
    );

    if (deleteReports.rowCount === 0) {
      return res.status(404).json({ error: "Reports topilmadi" });
    }

    res.status(200).json({ message: "Reports o'chirildi" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "O‘chirishda xatolik" });
  }
};

module.exports = {
  addReports,
  getAllReports,
  getReportsById,
  updateReports,
  deleteReports,
};
