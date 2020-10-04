import React from 'react';
import PopOutAlbumPics from './popOutAlbumGridPics.jsx';

const AlbumProcessor = (props) => {
  if (props.tags === undefined) {
    return <div></div>
  } else {
    return (
        props.tags.map((albumObj, index) => {
          return (
              <PopOutAlbumPics photo={albumObj.photo} details={albumObj.tag} key={'album' + index} changeContent={props.changeContent}/>
          )
        })
    )
  }
}

export default AlbumProcessor;