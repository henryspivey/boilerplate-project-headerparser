// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
const fetch = require('node-fetch');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// {"ipaddress":"2601:646:9b82:490:7092:efe:c345:d9b6","language":"en-US,en;q=0.9,ru;q=0.8,it;q=0.7,fr;q=0.6,de;q=0.5","software":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"}

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', async function (req, res){
  const {"accept-language": language, "user-agent": software} = req.headers
  const response = await fetch('https://api.ipify.org?format=json')
  const {ip:ipaddress} = await response.json()
  res.json({
    ipaddress,
    language,
    software

  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
