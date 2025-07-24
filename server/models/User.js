const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar:   { type: String },
  bio:      { type: String },

  headline:      { type: String }, // titre pro
  location:      { type: String },
  website:       { type: String },
  phone:         { type: String },

  experiences: [
    {
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      current: Boolean,
      description: String,
    }
  ],

  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
    }
  ],

  skills:      [String],
  followers:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
