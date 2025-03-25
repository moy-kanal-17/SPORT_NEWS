const {
  addReports,
  deleteReports,
  updateReports,
  getReportsById,
  getAllReports,
} = require("../controllers/reports.controller");
const router = require("express").Router();

router.post("/add", addReports);
router.get("/get-all-user", getAllReports);
router.delete("/delete-user/:id", deleteReports);
router.put("/update/:id", updateReports);
router.get("/get-by-id-user/:id", getReportsById);

module.exports = router;
