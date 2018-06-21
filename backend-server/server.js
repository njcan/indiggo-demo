const express = require('express');
const app = express();

app.listen(8000, () => {
  console.log("Server successfully started!");
});

app.get('/', function(req, res) {
  console.log("Hello");
});

app.route('/api/planets').get((req, res) => {
  res.send({
    planets: [
      {
        name: 'Mercury',
        color: 'Red',
        radius: 2439
      },
      {
        name: 'Venus',
        color: 'Red',
        radius: 6051
      },
      {
        name: 'Earth',
        color: 'Red',
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
  });
});
