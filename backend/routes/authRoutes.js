const express = require("express");
const loginLimiter = require("../middleware/rateLimiter"); //Import the rate limiter middleware to limit login attempts.
const { registerAdmin, loginAdmin, checkAuth, logoutAdmin } = require("../controllers/authController");  //When a post request comes to register, run registerAdmin.
const router = express.Router();
router.post("/register", registerAdmin);
router.post("/login", loginLimiter, loginAdmin);
router.get("/check", checkAuth);
router.post("/logout", logoutAdmin);

module.exports = router;
