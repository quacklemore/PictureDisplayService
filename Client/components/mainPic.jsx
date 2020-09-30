import React from 'react';

const PictureMainViewer = (props) => {
  // console.log(props.photo, props.photos)
  return (
    <img src={props.photo}/>
  )
}

export default PictureMainViewer;