// restaurants.js

var mongoose = require('mongoose');

mongoose.connect( 'mongodb://localhost/restaurant_database');

var Restaurant = new mongoose.Schema({
  name: String,
  averageRating: Number,
  ratings: [],
  numberOfRatings: Number
});

var RestaurantModel = mongoose.model( 'Restaurant', Restaurant );

RestaurantModel.drop = function() {
  mongoose.connection.collections['restaurants'].drop( function(err) {
    if(!err) console.log('Database dropped');
  });
}

RestaurantModel.loadExampleData = function() {
  
  RestaurantModel({
      name: 'Assab Erritrean',
      averageRating: 4.5,
      ratings: [4,5],
      numberOfRatings: 2,
    }).save();
  
  RestaurantModel({
      name: 'Shanghai Dumpling King',
      averageRating: 4.0,
      ratings: [3, 4, 5],
      numberOfRatings: 3,
    }).save();
};

module.exports = RestaurantModel;
