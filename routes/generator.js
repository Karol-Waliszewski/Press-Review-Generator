// Modules
var express = require("express");
var router = express.Router();

// Options
const Options = require("../options");

// Controllers
const NewsController = require("../controllers/news");

// Dynamically generated routes for each category
for (let category in Options.categories) {
  router.get(`/${Options.categories[category]}/:quantity`, async (req, res) => {
    let news = await NewsController.loadRandomNews({
      category: Options.categories[category],
      quantity: req.params.quantity
    });
    let response = "";
    for (let nw of news) {
      response += `
  ${nw.title} (${nw.category})
  ${nw.text}
  `;
    }
    res.render("generator", {
      // Collecting news for specific category
      news,
      response
    });
  });
}

router.get("/:quantity", async (req, res) => {
  let news = [];
  // Collecting news for each category
  for (let category in Options.categories) {
    news = [
      ...news,
      ...(await NewsController.loadRandomNews({
        category: Options.categories[category],
        quantity: req.params.quantity
      }))
    ];
  }
  let response = "";
  for (let nw of news) {
    response += `
${nw.title} (${nw.category})
${nw.text}
`;
  }

  res.render("generator", {
    news,
    response
  });
});


module.exports = router;
