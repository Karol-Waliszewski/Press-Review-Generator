const News = require("../models/news");

const NewsController = {
  formatDate(date) {
    date = new Date(date);
    return `${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    }-${date.getMonth() + 1}-${date.getFullYear()}`;
  },

  loadNews({ category, callback, skip, limit }) {
    let query = category ? { category } : {};
    skip = skip || 0;

    if (limit) {
      News.find(query)
        .skip(skip)
        .limit(limit)
        .exec(callback);
    } else {
      News.find(query)
        .skip(skip)
        .exec(callback);
    }
  },

  async getByID(id) {
    return await News.find({ _id: id });
  },

  saveNews(news) {
    if (!Array.isArray(news)) {
      news = [news];
    }
    for (let singleNews of news) {
      singleNews.date = NewsController.formatDate(singleNews.date);
      singleNews = new News(singleNews);
      // Checking for duplicates
      News.exists({ title: singleNews.title }).then(exists => {
        if (exists == false) {
          // Saving news to database
          singleNews.save().then(() => {
            console.log("News has been saved to the database");
          });
        }
      });
    }
  },

  async countNews() {
    let quantity = await News.countDocuments();
    return quantity;
  },

  clearNews() {
    let old = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    console.log(NewsController.formatDate(old));
    News.deleteMany({ date: { $lte: NewsController.formatDate(old) } }).exec(
      () => {
        console.log("sukces?");
      }
    );
  }
};

module.exports = NewsController;
