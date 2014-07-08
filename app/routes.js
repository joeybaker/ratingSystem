//routes.js

module.exports = function(app, RestaurantModel) {
  
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
        res.json({_id: restaurant._id, name: restaurant.name, averageRating: 0, numberOfRatings: 0});
      } else {
        res.send("Error connecting to database: " + err);
      }
    });

  });

  app.delete('/restaurants/:id', function(req, res) {
    RestaurantModel.remove({_id: req.params.id}, function(err) {
      if(!err) {
        res.json({deleted: true, id: req.params.id});
      }
      else res.send('Error deleting from database: ' + err);
    })
  });

  app.put('/restaurants/:id', function(req, res) {
    RestaurantModel.findById(req.params.id, 'averageRating numberOfRatings ratings', function(err, restaurant) {  
      if(!err) {
        if (restaurant.averageRating === '-') restaurant.averageRating = 0;
        restaurant.averageRating = (restaurant.averageRating * restaurant.numberOfRatings + req.body.yourRating) / (restaurant.numberOfRatings + 1);
        restaurant.numberOfRatings += 1;
        restaurant.ratings.push(req.body.yourRating);
        restaurant.save(function(err) {
          if(!err) {
            res.send({averageRating: restaurant.averageRating});
          } else {
            res.send('Error updating database: ' + err);
          }
        });
      } else {
        console.log('Error updating rating: ' + err);
      }
    });
  });

};
