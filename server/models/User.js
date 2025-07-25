const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Champs obligatoires
  fullName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },

  // Champs optionnels
  avatar:    { type: String },
  bio:       { type: String },
  headline:  { type: String }, // Titre professionnel (ex: Développeur Full Stack)
  location:  { type: String },
  website:   { type: String },
  phone:     { type: String },

  experiences: [
    {
      title:       { type: String },
      company:     { type: String },
      startDate:   { type: Date },
      endDate:     { type: Date },
      current:     { type: Boolean, default: false },
      description: { type: String },
    }
  ],

  education: [
    {
      school:       { type: String },
      degree:       { type: String },
      fieldOfStudy: { type: String },
      startDate:    { type: Date },
      endDate:      { type: Date },
    }
  ],

  skills:      [{ type: String }],
  followers:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
