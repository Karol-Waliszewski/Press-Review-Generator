// Modules
var express = require("express");
var router = express.Router();

// Options
const Options = require("../options");

// Controllers
const NewsController = require("../controllers/news");

// Dynamically generated routes for each category
for (let category in Options.categories) {
  router.get(`/${Options.categories[category]}/:page?`, async function(
    req,
    res
  ) {
    // Getting page index
    let page = req.params.page - 1 || 0;
    // Getting total amount of news for specific category
    let totalNews = await NewsController.countNews(
      Options.categories[category]
    );
    // Loading news of specific category for chosen page ]
    let news = await NewsController.loadNews({
      category: Options.categories[category],
      skip: page * Options.postsOnPage,
      limit: Options.postsOnPage
    });
    // Rendering view
    res.render("category", {
      news,
      page: page + 1,
      pages: Math.ceil(totalNews / Options.postsOnPage),
      category: Options.categories[category]
    });
  });
}

module.exports = router;
