import React from 'react';
import SidebarSections from './sidebarsections.jsx';
import styled from 'styled-components';

const TwestComp = styled.div`
  width: 100px;
  height: 100px;
  background-color: green;
  &:hover{
    background-color: blue;
  }
`;

const SideBarWrappers = styled.div`
  height: 33.4%;
  width: 100%;
`;

const SidebarPics = (props) => {

  if (props.users === undefined) {
    return (
      <div></div>
      )
    } else {
    if (props.special.is) {
      return (
        <div>
          <SideBarWrappers onClick={props.winUser}>
            {/* Travelor section */}
            <SidebarSections sectionInfo={`Travelers (${props.users.length})`} photos={props.photos[21].imgMainUrl}/>
          </SideBarWrappers>
          <SideBarWrappers onClick={props.winMost}>
            {/* most popular tag section */}
            <SidebarSections sectionInfo={props.tags.most} photos={props.tags[props.tags.most]} />
          </SideBarWrappers>
          <SideBarWrappers onClick={props.winSpec}>
            {/* special media section */}
            <SidebarSections sectionInfo={props.special.specialItemType} photos={props.special.thumbnail}/>
          </SideBarWrappers>
        </div>
    )
    } else {
      return (
        <div>
          <SideBarWrappers onClick={props.toggleWindow} onClick={props.winUser}>
            {/* Travelor section */}
            <SidebarSections sectionInfo={`Travelers (${props.users.length})`} photos={props.photos[21].imgMainUrl} />
          </SideBarWrappers>
          <SideBarWrappers onClick={props.toggleWindow}  onClick={props.winMost}>
            {/* most popular tag section */}
            <SidebarSections sectionInfo={props.tags.most} photos={props.tags[props.tags.most]} />
          </SideBarWrappers>
          <SideBarWrappers onClick={props.toggleWindow}  onClick={props.winSecMost}>
            {/* second most popular tag section */}
            <SidebarSections sectionInfo={props.tags.secondMost} photos={props.tags[props.tags.secondMost]} />
          </SideBarWrappers>
        </div>

    )
    }
  }

}

export default SidebarPics;