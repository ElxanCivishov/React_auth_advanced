const express = require("express");
const {
  regsiterUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", (req, res) => {
  res.send({
    message: "users",
    success: true,
  });
});

router.post("/register", regsiterUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", protect, getUser);

module.exports = router;
