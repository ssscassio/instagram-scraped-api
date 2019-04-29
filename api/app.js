var express = require('express');
const cors = require('cors');

const app = express();

// Enable Cross Origin Resource Sharing (CORS) for all origins
app.use(cors());

app.use(require('./route'));

// Server Starter
app.listen(process.env.PORT || 3000, function() {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});
