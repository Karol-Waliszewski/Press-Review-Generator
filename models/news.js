const mongoose = require("mongoose");

const News = mongoose.model("News", {
  title: String,
  text: String,
  source: String,
  sourceURL: String,
  date: String,
  category: String
});

module.exports = News;
