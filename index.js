const crawler = require("./crawler/crawler.js")(process.argv[2]);

// // Scrap User Info Example
// crawler.scrapUserInfo().then(response => {
//   console.log(response);
//   crawler.finish();
// });

// // Scrap Search result
// crawler.searchUser(process.argv[3]).then(response => {
//   console.log(response);
//   crawler.finish();
// });

// Scrap User Media
crawler.scrapUserFeed(process.argv[3]).then(response => {
  console.log(response);
  crawler.finish();
});
