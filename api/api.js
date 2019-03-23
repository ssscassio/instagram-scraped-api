var express = require("express");

var app = express();

var userRouter = require("./users.js");

app.use("/users", userRouter);

// Server Starter
app.listen(process.env.PORT || 3000, function() {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});
