const Connection = require("../models/Connection");

// Send connection request
exports.sendRequest = async (req, res) => {
  try {
    const requester = req.user.id;
    const { recipientId } = req.body;

    // Check if already connected or request pending
    const existing = await Connection.findOne({
      $or: [
        { requester, recipient: recipientId },
        { requester: recipientId, recipient: requester },
      ],
    });

    if (existing) {
      return res.status(400).json({ message: "Connection request already exists" });
    }

    const connection = await Connection.create({
      requester,
      recipient: recipientId,
      status: "pending",
    });

    res.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Accept connection request
exports.acceptRequest = async (req, res) => {
  try {
    const connectionId = req.params.id;

    const connection = await Connection.findById(connectionId);
    if (!connection) return res.status(404).json({ message: "Request not found" });

    connection.status = "accepted";
    await connection.save();

    res.json({ message: "Connection accepted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Decline connection request
exports.declineRequest = async (req, res) => {
  try {
    const connectionId = req.params.id;

    const connection = await Connection.findById(connectionId);
    if (!connection) return res.status(404).json({ message: "Request not found" });

    connection.status = "declined";
    await connection.save();

    res.json({ message: "Connection declined" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
