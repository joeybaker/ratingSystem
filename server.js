var express = require('express');
var RestaurantModel = require(__dirname + '/app/models/restaurant');

RestaurantModel.drop();
RestaurantModel.loadExampleData();

var app = express();

var port = process.env.PORT || 3000;

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());  //needed to parse body of req object from post requests
});

app.get('/restaurants', function(req, res) {
  var all = RestaurantModel.find({}, 'name averageRating', function(err, restaurants) {
    if(!err) {
      console.log(restaurants);
      res.json(restaurants);
    }
  });
});

app.post('/restaurants', function(req, res) {
  
  console.log(req.body);
  var restaurant = RestaurantModel({
    name: req.body.name
  });

  restaurant.save(function(err) {
    if(!err) {
      console.log(restaurant);
      res.json({_id: restaurant._id, name: restaurant.name});
    } else {
      res.send("Error connecting to database");
    }
  });

});

app.delete('/restaurants/:id', function(req, res) {
  console.log("hello world delete");
  console.log(req.url);
  console.log(req.params.id);
  res.json({deleted: true, id: req.params.id});
});

app.put('/restaurants/:id', function(req, res) {
  console.log(req.body);
  console.log(req.params.id, req.params.yourRating, req.params.yourRatingPrev);
});

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
})
