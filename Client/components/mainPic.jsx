import React from 'react';

const PictureMainViewer = (props) => {
  return (
      <img src={props.photo} style={{width: '600px', height: '400px', objectFit: 'cover'}} />
  )
}

export default PictureMainViewer;

// &#8596;