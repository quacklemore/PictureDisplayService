import React from 'react';
import styled from 'styled-components';

const ThumbCover = styled.div`
  position: absolute;
  width: 58px;
  height: 48px;
  opacity: 50%;
  background-color: black;
  z-index: 2;
  cursor: pointer;
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

const Thumbnail = ({id, changePic, photo}) => {
  return (
    <ThumbWrapper>
      <ThumbCover id={id} onClick={changePic}/>
      <ThumbnailImg src={photo} />
    </ThumbWrapper>
  )
}

export default Thumbnail;