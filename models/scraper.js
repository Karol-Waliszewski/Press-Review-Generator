const Axios = require("axios");
const cheerio = require("cheerio");

const News = require("./news");

class Scrapper {
  constructor(source) {
    this.source = source;
  }

  loadNews() {
    switch (this.source) {
      case "prasowki.org":
        this.loadPrasowkiOrg();
        break;

      default:
        break;
    }
  }

  loadPrasowkiOrg() {
    let categories = ["polska", "swiat"];
    for (let category of categories) {
      Axios.get(`https://prasowki.org/category/${category}/`).then(response => {
        // If request is finished successfully
        if (response.status == 200) {
          let $ = cheerio.load(response.data);

          // Iterate over posts from first page
          $(".post").each((index, post) => {
            // Opening every single post
            $(post)
              .find(".cb-post-title a")
              .each((i, link) => {
                let url = $(link).attr("href");
                // If subrequest is finished successfully
                Axios.get(url).then(res => {
                  if (res.status == 200) {
                    $ = cheerio.load(res.data);

                    // Getting news data
                    let title = $(".entry-title")
                      .text()
                      .trim();

                    let text = $(".post > p")
                      .text()
                      .trim();

                    let date = $(".cb-date .updated")
                      .text()
                      .trim();

                    // Creating new news object
                    let news = new News({
                      title,
                      text,
                      date,
                      source: this.source
                    });

                    this.saveNews(news);
                  }
                });
              });
          });
        }
      });
    }
  }

  saveNews(news) {
    // Checking for duplicates
    News.exists({ title: news.title }).then(exists => {
      if (exists == false) {
        // Saving news to database
        news.save().then(() => {
          console.log("Saved");
        });
      }
    });
  }
}

module.exports = Scrapper;
