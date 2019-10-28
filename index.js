// Modules
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const hbs = require("express-handlebars");

// Models
const Scraper = require("./models/scraper");

// Controllers
const ScraperController = require("./controllers/scraper");
const NewsController = require("./controllers/news");

// Options
const Options = require("./options");

// Initialization of the application
const app = express();
const PORT = process.env.PORT || 3000;

// Connecting to database
mongoose.connect(
  "mongodb://admin:prasowaadmin12@ds018839.mlab.com:18839/generator-prasowek",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var store = new mongoStore({
  mongooseConnection: mongoose.connection
});

// Initialization of session
app.use(
  session({
    secret: "grg",
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 5 * 60 * 60 * 100
    }
  })
);

// Setting up a view engine

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: {
      for: function(n, block) {
        var accum = "";
        for (var i = 1; i <= n; i++) {
          accum += block.fn(i);
        }
        return accum;
      }
    }
  })
);
app.set("view engine", "hbs");

// Creating scrapers
var s1 = new Scraper({
  source: "prasowki.org",
  pages: 3
});
var s2 = new Scraper({
  source: "prasowkinawos.pl",
  pages: 3
});
var scraperController = new ScraperController([s1, s2]);

async function manageDatabase() {
  NewsController.saveNews(await scraperController.getNews());
  NewsController.countNews();

  // TODO: fix cleaner
  //NewsController.clearNews();
}
manageDatabase();
setInterval(manageDatabase, 1000 * 60 * 60 * 24);

// Middlewares
app.use(function(req, res, next) {
  next();
});

// Routes
app.get("/:page?", (req, res) => {
  let page = req.params.page - 1 || 0;
  NewsController.loadNews({
    skip: page * Options.postsOnPage,
    limit: Options.postsOnPage,
    callback: async (err, response) => {
      let newsQantity = await NewsController.countNews();
      res.render("home", {
        news: response,
        pages: Math.ceil(newsQantity / Options.postsOnPage)
      });
    }
  });
});

app.use("/kategoria", require("./routes/category"));
app.use("/artykul", require("./routes/article"));

// Listening to the port
app.listen(PORT, () => {
  console.log("App is listening on port: " + PORT);
});
