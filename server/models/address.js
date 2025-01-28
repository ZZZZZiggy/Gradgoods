const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  formatted_address: String,
  lat: Number,
  lng: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("address", AddressSchema);
