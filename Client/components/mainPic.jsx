import React from 'react';
import styled from 'styled-components';

const MainPicArrowLeft = styled.div`
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

const MainPicArrowLeftBox = styled.div`
  opacity: 20%;
  &:hover {
    opacity: 100%;
  }
  position: absolute;
  z-index: 2;
  cursor: pointer;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 0%;
  margin-top: -30px;
  background-color: rgba(0,0,0,.32);
  border-radius: 0em .5em .5em 0em;
`;

const MainPicArrowRight = styled.div`
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

const MainPicArrowRightBox = styled.div`
  opacity: 20%;
  &:hover {
    opacity: 100%;
  }
  position: absolute;
  z-index: 2;
  cursor: pointer;
  width: 60px;
  height: 60px;
  top: 50%;
  right: 0%;
  margin-top: -30px;
  background-color: rgba(0,0,0,.32);
  border-radius: .5em 0em 0em .5em;
`;

const MainPicFullViewBox = styled.div`
  opacity: 0%;
  &:hover {
    opacity: 100%;
  }
  position: absolute;
  z-index: 1;
  cursor: pointer;
  width: 120px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-left: -60px;
  margin-top: -30px;
  background: rgba(0,0,0,.32);
  border-radius: .5em;
  color: white;
`;

const MainPicFullView = styled.div`
  position: relative;
  display: inline-block;
  top: 30%;
  left: 15%;
  z-index: 1;
`;

const ViewAllWithNumber = styled.div`
  position: absolute;
  bottom: 5%;
  left: 12%;
  text-decoration: underline;
`;

const ViewAllCamera = styled.img`
  position: absolute;
  bottom: 4%;
  left: 5%;
`;
const ViewAllWrapper = styled.div`
  z-index: 10;
`;

const MainGalleryImage = styled.img`
  width: 600px;
  height: 400px;
  object-fit: cover;
`;

const PictureMainViewer = ({changeMainPic, toggleWindowMain, photos, MainGalleryPicture, winUser}) => {
  if (photos === undefined) {
    return (
      <div></div>
    )
  } else {
    return (
      <div>
        <MainPicArrowLeftBox onClick={() => {changeMainPic(null, 'left')}} >
        <MainPicArrowLeft />
        </MainPicArrowLeftBox>
        <MainPicArrowRightBox onClick={() => {changeMainPic(null, 'right')}} >
          <MainPicArrowRight />
        </MainPicArrowRightBox>
        <div onClick={() => {
            toggleWindowMain('main', undefined, MainGalleryPicture);
          }}
          name='viewAllPics'>
          <MainPicFullViewBox>
            <MainPicFullView>
                &#x2922;  Full View
            </MainPicFullView>
          </MainPicFullViewBox>
          <ViewAllWrapper onClick={winUser}>
            <ViewAllCamera src={'https://tripadcoba.s3-us-west-1.amazonaws.com/camera-512.png'} onClick={winUser}/>
            <ViewAllWithNumber onClick={winUser}>
              View all {photos !== undefined ? photos.length : 0} Photos
            </ViewAllWithNumber>
          </ViewAllWrapper>
          <MainGalleryImage src={MainGalleryPicture} onClick={() => {
            toggleWindowMain();
          }}/>
        </div>
      </div>
    )
  }
}

export default PictureMainViewer;