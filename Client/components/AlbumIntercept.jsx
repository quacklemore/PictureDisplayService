import React from 'react';
import PopOutAlbumPics from './popOutAlbumGridPics.jsx';

const AlbumProcessor = ({tags, setWindowContent}) => {
  if (tags === undefined) {
    return <div></div>
  } else {
    return (
        tags.map((albumObj, index) => {
          let tag = albumObj.tag;
          return (
              <PopOutAlbumPics photo={albumObj.photo} details={tag} key={'album' + index} changeContent={() => {
                setWindowContent('tag', tag);
              }}/>
          )
        })
    )
  }
}

export default AlbumProcessor;