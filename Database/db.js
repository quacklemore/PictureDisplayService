const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pictures', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', console.log('Connection made to MongoDB pictures database!'));

const picture = new mongoose.Schema({
  _id: Number,
	imgUrl: String,
  uploadDate: Number,
	user: String
})