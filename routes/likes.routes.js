const {
  getLikesById,
  increaseLikes,
  decreaseLikes,
} = require("../controllers/likes.controller");
const router = require("express").Router();

router.get("/:id", getLikesById);
router.put("/increase/:id", increaseLikes);
router.put("/decrease/:id", decreaseLikes);

module.exports = router;
