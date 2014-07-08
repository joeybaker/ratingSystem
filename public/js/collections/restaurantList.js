// restaurants.js

var app = app || {};

app.RestaurantList = Backbone.Collection.extend({

  model: app.Restaurant,

  url: '/restaurants'

});
