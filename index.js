require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shorturl = require("./models/shortUrl")

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", { useNewUrlParser: true, useUnifiedTopology: true });

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});



app.post("/api/shorturl", async (req, res) => {
  let blo = await shorturl.create({ full: req.body.url })
  console.log(blo.short)
  res.json({ original_url: blo.full, short_url: blo.short })
})

/* app.get("/api/shorturl", async (req, res) => {
  const short_url = await shorturl.findOne({ full: "https://forums.ultra-combo.com/" })
}) */

/* app.post("/api/shorturl", (req, res) => {
  res.json({ "original_url": req.body.url, "short_url": req.body.short })
}) */

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
