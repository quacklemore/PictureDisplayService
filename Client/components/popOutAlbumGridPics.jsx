import React from 'react';

const PopOutAlbumPics = (props) => {
  return (
    <div style={{postion: 'relative', width: '132px', height: '85px', objectFit: 'contain', overflow: 'hidden', margin: '5px', flexShrink: 0}} onClick={() => {props.changeContent('tag', props.details)}}>
      <div style={{ position: 'absolute', color: 'white', zIndex: 2, width: '132px', height: '85px', textShadow: '2px 2px 5px black'}}>{props.details}</div>
      <img src={props.photo} style={{ position: 'relative', width: '100%', hieght: '100%'}}/>
    </div>
  )
}

export default PopOutAlbumPics;