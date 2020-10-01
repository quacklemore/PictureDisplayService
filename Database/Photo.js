const mongoose = require('mongoose');
const db = require('./db.js');

const pictureSchema = new mongoose.Schema({
  imgMainUrl: String,
  imgFullUrl: String,
  imgThumbUrl: String,
  uploadDate: Date,
  user: String,
  hotel: String,
  tag: String,
  special: {
    is: Boolean,
    specialItem: String,
    specialItemType: String
  }
},
{
  timeStamp: true
});

const Photo = mongoose.model('Photo', pictureSchema);

module.exports = Photo;