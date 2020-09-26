const mongoose = require('mongoose');
const db = require('./db.js');

const pictureSchema = new mongoose.Schema({
  imgUrl: String,
  uploadDate: Date,
  user: String,
  hotel: String
});

const Photo = mongoose.model('Photo', pictureSchema);

module.exports = Photo;

console.log('hello world');