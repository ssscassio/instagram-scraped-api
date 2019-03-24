var express = require("express");

const app = express();

app.use(require("./route"));

// Server Starter
app.listen(process.env.PORT || 3000, function() {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});
