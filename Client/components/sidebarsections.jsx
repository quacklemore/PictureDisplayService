import React from 'react';

const SidebarSections = (props) => {
  if (props.photos !== undefined) {
    let photo;
    if (Array.isArray(props.photos) === true) {
      photo = props.photos[props.photos.length - 1].imgMainUrl;
    } else {
      photo = props.photos
    }

    return (
    <div>
      <span style={{position: 'absolute', fontSize: 20, color: 'white'}}>{props.sectionInfo}</span>
      <span style={{position: 'absolute', opacity: '35%', width: '200px', height: '167px', backgroundColor: 'white'}}></span>
      <img src={photo} style={{ height: '167px' }}/>
    </div>
    );
  } else {
    return (
      <div>
        <span>{props.sectionInfo}</span>
      </div>
    )
  }

}

export default SidebarSections;