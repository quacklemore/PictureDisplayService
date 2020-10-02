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
          <div style={{ height: '158px', border: '20px solid blue'}}>
            {/* Travelor section */}
            <SidebarSections sectionInfo={props.users.length} photos={props.photos[21].imgMainUrl} />
          </div>
          <div style={{ height: '158px' }}>
            {/* most popular tag section */}
            <SidebarSections sectionInfo={props.tags.most} photos={props.tags[props.tags.most]} />
          </div>
          <div style={{ height: '158px' }}>
            {/* special media section */}
            <SidebarSections sectionInfo={props.special.specialItemType} photos={props.special.thumbnail} />
          </div>
        </div>
    )
    } else {
      console.log(props.photos[21].imgMainUrl);
      return (
        <div>
          <div style={{ height: '168px' }} onClick={props.toggleWindow}>
            {/* Travelor section */}
            <SidebarSections sectionInfo={`Travelers ${props.users.length}`} photos={props.photos[21].imgMainUrl} />
          </div>
          <div style={{ height: '168px' }} onClick={props.toggleWindow}>
            {/* most popular tag section */}
            <SidebarSections sectionInfo={props.tags.most} photos={props.tags[props.tags.most]} />
          </div>
          <div style={{ height: '168px' }} onClick={props.toggleWindow}>
            {/* second most popular tag section */}
            <SidebarSections sectionInfo={props.tags.secondMost} photos={props.tags[props.tags.secondMost]} />
          </div>
        </div>

    )
    }
  }

}

export default SidebarPics;