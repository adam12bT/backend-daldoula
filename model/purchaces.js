
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  jobID: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  senderID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Job poster
  receiverID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Job seeker
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "Bank Transfer"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
