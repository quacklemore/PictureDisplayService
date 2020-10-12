# PictureDisplayService

Hello! Welcome to the page for more information on the gallery display module for the Trip AdCoba site.

This module covers the following components:
  - main gallery display
  - thumbnail gallery
  - sidebar (three sections: sort pop out by user, most popular tag, and the second most popular tag)
  - pop out window
    - pop out window albums
    - pop out window main gallery view
    - pop out window picture gallery

This display is meant to showcase the various aspects of a hotel to help a customer decide whether they want to visit/stay there.

To see a gif of how this should look when it is working properly, please see: https://youtu.be/eOqzkc8QgG4

This is a complicated module, but the main takeaway with working around it is knowing the correct format of the data you should be sending to the client side. For this, please note that it is calibrated to accept adocument from a mongoDB database to have the following information:
  name: String,
  FullPhotos: Array,
  MainPhotos: Array,
  ThumbnailPhotos: Array,
  users: Array,
  tags: Array,
  photoObjects: Array

The second, third, and fourth arrays should be filled with urls for the resized images on AWS S3 and each image to be resized as such:

  full size: should be resized to be 1200px in width
  main gallery size: should be resized to be able to properly fill out a section of 600px x 400px, with some overlap being covered
  thumbnail size: must be 60px x 50px, with overlap being cropped off

The user array should be an aray of user names associated with the pictures of that hotel.
The tags should be the tags users have used when uploading pictures for that hotel.
The photoObjects aray is based on the previous schema of this module and includes the following for each picture:
  - imgFullUrl: the full resized image url
  - imgMainUrl: the main gallery resized image url
  - imgThumbUrl: the thumbnail resized image url
  - uploadDate: a Date object at the point which is was uploaded (not currently used though)
  - user: user name of the person who uploaded the image
  - hotel: name of hotel associated with the image
  - tag: tag associated with the hotel, if any

Possible issues (don't allow these to happen):
  - not properly resizing
  - not having at least two tags to render the sidebar properly
  - having fewer than 23 pictures associated with a hotel

This module is a complex beast but if you feed it what it wants, it should do your bidding.

If you have any issues not associated with what has been listed on this page, please contact the developer: Susannah Marcus