const express = require('express');
const cors = require('cors');
const app = express();
const planets =  [
  {
    name: 'Mercury',
    color: 'Light Coral',
    radius: 24
  },
  {
    name: 'Venus',
    color: 'Light Green',
    radius: 60
  },
  {
    name: 'Earth',
    color: 'Light Blue',
    radius: 63
  },
  {
    name: 'Mars',
    color: 'Light Coral',
    radius: 33
  },
  {
    name: 'Jupiter',
    color: 'Light Salmon',
    radius: 150
  },
  {
    name: 'Saturn',
    color: 'Light Salmon',
    radius: 120
  },
  {
    name: 'Uranus',
    color: 'Light Blue',
    radius: 85
  },
  {
    name: 'Neptune',
    color: 'Light Blue',
    radius: 81
  },
  {
    name: 'Pluto',
    color: 'Brown',
    radius: 15
  }]

var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var index = 2;

function getRandomInt(min, max) {

  var rand = Math.floor((Math.random() * (nums.length - 1)) + 1);
  var nextIndex = index + rand;

  if(nextIndex >= max) {
    index = nextIndex - max;
    return index;
  } else {
    index = nextIndex;
    return index;
  }
}

app.use(cors());

app.listen(8000, () => {
  console.log("Server successfully started!");
});

app.get('/', function(req, res) {
  res.send("<p>Welcome to the backend-server for the Indiggo App!</p>" +
           "<p>The API supports the following commands:</p>" +
           "<p>&emsp;/api/planets - lists all planets from the backend server</p>" +
           "<p>&emsp;/api/planets/random - returns a random planet from the backend server</p>" +
           "<p>&emsp;/api/planets/:number - replacing :number with a numeric value returns that planet if it exists</p>");
});

app.route('/api/planets/random').get((req, res) => {
  var randomPlanet = getRandomInt(0, planets.length);
  res.send(planets[randomPlanet]);
});

app.route('/api/planets/:number').get((req, res) => {
  const number = req.params['number'];
  res.send(planets[number]);
});

app.route('/api/planets').get((req, res) => {
  res.send(planets);
});


