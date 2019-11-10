const Axios = require("axios");
const cheerio = require("cheerio");

const Options = require("../options");

class Scrapper {
  constructor({ source }) {
    this.source = source;
  }

  async getNews() {
    switch (this.source) {
      case "prasowki.org":
        return await this.getPrasowkiOrg();

      case "prasowkinawos.pl":
        return await this.getPrasowkiNaWos();

      default:
        return [];
    }
  }

  async getPrasowkiOrg() {
    let categories = ["polska", "swiat"];
    let newsArray = [];
    // Iterate over categories
    for (let category of categories) {
      let categoryArray = [];
      let page = 1;
      let running = true;

      // Iterate over pages
      while (running) {
        let response = await Axios.get(
          `https://prasowki.org/category/${category}/page/${page}`
        );
        // If request is finished successfully
        if (response.status == 200) {
          // Loading HTML
          let $ = cheerio.load(response.data);
          // Iterate over posts from the page
          $(".post").each((index, post) => {
            // Opening every single post
            $(post)
              .find(".cb-post-title a")
              .each(async (i, link) => {
                let url = $(link).attr("href");
                // If subrequest is finished successfully
                response = await Axios.get(url);
                if (response.status == 200) {
                  // Loading HTML
                  $ = cheerio.load(response.data);

                  // Getting news data
                  let title = $(".entry-title")
                    .text()
                    .trim();

                  let text = $(".post > p")
                    .text()
                    .trim();

                  let date = $(".cb-date .updated")
                    .attr("datetime")
                    .trim();

                  // Creating news object
                  let news = {
                    title,
                    text,
                    date: new Date(date),
                    source: this.source,
                    sourceURL: url,
                    category:
                      category == "polska"
                        ? Options.categories.country
                        : Options.categories.world
                  };

                  // Checking if news is not too old
                  if (news.date >= Options.oldNews) {
                    // Pushing news to array
                    categoryArray.push(news);
                    running = false;
                  }
                }
              });
          });
        }
        page++;
      }

      newsArray.push(...categoryArray);
    }
    return newsArray;
  }

  async getPrasowkiNaWos() {
    let categories = ["z-kraju", "ze-swiata"];
    let newsArray = [];
    // Iterate over categories
    for (let category of categories) {
      let categoryArray = [];
      let page = 1;
      let running = true;
      // Iterate over pages
      while (running) {
        let response = await Axios.get(
          `https://prasowkinawos.pl/${category}/page/${page}`
        );
        // If request is finished successfully
        if (response.status == 200) {
          // Loading HTML
          let $ = cheerio.load(response.data);
          // Iterate over posts from the page
          $(".cactus-post-item").each((index, post) => {
            // Opening every single post
            $(post)
              .find(".picture-content>a")
              .each(async (i, link) => {
                let url = $(link).attr("href");
                // If subrequest is finished successfully
                response = await Axios.get(url);
                if (response.status == 200) {
                  // Loading HTML
                  $ = cheerio.load(response.data);

                  // Getting news data
                  let title = $(".title")
                    .text()
                    .trim();

                  let text = $(".body-content > p")
                    .text()
                    .trim();

                  let date = $(".heading-post .cactus-info>.entry-date")
                    .attr("datetime")
                    .trim();

                  // Creating news object
                  let news = {
                    title,
                    text,
                    date: new Date(date),
                    source: this.source,
                    sourceURL: url,
                    category:
                      category == "z-kraju"
                        ? Options.categories.country
                        : Options.categories.world
                  };

                  // Checking if news is not too old
                  if (news.date >= Options.oldNews) {
                    // Pushing news to array
                    categoryArray.push(news);
                    running = false;
                  }
                }
              });
          });
        }
        page++;
      }

      newsArray.push(...categoryArray);
    }
    return newsArray;
  }
}

module.exports = Scrapper;
