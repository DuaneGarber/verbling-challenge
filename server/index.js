'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const REST_PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('../client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = app.listen(REST_PORT, function () {
  let host = this.address().address;
  host === '::' ? host = 'localhost' : true;
  const port = this.address().port;

  console.log(`Express server listening on http://${host}:${port}`);
});
