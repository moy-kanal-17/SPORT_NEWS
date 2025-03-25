const {
  addComments,
  deleteComments,
  updateComments,
  getCommentsById,
  getAllComments,
} = require("../controllers/comments.controller");
const router = require("express").Router();

router.post("/add", addComments);
router.get("/get-all-user", getAllComments);
router.delete("/delete-user/:id", deleteComments);
router.put("/update/:id", updateComments);
router.get("/get-by-id-user/:id", getCommentsById);

module.exports = router;
