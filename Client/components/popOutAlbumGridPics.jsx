import React from 'react';
import styled from 'styled-components';

const AlbumConstraints = styled.div`
  position: relative;
  width: 132px;
  height: 85px;
  object-fit: contain;
  overflow: hidden;
  margin: 5px;
  flex-shrink: 0;

`;

const AlbumText = styled.div`
  position: absolute;
  color: white;
  z-index: 1002;
  width: 132px;
  height: 85px;
  text-shadow: 2px 2px 5px black;
  cursor: pointer;
`;

const AlbumImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1001;
`;

const PopOutAlbumPics = (props) => {
  return (

    <AlbumConstraints onClick={() => {props.changeContent('tag', props.details)}}>
      <AlbumText>{props.details}</AlbumText>
      <AlbumImage src={props.photo} />
    </AlbumConstraints>

  )
}

export default PopOutAlbumPics;