// restaurant.js

var app = app || {};

app.Restaurant = Backbone.Model.extend({

  urlRoot: '/restaurants',  //NOTE: urlRoot is different than url parameter. urlRoot allows an id to be added to the request

  defaults: {
    _id: null,
    averageRating: '-',
    name: 'My Fav Restaurant',
    yourRating: '-',
    yourRatingPrev: '-'
  }

});
