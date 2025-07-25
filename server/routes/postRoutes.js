const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  toggleLike,
} = require("../controllers/postController");
const { verifyToken } = require("../middleware/authMiddleware");

// Créer un post (auth)
router.post("/", verifyToken, createPost);

// Récupérer tous les posts
router.get("/", getPosts);

// Liker / Unliker un post (auth)
router.put("/:id/like", verifyToken, toggleLike);

module.exports = router;
