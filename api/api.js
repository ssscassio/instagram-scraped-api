var express = require("express");

var app = express();

var userRouter = require("./user.js");

app.use("/user", userRouter);

// Server Starter
app.listen(3000, function() {
  console.log("App listening on port 3000");
});
