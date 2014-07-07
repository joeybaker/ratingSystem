var express = require('express')

var app = express();

var port = process.env.PORT || 3000;

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());  //needed to parse body of req object from post requests
});

var restaurants = [{id: 1, name: 'Assab', averageRating: 4.5, yourRating: 5}, {id: 2, name:'Shanghai Dumping King', averageRating: 4.2, yourRating: 4}];

app.get('/restaurants', function(req, res) {
  console.log(restaurants);
  res.json(restaurants);
});

app.post('/restaurants', function(req, res) {
  console.log(req.body);
  res.json({myId: 123});
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
