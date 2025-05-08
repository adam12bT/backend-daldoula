const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },

  role: { type: String, enum: ["job_poster", "job_seeker", "admin"], required: true },
  skills: { type: [String] },
  rating: { type: Number, min: 1, max: 5 },
  bio: { type: String, },
  image: { type: String }, 

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}, {
  timestamps: true



});

module.exports = mongoose.model("user", UserSchema);
