const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: '*', 
}));

let favoriteCities = [];

// GET route to retrieve favorite cities
app.get('/favorites', (req, res) => {
  res.json(favoriteCities);
});

// POST route to save a favorite city
app.post('/favorites', (req, res) => {
  const { city } = req.body;
  if (city && !favoriteCities.includes(city)) {
    favoriteCities.push(city);
    res.status(201).json({ message: 'City added to favorites', city });
  } else {
    res.status(400).json({ message: 'City is already in favorites or invalid city' });
  }
});

// DELETE route to remove a favorite city
app.delete('/favorites', (req, res) => {
  const { city } = req.body;
  const index = favoriteCities.indexOf(city);
  if (index > -1) {
    favoriteCities.splice(index, 1);
    res.status(200).json({ message: 'City removed from favorites', city });
  } else {
    res.status(400).json({ message: 'City not found in favorites' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
