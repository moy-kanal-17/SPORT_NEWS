const {
  getViewsById,
  increaseViews,
  decreaseViews,
} = require("../controllers/views.controller");
const router = require("express").Router();

router.get("/:id", getViewsById);
router.put("/increase/:id", increaseViews);
router.put("/decrease/:id", decreaseViews);

module.exports = router;
