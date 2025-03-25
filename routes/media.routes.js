const {
  addMedia,
  deleteMedia,
  updateMedia,
  getMediaById,
  getAllMedia,
} = require("../controllers/medias.controller");
const router = require("express").Router();

router.post("/add", addMedia);
router.get("/get-all-user", getAllMedia);
router.delete("/delete-user/:id", deleteMedia);
router.put("/update/:id", updateMedia);
router.get("/get-by-id-user/:id", getMediaById);

module.exports = router;
