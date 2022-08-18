var express = require('express');
var cors = require('cors');
require('dotenv').config()

// Start of Exercise Configuration
const multer = require('multer');
// End of Exercise Configuration

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * API endpoint
 */

app.post("/api/fileanalyse", multer().single('upfile'), (req, res) => {
  const {originalname, mimetype, size} = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
