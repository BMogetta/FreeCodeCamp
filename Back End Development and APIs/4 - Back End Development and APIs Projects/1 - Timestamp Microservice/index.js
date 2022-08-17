// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**
 * API endpoint
 */

 app.get("/api/", function (req, res) {
  const unixDate = new Date().getTime();
  const utcDate = new Date(unixDate).toGMTString();

  res.json({
    unix: unixDate,
    utc: utcDate
  });
});

app.get("/api/:date?", (req,res) => {
  const { date } = req.params;
  let unixDate = "", utcDate = "";

  !isNaN(date) ? unixDate = Number(date) : unixDate = Date.parse(date);

  utcDate = new Date(unixDate).toUTCString();
  
  if (!unixDate && unixDate !== 0) {
    res.json({
    error : "Invalid Date"
  });
  } else {
      res.json({
        unix: unixDate,
        utc: utcDate
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
