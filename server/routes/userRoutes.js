const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

// Inscription
// router.post("/register", registerUser);

// // Connexion
// router.post("/login", loginUser);

// Profil utilisateur (protégé)
// router.get("/:id", verifyToken, getUserProfile);

module.exports = router;
