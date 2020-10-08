const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pictures', {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connect('mongodb://localhost/pictures');

module.exports = db;
