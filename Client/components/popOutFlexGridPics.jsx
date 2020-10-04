import React from 'react';

const PopOutFlexPics = (props) => {
  return (
    <img src={props.photo} style={{width: '100%', flexShrink: 1, flexGrow: 1}}/>
  )
}

export default PopOutFlexPics;