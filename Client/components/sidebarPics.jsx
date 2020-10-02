import React from 'react';
import SidebarSections from './sidebarsections.jsx';

const SidebarPics = (props) => {

  if (props.users === undefined) {
    return (
      <div></div>
      )
    } else {
    if (props.special.is) {
      return (
        <div>
          <div style={{ height: '33.4%', width: '100%'}}  onClick={props.winUser}>
            {/* Travelor section */}
            <SidebarSections sectionInfo={`Travelers (${props.users.length})`} photos={props.photos[21].imgMainUrl}/>
          </div>
          <div style={{ height: '33.4%', width: '100%'}} onClick={props.winMost}>
            {/* most popular tag section */}
            <SidebarSections sectionInfo={props.tags.most} photos={props.tags[props.tags.most]} />
          </div>
          <div style={{ height: '33.4%', width: '100%'}} onClick={props.winSpec}>
            {/* special media section */}
            <SidebarSections sectionInfo={props.special.specialItemType} photos={props.special.thumbnail}/>
          </div>
        </div>
    )
    } else {
      return (
        <div>
          <div style={{ height: '33.5%', width: '100%'}} onClick={props.toggleWindow} onClick={props.winUser}>
            {/* Travelor section */}
            <SidebarSections sectionInfo={`Travelers (${props.users.length})`} photos={props.photos[21].imgMainUrl} />
          </div>
          <div style={{ height: '33.5%', width: '100%'}} onClick={props.toggleWindow}  onClick={props.winMost}>
            {/* most popular tag section */}
            <SidebarSections sectionInfo={props.tags.most} photos={props.tags[props.tags.most]} />
          </div>
          <div style={{ height: '33%', width: '100%'}} onClick={props.toggleWindow}  onClick={props.winSecMost}>
            {/* second most popular tag section */}
            <SidebarSections sectionInfo={props.tags.secondMost} photos={props.tags[props.tags.secondMost]} />
          </div>
        </div>

    )
    }
  }

}

export default SidebarPics;