import React from 'react';

const Thumbnail = (props) => {

  return (
    <img src={props.photo} width="58px" height="48px" onClick={props.changePic} id={props.id}/>
  )
}

export default Thumbnail;