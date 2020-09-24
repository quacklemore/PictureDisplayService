const db = require('./db.js');
const Photo = require('./Photo.js');

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
};

module.exports = saveOnePhoto;