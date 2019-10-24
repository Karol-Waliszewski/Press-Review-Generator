const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Connecting to database
mongoose.connect(
  "mongodb://admin:prasowaadmin12@ds018839.mlab.com:18839/generator-prasowek",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const Scrapper = require("./models/scraper");

let s = new Scrapper("prasowki.org");
s.loadNews();

app.get("/", (req, res) => {
  res.send("express");
});

app.listen(PORT, () => {
  console.log("App is listening on port: " + PORT);
});
