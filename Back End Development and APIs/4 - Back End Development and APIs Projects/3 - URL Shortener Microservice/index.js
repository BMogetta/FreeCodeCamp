require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dns = require('dns');
const urlParser = require('url');

// Basic Configuration
const port = process.env.PORT || 3000;

// Start of Exercise Configuration

app.use(bodyParser.urlencoded( {extended: false} ));

const URI = process.env.MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema = mongoose.Schema({
  url : {
    type: String,
    require: true
  }
})

const Url = mongoose.model('Url', urlSchema)

// End of Exercise Configuration

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * API endpoint
 */

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  dns.lookup(urlParser.parse(url).hostname, (error, ipAddress) => {
    if(!ipAddress) {
      console.error(error);
      res.json( {error: "Invalid URL"} );
    } else {
      Url.create( { url: url}, (error, data) => {
        error
        ? console.error(error)
        : res.json({
            original_url: data.url,
            short_url: data.id
          })
      })
    }
  }) 
});

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id;
  console.log("/api/shorturl/:id", req.baseUrl, "id", id);
  Url.findById(id, (error, stored) => {
    if(!stored) {
      console.log(error);
      res.json({ error: "Invalid URL"});
    } else {
      res.redirect(301, stored.url);
    } 
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
