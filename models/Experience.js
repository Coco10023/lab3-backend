const mongoose = require("mongoose");

// Schema som definierar strukturen för en arbetserfarenhet
const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Experience", experienceSchema);