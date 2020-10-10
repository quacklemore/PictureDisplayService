import React from 'react';
import styled from 'styled-components';

const FlexedPic = styled.img`
  width: 100%;
  flex-shrink: 1;
  flex-grow: 1;
  cursor: pointer;
`;

const FlexedPicFull = styled.img`
  width: 100%;
  flex-shrink: 1;
  flex-grow: 1;
`;

const PopOutPicArrowLeft = styled.div`
  position: absolute;
  top: 50%;
  margin: -6px;
  width: 10px;
  height: 10px;
  border-left: 4px solid #fff;
  border-bottom: 4px solid #fff;
  content: "";
  border-radius: 3px;
  left: 50%;
  transform: rotate(45deg);
  overflow: hidden;
`;

const PopOutPicArrowLeftBox = styled.div`
  opacity: 70%;
  &:hover {
    opacity: 100%;
  }
  position: absolute;
  z-index: 1002;
  cursor: pointer;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 0%;
  margin-top: -30px;
  background-color: rgba(0,0,0,.32);
  border-radius: 0em .5em .5em 0em;
`;

const PopOutPicArrowRight = styled.div`
  position: absolute;
  top: 50%;
  margin: -6px;
  width: 10px;
  height: 10px;
  border-left: 4px solid #fff;
  border-bottom: 4px solid #fff;
  content: "";
  border-radius: 3px;
  right: 50%;
  transform: rotate(225deg);
  overflow: hidden;
`;

const PopOutPicArrowRightBox = styled.div`
  opacity: 70%;
  &:hover {
    opacity: 100%;
  }
  position: absolute;
  z-index: 1002;
  cursor: pointer;
  width: 60px;
  height: 60px;
  top: 50%;
  right: 0%;
  margin-top: -30px;
  background-color: rgba(0,0,0,.32);
  border-radius: .5em 0em 0em .5em;
`;

const PopOutFlexPics = ({isFullSize, changePic, changePicWithDirections, id, photo, setWindowContent}) => {
  if (isFullSize) {
    return (
      <div>
        <PopOutPicArrowLeftBox onClick={() => {
          changePicWithDirections(undefined, 'left', undefined, setWindowContent);
        }} id={id}>
          <PopOutPicArrowLeft />
        </PopOutPicArrowLeftBox>
        <FlexedPicFull src={photo} id={id}/>
        <PopOutPicArrowRightBox onClick={() => {
          changePicWithDirections(undefined, 'right', undefined, setWindowContent);
        }} id={id}>
          <PopOutPicArrowRight />
        </PopOutPicArrowRightBox>
      </div>
    )
  } else {
    return (
      <div>
        <FlexedPic src={photo} onClick={() => {
          changePic(id, undefined, undefined, setWindowContent)
        }} id={id}/>
      </div>
    )
  }

}

export default PopOutFlexPics;