const {
  addUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controllers/Users.controller");
const router = require("express").Router();

router.post("/add", addUser);
router.get("/get-all-user", getAllUsers);
router.delete("/delete-user/:id", deleteUser);
router.put("/update/:id", updateUser);
router.get("/get-by-id-user/:id", getUserById);

module.exports = router;
