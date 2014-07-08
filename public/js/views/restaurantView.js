// restaurantView.js

var app = app || {};

app.RestaurantView = Backbone.View.extend({
  
  tagName: 'tr',
  
  template: _.template( $('#restaurant-template').html() ),
  
  initialize: function() {},

  events: {},
  
  render: function() {
    this.roundAverageRating();
    this.$el.html( this.template(this.model.toJSON()) );
    this.addListeners();
    return this;
  },

  addListeners: function() {
    this.changeRatingListener();
    this.deleteListener();
  },

  changeRatingListener: function() {
    var self = this;
    var yourRating;
    var $selectEl = this.$el.find('.yourRating');
    $selectEl.on('change', function() {
      yourRating = parseInt($selectEl.val());
      this.model.set({'yourRating': yourRating});
      this.updateRestaurantRating();
    }.bind(this));
  },

  deleteListener: function() {
    var self = this;
    var $deleteButtonEl = self.$el.find('.deleteButton');
    $deleteButtonEl.on('click', function() {
      var restModel = self.model;
      restModel.destroy({
        wait: true, 
        error: function(){alert('Connection error: restaurant was not deleted')},
        success: function(model, res, options) {
          console.log(res);
          self.remove();
        }
      });
    });
  },

  updateRestaurantRating: function() {
    var self = this;
    self.model.save({}, {error: error, success: success.bind(this)});
    self.$el.find('.yourRating').attr('disabled', 'disabled');

    function error(model, res, options) {
      console.log(res);
    };

    function success(model, res, options) {
      model.set('averageRating', res.averageRating);
      self.roundAverageRating();
      renderAverageRating();
    };

    function renderAverageRating() {
      self.$el.find('.averageRating').text(self.model.get('averageRating'));
    }

  },

  roundAverageRating: function() {
    var avgRating = this.model.get('averageRating') || 0;
    this.model.set('averageRating', Math.round(avgRating * 10) / 10);
    if(!(this.model.get('averageRating'))) this.model.set('averageRating', "-");
  }

});
