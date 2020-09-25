const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pictures', {useNewUrlParser: true});

const db = mongoose.connect('mongodb://localhost/pictures');
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', console.log('Connection made to MongoDB pictures database!'));

module.exports = db;
