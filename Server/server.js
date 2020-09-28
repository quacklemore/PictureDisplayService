const express = require('express');
const Photo = require('./../Database/Photo.js')
const app = express();
const port = 4000;

app.use(express.static(__dirname + '/../public/'));
app.use(express.json())

app.post('/api/pictures/', (req, res) => {
  console.log('get POST request for pictures');
  let data = req.body;

  Photo.find({ hotel: data.hotel})
  .then((results) => {

    res.send(results);
  })

})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})