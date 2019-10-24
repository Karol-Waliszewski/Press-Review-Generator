const mongoose = require("mongoose");

const News = mongoose.model("News", {
  title: String,
  text: String,
  source: String,
  date: String
});

module.exports = News;
