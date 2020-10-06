import React from 'react';
import styled from 'styled-components';

const ThumbCover = styled.div`
  position: absolute;
  width: 58px;
  height: 48px;
  opacity: 50%;
  background-color: black;
  z-index: 2;
  &:hover{
    opacity: 0%;
  }
`;

const ThumbnailImg =  styled.img`
  width: 58px;
  height: 48px;
  z-index: 1;
`;

const ThumbWrapper = styled.div`
  flex: 1;
  border-top: 2px solid white;
  width: 60px;
  height: 50px;
`;

const Thumbnail = (props) => {
  return (
    <ThumbWrapper>
      <ThumbCover id={props.id} onClick={props.changePic}/>
      <ThumbnailImg src={props.photo} onClick={props.changePic} id={props.id}/>
    </ThumbWrapper>
  )
}

export default Thumbnail;