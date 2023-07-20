const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: Number,
    required: true,
    default: Math.floor((Math.random() * 10000) + 1)
  }
});

module.exports = mongoose.model("shorturl", shortUrlSchema);