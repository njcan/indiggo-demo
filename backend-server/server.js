const express = require('express');
const cors = require('cors');
const app = express();
const planets =  [
  {
    name: 'Mercury',
    color: 'Red',
    radius: 2439
  },
  {
    name: 'Venus',
    color: 'Green',
    radius: 6051
  },
  {
    name: 'Earth',
    color: 'Blue',
    radius: 6378
  },
  {
    name: 'Mars',
    color: 'Red',
    radius: 3396
  },
  {
    name: 'Jupiter',
    color: 'Orange',
    radius: 71492
  },
  {
    name: 'Saturn',
    color: 'Yellow',
    radius: 60268
  },
  {
    name: 'Uranus',
    color: 'Light Blue',
    radius: 25559
  },
  {
    name: 'Neptune',
    color: 'Dark Blue',
    radius: 24764
  },
  {
    name: 'Pluto',
    color: 'Brown',
    radius: 1195
  }]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
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


