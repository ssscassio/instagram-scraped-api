const crawler = require('./crawler/crawler.js')();

// // Scrap User Info Example
// crawler.scrapUserInfo(process.argv[2]).then(response => {
//   console.log(response);
//   crawler.finish();
// });

// // Scrap Search result
// crawler.searchUser(process.argv[3]).then(response => {
//   console.log(response);
//   crawler.finish();
// });

// // Scrap User Media
// crawler.scrapUserFeed(process.argv[2], process.argv[3]).then(response => {
//   console.log(response);
//   crawler.finish();
// });

// Scrap Specific Media
crawler.scrapMediaInfo(process.argv[2]).then(response => {
  console.log(response);
  crawler.finish();
});
