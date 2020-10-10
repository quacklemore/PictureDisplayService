const mongoose = require('mongoose');
const mongoUri = require('./mongouri.js');
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connect(mongoUri);

module.exports = db;
