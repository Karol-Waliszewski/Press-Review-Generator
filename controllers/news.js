const News = require("../models/news");
const Options = require("../options");

const NewsController = {
  async loadNews({ category, skip, limit }) {
    let query = category ? { category } : {};
    skip = skip || 0;

    // Checing if limit is declared
    if (limit) {
      // Returning specific amount of news
      return await News.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ date: -1 });
    }
    // Returning news skipped by 'skip'
    return await News.find(query)
      .skip(skip)
      .sort({ date: -1 });
  },

  async getByID(id) {
    // Returning News by ID
    return await News.find({ _id: id });
  },

  async loadRandomNews({ quantity, category }) {
    // Loading news for specific category
    let news = await NewsController.loadNews({ category });

    // If quantity is higher than news.length, return all news
    if (quantity >= news.length) {
      return news;
    }

    // Declaring empty arrays
    let indexes = [];
    let randomNews = [];

    if (news.length) {
      // Loop generating indexes based on news length without duplicates
      while (indexes.length < quantity) {
        let index = Math.floor(Math.random() * news.length);
        if (!indexes.includes(index)) {
          indexes.push(index);
        }
      }
      // Getting news with generated indexes
      for (let index of indexes) {
        randomNews.push(news[index]);
      }
    }

    //console.log(randomNews);

    // Returning randomly chosed news
    return randomNews;
  },

  async saveNews(news) {
    if (!Array.isArray(news)) {
      news = [news];
    }
    for (let singleNews of news) {
      // Creating new News object
      singleNews = new News(singleNews);
      // Checking for duplicates
      await News.exists({ title: singleNews.title }).then(async exists => {
        if (exists == false) {
          // Saving news to database
          await singleNews.save().then(() => {
            console.log("News has been saved to the database");
          });
        }
      });
    }
  },

  async countNews(category) {
    if (category) return await News.countDocuments({ category });
    return await News.countDocuments();
  },

  clearNews() {
    News.deleteMany({ date: { $lte: Options.oldNews.valueOf() } }).exec(() => {
      console.log("Deleted news older than expected.");
    });
  }
};

module.exports = NewsController;
