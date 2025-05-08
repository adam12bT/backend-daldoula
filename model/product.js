
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  posterID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  budget: { type: Number, required: true },
  deadline: { type: Date, required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["open", "in progress", "completed", "closed"], default: "open" }
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
