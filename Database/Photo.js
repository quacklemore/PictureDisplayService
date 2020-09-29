const mongoose = require('mongoose');
const db = require('./db.js');

const pictureSchema = new mongoose.Schema({
  imgUrl: String,
  uploadDate: Date,
  user: String,
  hotel: String,
  tag: String,
  special: Boolean
},
{
  timeStamp: true
});

const Photo = mongoose.model('Photo', pictureSchema);

module.exports = Photo;