const mongoose = require('mongoose');
const db = require('./db.js');

const HotelsSchema = new mongoose.Schema({
  name: String,
  FullPhotos: Array,
  MainPhotos: Array,
  ThumbnailPhotos: Array,
  users: Array,
  tags: Array,
  photoObjects: Array
});

const Hotel = mongoose.model('Hotel', HotelsSchema);

module.exports = Hotel;