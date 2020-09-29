// const {MongoClient} = require('mongodb');
// const saveOnePhoto = require('./../Database/seed.js');
// const Photo = require('./../Database/Photo.js');

// describe('insert', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = MongoClient.connect(global.__MMONGO_URI__, {
//       useNewUrlParser: true,
//     });
//     db = connection.db(global.__MONGO_DB_NAME__);
//   });

//   afterAll(() => {
//     Photo.deleteMany({ user: 'ThisIsATest' })
//     .then((err) => {
//       if (err) {
//         return err;
//       } else {
//         return 'deleted all test users';
//       }
//     })
//     connection.close();
//     db.close();
//   })

//   it('should insert a photo doc into the collection', () => {

//     let now = new Date();
//     // now = now.toString();
//     const mockPhoto = {
//       imgUrl: 'https://unsplash.com/photos/HfIex7qwTlI',
//       uploadDate: now,
// 	    user: 'ThisIsATest'
//     }

//     saveOnePhoto('https://unsplash.com/photos/HfIex7qwTlI', now, 'ThisIsATest');

//     const insertedPhoto = Photo.find({ "uploadDate": now})

//     expect(insertedPhoto).toEqual(mockPhoto);
//   })
// });