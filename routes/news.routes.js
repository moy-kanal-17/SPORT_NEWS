const { addNews, getAllNews, getNewsById, updateNews, deleteNews } = require("../controllers/news.controller");
const {
  addNewsWithLang,
  getAllNewsWithLangs,
  getNewsWithLangById,
  updateNewsWithLang,
  deleteNewsWithLang,
} = require("../controllers/NewsWithLangs.controller");

const router = require("express").Router();

router.post("/news/add", addNews);
router.get("/news/get-all", getAllNews);
router.get("/news/get-by-id/:id", getNewsById);
router.put("/news/update/:id", updateNews);
router.delete("/news/delete/:id", deleteNews);

router.post("/news-lang/add", addNewsWithLang);
router.get("/news-lang/get-all", getAllNewsWithLangs);
router.get("/news-lang/get-by-id/:id", getNewsWithLangById);
router.put("/news-lang/update/:id", updateNewsWithLang);
router.delete("/news-lang/delete/:id", deleteNewsWithLang);

module.exports = router;
