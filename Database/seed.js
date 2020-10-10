const mongoose = require('mongoose');
const db = require('./db.js');
const faker = require('faker');
const _ = require('underscore');
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
    let hotelName = 'hotel' + i;
    let randNum = (25 + Math.random() * (58 - 25));
    let bool = (Math.random() > 0.5) ? true : false;
    let specialObj = {};
    let gamble = Math.random();

    let totalNumberOfPictures = Array.from(Array(58).keys());
    let arrayOfRandom = totalNumberOfPictures.map((nothing, index) => {
    let randNum = (Math.floor(Math.random() * 58 +1));
      return randNum;
    });
    arrayOfRandom = _.uniq((arrayOfRandom));
    let length = arrayOfRandom.length;

    let tags = ['dogs', 'beach', 'sunshine', 'Wonderful', 'Good Food', 'happy', 'sandwich', 'beach life', 'Perfection', 'Okay', 'Passable', 'Overpriced', 'Meh', 'Too Sunny', 'Glaringly Beautiful'];
    let tagsNum = Math.floor(Math.random() * tags.length);
    let tagsNumArray = [];
    for (let i = 0; i < tagsNum; i++) {
      tagsNumArray.push(Math.floor(Math.random() * tags.length))
    }

    tagsForThisHotel = tags.map((tag, index) => {
      if (tagsNumArray.indexOf(index) !== -1) {
        return tag;
      } else {
        return;
      }
    })

    for (let x = 1; x <= length; x++) {
      let imageNum = arrayOfRandom.pop();
      let image = {};
      image.imgMainUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/main${imageNum}.jpg`;
      image.imgFullUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/full${imageNum}.jpg`;
      image.imgThumbUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/thumb${imageNum}.jpg`;


      image.uploadDate = new Date();
      image.user = faker.name.firstName() + faker.name.lastName();
      image.hotel = hotelName;
      image.tag = tagsForThisHotel[Math.floor(Math.random() * tagsForThisHotel.length)];
      specialObj.is = false;

      //not currently in use
      if (bool) {
        specialObj.specialItem = gamble > .5 ? `https://cdn.wallpapersafari.com/99/98/2IjALn.jpg` : `https://video-direct-tacdn-com.global.ssl.fastly.net/media/video-v/12/d7/52/d4/fiesta-americana-condesa_720.mp4`;
        specialObj.specialItemType = gamble > .5 ? 'panorama' : 'video';
        specialObj.thumbnail = gamble > .5 ? 'https://tripadcoba.s3-us-west-1.amazonaws.com/pano1.jpg' : 'https://tripadcoba.s3-us-west-1.amazonaws.com/video1.jpg';
      }
      image.special = specialObj


      pictures.push(saveOnePhoto(image));

    }
  }

  Promise.all(pictures)
  .then(result => {
    mongoose.connection.close();
  })
  .catch((err) => {
    throw err;
  })
}

seed();

module.exports = saveOnePhoto;

