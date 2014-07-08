var express = require('express');
var RestaurantModel = require(__dirname + '/app/models/restaurant');
var routes = require(__dirname + '/app/routes.js');

RestaurantModel.drop();
RestaurantModel.loadExampleData();

var app = express();

var port = process.env.PORT || 3000;

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());  //needed to parse body of req object from post requests
});

routes(app, RestaurantModel);

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});
