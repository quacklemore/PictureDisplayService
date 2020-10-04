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
    <div style={{ position: 'relative', width: '200px', height: '167px', border: '1px solid white', marginTop: '0px', backgroundColor: 'rgba(74,74,74,.6)'}}>
      <span style={{position: 'absolute', fontSize: 20, color: 'white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', zIndex: 1, textAlign: 'center'}}>{props.sectionInfo}</span>
      <img src={photo} style={{ width: '100%', height: '100%', opacity: '70%' }}/>
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