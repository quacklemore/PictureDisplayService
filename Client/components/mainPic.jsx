import React from 'react';

const PictureMainViewer = (props) => {
  // console.log(props.photo, props.photos)
  return (
    <div>
      <div id='leftArrowBox' style={{position: 'absolute', zIndex: 1, cursor: 'pointer', width: '60px', height: '60px', top: '50%', marginTop: '-30px', background: 'rgba(0,0,0,.32)'}}>
        <div id='leftArrow' style={{}}></div>
      </div>
      <img src={props.photo}/>
      <div id='rightArrowBox'>
        <div id='rightArrow' style={{}}></div>
      </div>
    </div>
  )
}

export default PictureMainViewer;