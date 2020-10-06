const express = require('express');
const Photo = require('./../Database/Photo.js')
const app = express();
const port = 4000;

app.use(express.static(__dirname + '/../public/'));
app.use(express.json())

app.get('/api/pictures/:hotel', (req, res) => {
  console.log('got GET request for pictures');
  let data = req.params.hotel;
  console.log(data);
  Photo.find({ hotel: data})
  .then((results) => {
    // console.log('');
    res.send(results);
  })

})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})