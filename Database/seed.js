const mongoose = require('mongoose');
const db = require('./db.js');
const faker = require('faker');
const _ = require('underscore');
const mongoUri = require('./mongouri.js');
const Hotel = require('./Photo.js');

// mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, (err) => {
//   mongoose.connection.dropDatabase()
// });

const saveOneHotel = (hotel) => {
  return new Promise((resolve, reject) => {
    Hotel.create(hotel, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const seed = () => {
  let hotels = [];

  for (let i = 0; i < 100; i++) {
    let pictures = [];
    let thumbnailArray = [];
    let fullSizeArray = [];
    let mainImgSizeArray = [];
    let userArray = [];
    let hotelObj = {};

    let randNum = (25 + Math.random() * (58 - 25));
    let bool = (Math.random() > 0.5) ? true : false; //DO I NEED
    let gamble = Math.random();//DO I NEED

    let totalNumberOfPictures = Array.from(Array(58).keys());
    let arrayOfRandom = totalNumberOfPictures.map((nothing, index) => {
    let randNum = (Math.floor(Math.random() * 58 + 1));
      return randNum;
    });
    arrayOfRandom = _.uniq((arrayOfRandom));
    let length = arrayOfRandom.length;

    let tags = ['dogs', 'beach', 'sunshine', 'Wonderful', 'Good Food', 'happy', 'sandwich', 'beach life', 'Perfection', 'Okay', 'Passable', 'Overpriced', 'Meh', 'Too Sunny', 'Glaringly Beautiful'];
    let tagsNum = Math.floor(Math.random() * (tags.length - 1));
    let tagsNumArray = [];
    for (let i = 0; i < tagsNum; i++) {
      tagsNumArray.push(Math.floor(Math.random() * tags.length));
    }

    tagsForThisHotel = tagsNumArray.map((number) => {
      return tags[number];
    })

    hotelObj.tags = _.uniq((tagsForThisHotel));
    hotelObj.name = 'hotel' + i;

    for (let x = 1; x <= length; x++) {
      let imageNum = arrayOfRandom.pop();
      let image = {};
      image.imgMainUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/main${imageNum}.jpg`;
      image.imgFullUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/full${imageNum}.jpg`;
      image.imgThumbUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/thumb${imageNum}.jpg`;
      mainImgSizeArray.push(`https://tripadcoba.s3-us-west-1.amazonaws.com/main${imageNum}.jpg`);
      fullSizeArray.push(`https://tripadcoba.s3-us-west-1.amazonaws.com/full${imageNum}.jpg`);
      thumbnailArray.push(`https://tripadcoba.s3-us-west-1.amazonaws.com/thumb${imageNum}.jpg`);

      image.uploadDate = new Date();
      image.user = faker.name.firstName() + faker.name.lastName();
      userArray.push(image.user);
      image.hotel = hotelObj.name;
      image.tag = hotelObj.tags[Math.floor(Math.random() * hotelObj.tags.length - 1)];

      pictures.push(image);
    }

    hotelObj.FullPhotos = fullSizeArray;
    hotelObj.MainPhotos = mainImgSizeArray;
    hotelObj.ThumbnailPhotos = thumbnailArray;
    hotelObj.users = userArray;
    hotelObj.photoObjects = pictures;
    hotels.push(saveOneHotel(hotelObj));
  }


  Promise.all(hotels)
  .then(result => {
    mongoose.connection.close();
  })
  .catch((err) => {
    throw err;
  })
}

seed();

module.exports = saveOneHotel;

