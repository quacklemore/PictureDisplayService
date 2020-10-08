const mongoose = require('mongoose');
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
    let hotelName = 'hotel' + i;
    let randNum = Math.floor(Math.random() * 58);
    let bool = (Math.random() > 0.5) ? true : false;
    let specialObj = {};
    let gamble = Math.random();

    for (let x = 1; x <= 58; x++) {
      let tags = ['dogs', 'beach', 'sunshine', 'wonderful', 'goodFood', 'happy'];
      let tagsNum = Math.floor(Math.random() * 6);
      let image = {};
      image.imgMainUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/main${x}.jpg`;
      image.imgFullUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/full${x}.jpg`;
      image.imgThumbUrl = `https://tripadcoba.s3-us-west-1.amazonaws.com/thumb${x}.jpg`;
      image.uploadDate = new Date();
      image.user = faker.name.firstName() + faker.name.lastName();
      image.hotel = hotelName;
      image.tag = tags[tagsNum];
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

