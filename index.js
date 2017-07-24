const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const indexRoute = require('./src/indexRoute.js');
const api = require('./src/api');
const app = express();

app.set('port', process.env.PORT || 3000);

//  Disable X-Powered-By Header
app.disable('x-powered-by');

//  Configure express to use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//  Static file
app.use(express.static(__dirname + '/public/build'));

//  Api Routers
app.use('/api', api);

//  React Routers   error routers will be resolved by React
app.use(indexRoute);

const server = http.createServer(app).listen(app.get('port'), () => {
  console.log(`Http server is listening on ${app.get('port')}`);
});