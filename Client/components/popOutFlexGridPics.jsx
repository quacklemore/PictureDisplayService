import React from 'react';

const PopOutFlexPics = (props) => {
  return (
    <img src={props.photo} style={{width: '100%', flexShrink: 1, flexGrow: 1}} onClick={props.changePhoto} id={props.id}/>
  )
}

export default PopOutFlexPics;