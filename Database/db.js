const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pictures', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', console.log('Connection made to MongoDB pictures database!'));

const pictureSchema = new mongoose.Schema({
  _id: Number,
	imgUrl: String,
  uploadDate: Number,
	user: String
})

const Photo = mongoose.model('Photo', pictureSchema);

const saveOnePhoto = (url, date, user) {
  Photo.create({
    imgUrl: url,
    uploadDate: date,
    user: user
  }, (err, newPhoto) => {
    if (err) {
      console.log(`-----------> ERROR! There was an error in adding to the photo database!! ${err}!! <-------------`);
    } else {
      console.log(`Success! The photo document [${newPhoto}] was successfully added to the database!`);
    }
  })
}