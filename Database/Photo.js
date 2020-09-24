con mongoose = require('mongoose');
const db = require('./db.js');

const pictureSchema = new mongoose.Schema({
  _id: Number,
	imgUrl: String,
  uploadDate: Number,
	user: String
});

const Photo = mongoose.model('Photo', pictureSchema);

module.exports = Photo;