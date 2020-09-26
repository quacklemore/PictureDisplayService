const db = require('./db.js');
const faker = require('faker');
const Photo = require('./Photo.js');

const saveOnePhoto = (image) => {
  return new Promise((resolve, reject) => {
    Photo.create(image, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


const seed = () => {
  let pictures = [];

  for (let i = 0; i < 100; i++) {
    let hotelName = faker.company.companyName();
    let randNum = Math.floor(Math.random() * 58);

    for (let x = 1; x <= randNum; x++) {
      let image = {};
      image.imgUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/${x}.jpg`;
      image.uploadDate = new Date();
      image.user = faker.name.firstName() + faker.name.lastName();
      image.hotel = hotelName;

      pictures.push(saveOnePhoto(image));
    }


  }
  Promise.all(pictures)
  .then(result => {
    mongoose.connection.close();
  })

}

seed();

module.exports = saveOnePhoto;

