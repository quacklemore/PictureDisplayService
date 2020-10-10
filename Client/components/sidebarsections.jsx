import React from 'react';
import styled from 'styled-components';

const SideBarSectionWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 167px;
  border: 1px solid white;
  margin-top: 0px;
  background-color: rgba(74,74,74,.6);
`;

const SideBarTextOverlay = styled.span`
  position: absolute;
  font-size: 1.2em;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: 1;
  text-align: center;
`;

const SideBarSectionImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 70%;
`;

const SidebarSections = (props) => {
  if (props.photos !== undefined) {
    let photo;
    if (Array.isArray(props.photos) === true) {
      photo = props.photos[props.photos.length - 1].imgMainUrl;
    } else {
      photo = props.photos
    }

    return (
    <SideBarSectionWrapper>
      <SideBarTextOverlay>{props.sectionInfo}</SideBarTextOverlay>
      <SideBarSectionImage src={photo} />
    </SideBarSectionWrapper>
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