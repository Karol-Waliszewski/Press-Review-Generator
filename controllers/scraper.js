class ScraperController {
  constructor(scrapers) {
    this.scrapers = scrapers;
  }

  async getNews() {
    let news = [];
    for (let scraper of this.scrapers) {
      news.push(...await scraper.getNews());
    }

    return news;
  }
}

module.exports = ScraperController;
