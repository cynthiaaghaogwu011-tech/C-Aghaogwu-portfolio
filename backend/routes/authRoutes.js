const express = require("express");
const { registerAdmin, loginAdmin, checkAuth, logoutAdmin } = require("../controllers/authController");  //When a post request comes to register, run registerAdmin.
const router = express.Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/check", checkAuth);
router.post("/logout", logoutAdmin);

module.exports = router;
