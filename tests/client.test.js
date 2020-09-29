/**
* @jest-environment node
*/

const React = require('react');
const renderer = require('react-test-renderer');
const axios = require('axios');
const { setup: setupDevServer } = require('jest-dev-server');

// const PictureDisplayApp = require('./../Client/components/PictureDisplayApp.jsx');
// const MainPic = require('./../Client/componentsmainPic.jsx');
// const GridPics = require('./../Client/componentsgridPics.jsx');
// const SidebarPics = require('./../Client/componentssidebarPics.jsx');

describe('Checking calls to the server to return expected values', () => {

  test('data from server is in an array', (done) => {
    axios.post('http://localhost:4000/api/pictures/', {
      "hotel": "hotel0" //PLEASE CHANGE THIS IF YOU ARE TESTING WITH SPECIFIC HOTELS
    })
    .then((data) => {
      expect(Array.isArray(data.data)).toBe(true);
      done();
    })
    .catch((err) => {
      done(err);
    })

  });

  test('elements within server array are objects', (done) => {
    axios.post('http://localhost:4000/api/pictures/', {
      "hotel": "hotel0" //PLEASE CHANGE THIS IF YOU ARE TESTING WITH SPECIFIC HOTELS
    })
    .then((data) => {
      expect(typeof data.data[0]).toBe('object');
      done();
    })
    .catch((err) => {
      done(err);
    })
  });

  test('objects within server array have the minimum key/value pairs needed for module to work', (done) => {
    axios.post('http://localhost:4000/api/pictures/', {
      "hotel": "hotel0" //PLEASE CHANGE THIS IF YOU ARE TESTING WITH SPECIFIC HOTELS
    })
    .then((data) => {
      expect(data.data[0].imgUrl).toBeDefined();
      expect(data.data[0].user).toBeDefined();
      expect(data.data[0].hotel).toBeDefined();
      expect(data.data[0].tag).toBeDefined();
      expect(data.data[0].special).toBeDefined();
      done();
    })
    .catch((err) => {
      done(err);
    })
  });
})

// describe('Testing MainPic component', () => {
//   test('main image is the same as the image in the the data array at index 0', () => {

//   });

//   test('on click of the main image the pop up window appears', () => {

//   });
// }

// describe('Testing GridPics component', () => {
//   test('mini grid is filled with img tags', () => {

//   });

//   test('mini grid will render when there are at least 20 photos fed into it', () => {

//   });
// }

// describe('Testing SidebarPics component', () => {
//   test('sidebar will render two sections when there is no special media type and the hotel only has photos', () => {

//   });

//   test('sidebar will render three sections when there is a special media type', () => {

//   });
// }
