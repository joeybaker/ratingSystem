// app.js

var app = app || {};

app.AppView = Backbone.View.extend({
  
  el: '#restaurant-table',
  
  initialize: function() {
    this.getAll();
    this.addListeners();
  },

  renderOne: function(rest) {
    var rv = new app.RestaurantView({'model': rest});
    if(rv.model.get('averageRating') ===0 ) rv.model.set('averageRating', "-");
    $('#restaurant-table').append( rv.render().el );
    return rv;
  },

  getAll: function() {
    var self = this;
    var rl = app.restList;
    rl.on('reset', function(list) {
      list.forEach(function(rest) {
        rest.set('id', rest.attributes._id);
        delete rest.attributes._id;
        self.renderOne(rest);
      });
    });
    rl.fetch({reset: true});
  },

  addListeners: function() {
    this.submitButtonListener();
  },

  submitButtonListener: function() {
    this.$el.find('.inputRow .submitButton').on('click', function() {
      var newRestName = this.$el.find('.inputRow input').val();
      var yourRating = this.$el.find('.inputRow .yourRating').val();
      var newRestModel = new app.Restaurant({name: newRestName, yourRating: yourRating});
      this.saveNewRestaurant(newRestModel);
    }.bind(this));
  },

  saveNewRestaurant: function(newRestModel) {
    newRestModel.save({}, {error: error, success: success.bind(this)});

    function error(model, res, options) {
      console.log(res);
    };

    function success(model, res, options) {
      model.set('id', res._id);
      var restView = this.renderOne(newRestModel);
    };
  }

}); 

$(function() {
  app.restList = new app.RestaurantList();
  app.appView = new app.AppView();
});

