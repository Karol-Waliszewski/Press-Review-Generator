const OPTIONS = {
  postsOnPage: 8,
  oldNews: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  categories: {
    country: "kraj",
    world: "swiat"
  }
};

module.exports = OPTIONS;
