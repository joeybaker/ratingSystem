var express = require('express');
var RestaurantModel = require(__dirname + '/app/models/restaurant');

// RestaurantModel.drop();
// RestaurantModel.loadExampleData();

var app = express();

var port = process.env.PORT || 3000;

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());  //needed to parse body of req object from post requests
});

app.get('/restaurants', function(req, res) {
  var all = RestaurantModel.find({}, '_id name averageRating ratings', function(err, restaurants) {
    if(!err) {
      console.log(restaurants);
      res.json(restaurants);
    }
  });
});

app.post('/restaurants', function(req, res) {
  
  var restaurant = RestaurantModel({
    name: req.body.name,
    averageRating: 0,
    numberOfRatings: 0,
    ratings: [],
  });

  restaurant.save(function(err) {
    if(!err) {
      console.log(restaurant);
      res.json({_id: restaurant._id, name: restaurant.name, averageRating: 0, numberOfRatings: 0});
    } else {
      res.send("Error connecting to database");
    }
  });

});

app.delete('/restaurants/:id', function(req, res) {
  RestaurantModel.remove({_id: req.params.id}, function(err) {
    if(!err) {
      res.json({deleted: true, id: req.params.id});
    }
    else res.send('Error deleting from database');
  })
});

app.put('/restaurants/:id', function(req, res) {
  // console.log(req.body);
  // console.log(req.params.id, req.body.yourRating);
  RestaurantModel.findById(req.params.id, 'averageRating numberOfRatings ratings', function(err, restaurant) {  
    if(!err) {
      console.log(restaurant);
      if (restaurant.averageRating === '-') restaurant.averageRating = 0;
      restaurant.averageRating = (restaurant.averageRating * restaurant.numberOfRatings + req.body.yourRating) / (restaurant.numberOfRatings + 1);
      restaurant.numberOfRatings += 1;
      restaurant.ratings.push(req.body.yourRating);
      restaurant.save(function(err) {
        if(!err) {
          res.send({averageRating: restaurant.averageRating});
        } else {
          res.send('Error updating database');
        }
      });
      // RestaurantModel.update(restaurant, {$push: {ratings: req.body.yourRating}}, function(err) {});
    } else {
      console.log('Error updating rating');
    }
  });

});

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});
