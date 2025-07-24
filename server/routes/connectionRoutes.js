const express = require("express");
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  declineRequest,
} = require("../controllers/connectionController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Envoyer une demande de connexion
router.post("/request", verifyToken, sendRequest);

// Accepter une demande
router.put("/accept/:id", verifyToken, acceptRequest);

// Refuser une demande
router.put("/decline/:id", verifyToken, declineRequest);

module.exports = router;
