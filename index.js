const crawler = require("./crawler/crawler.js")(process.argv[2]);

// // Scrap User Info Example
// crawler.scrapUserInfo().then(response => {
//   console.log(response);
//   crawler.finish();
// });

// Scrap Search result
crawler.searchUser('Teste').then(response => {
  console.log(response);
  crawler.finish();
});
