// Modules
var express = require("express");
var router = express.Router();

// Controllers
const NewsController = require("../controllers/news");

router.get("/:id", async (req, res) => {
  let article = await NewsController.getByID(req.params.id);
  res.render("article", { article });
});

module.exports = router;
