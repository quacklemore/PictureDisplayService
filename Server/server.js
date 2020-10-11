const express = require('express');
const Hotel = require('./../Database/Photo.js')
const app = express();
const port = 4000;

app.use(express.static(__dirname + '/../public/'));
app.use('/:hotelId',express.static(__dirname + '/../public/'));
app.use(express.json());

app.get('/api/pictures/:hotel', (req, res) => {
  let data = req.params.hotel;
  console.log(data);
  Hotel.find({ name: data})
  .then((results) => {
    res.send(results);
  })
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})