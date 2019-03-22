const crawler = require("./crawler/crawler.js")(process.argv[2]);

crawler.scrapUserInfo().then(response => {
  console.log(response);
});
