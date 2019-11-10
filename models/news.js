const mongoose = require("mongoose");

const News = mongoose.model("News", {
  title: String,
  text: String,
  source: String,
  sourceURL: String,
  date: Date,
  category: String
});

module.exports = News;
