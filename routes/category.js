// Modules
var express = require("express");
var router = express.Router();

// Options
const Options = require("../options");

// Controllers
const NewsController = require("../controllers/news");

router.get("/swiat/:page?", function(req, res) {
  let page = req.params.page - 1 || 0;
  NewsController.loadNews({
    category: "świat",
    callback: (err, response) => {
      res.render("category", {
        news: response.splice(page * Options.postsOnPage, Options.postsOnPage),
        pages: Math.ceil(response.length / Options.postsOnPage),
        category: "swiat"
      });
    }
  });
});

router.get("/kraj/:page?", function(req, res) {
  let page = req.params.page - 1 || 0;
  NewsController.loadNews({
    category: "kraj",
    callback: (err, response) => {
      res.render("category", {
        news: response.splice(page * Options.postsOnPage, Options.postsOnPage),
        pages: Math.ceil(response.length / Options.postsOnPage),
        category: "kraj"
      });
    }
  });
});

module.exports = router;
