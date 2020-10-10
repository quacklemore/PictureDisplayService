import React from 'react';
import SidebarSections from './sidebarsections.jsx';
import styled from 'styled-components';

const TwestComp = styled.div`
  width: 100px;
  height: 100px;
  z-index: 1;
  background-color: green;
  &:hover{
    background-color: blue;
  }
`;

const SideBarWrappers = styled.div`
  height: 33.4%;
  width: 100%;
  z-index: 1;
  cursor: pointer;
`;

const SidebarPics = ({users, winUser, tags, photos, toggleWindow, winMost, winSecMost}) => {

  if (tags.albums === undefined || photos === undefined ) {
    return (
      <div></div>
      )
  } else {
    return (
      <div>
        <SideBarWrappers onClick={winUser}>
          {/* Travelor section */}
          <SidebarSections sectionInfo={`Travelers (${users.length})`} photos={photos[21]} />
        </SideBarWrappers>
        <SideBarWrappers onClick={toggleWindow}  onClick={winMost}>
          {/* most popular tag section */}
          <SidebarSections sectionInfo={tags.most} photos={tags[tags.most]} />
        </SideBarWrappers>
        <SideBarWrappers onClick={toggleWindow}  onClick={winSecMost}>
          {/* second most popular tag section */}
          <SidebarSections sectionInfo={tags.secondMost} photos={tags[tags.secondMost]} />
        </SideBarWrappers>
      </div>

    )
  }


}

export default SidebarPics;