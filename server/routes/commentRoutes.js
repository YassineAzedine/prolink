const express = require("express");
const router = express.Router();
const {
  addComment,
  getComments,
} = require("../controllers/commentController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Ajouter un commentaire à un post (auth)
router.post("/", verifyToken, addComment);

// Récupérer commentaires d’un post
router.get("/:postId", getComments);

module.exports = router;
