const express = require('express');
const app = express();
const port = 4000;

app.use(express.static(__dirname + '/public'));

app.get('/pictures', (req, res) => {
  res.send(`got it in ${req.url} at port ${port}`);
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})