import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import PopOutFlexPics from './popOutFlexGridPics.jsx';
import AlbumProcessor from './AlbumIntercept.jsx';

const PopOutWindowOfPics = styled.div`
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  width: 95vw;
  height: 95vh;
  background-color: white;
  opacity: 0%;
  z-index: -2;
  box-shadow: 10px 10px 15px grey;
  overflow: auto;
  font-family: 'Quicksand';
`;

const ClosePopUpButton = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0%;
  right: 0%;
  border: .5px dotted grey;
  text-align: center;
  background-color: white;
  font-size: 1.5em;
  font-weight: bold;
  overflow: hidden;
  z-index: 1020;
`;

const GreyOutBackground = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0.01%;
  height: 0.01%;
  opacity: 0%;
  background-color: grey;
  z-index: -2;
`;

const PopUpFlexWrappers = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`;

const PopOutWindowFlex = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  object-fit: contain;
  overflow: auto;
  width: 80%;
  height: 85%;
  top: 6%;
  right: 0%;
`;

const AlbumWrapper = styled.div`
  position: absolute;
  display: block;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
  width: 20%;
  height: 100%;
  background-color: #e5e5e5;
`;

const PopOutWindowAlbumGrid = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  overflow: hidden;
  margin: 5%;
  width: 90%;
  height: 100%;
`;

const FlexPicWrapperSmalls = styled.div`
  margin: 5px;
  width: 30%;
`;

const FlexPicWrapperFull = styled.div`
  width: 100%;
  height: 100%;
`;

const MainHeaderOfText = styled.div`
  font-weight: bolder;
  text-decoration: underline;
  text-align: left;
  width: 80%;
  height: 5%;
  font-size: 1.2em;
  padding-left: 20px;
`;

const HeaderOfText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

const PopUpWindow = (props) => {

  return (
  <div>
    <PopOutWindowOfPics id='picturePopOutWindowOfPics'>
          <ClosePopUpButton onClick={props.toggleWindowClosed}>&#x2573;</ClosePopUpButton>
          <PopUpFlexWrappers>
            <AlbumWrapper>
              <PopOutWindowAlbumGrid>
                <HeaderOfText>Albums Based On Tags: </HeaderOfText>
                <AlbumProcessor tags={props.tags} changeContent={props.setWindowContent}/>
              </PopOutWindowAlbumGrid>
            </AlbumWrapper>
            <PopOutWindowFlex>
              <MainHeaderOfText>{props.flexPicsIs}</MainHeaderOfText>
              {
                props.flexedPics.map((photo, index) => {
                  if (props.isFullSize) {
                    return (
                      <FlexPicWrapperFull key={'popOut' + index} id={'FlexPicWrapper'}>
                        <PopOutFlexPics photo={photo}  id={index} changePic={() => {
                          props.changeMainPic(event, null , props.setWindowContent)
                        }} picId={props.mainPhotoId > 0 ? props.mainPhotoId - 1 : props.photos.length - 1}/>
                      </FlexPicWrapperFull>
                    )
                  } else {
                    return (
                      <FlexPicWrapperSmalls key={'popOut' + index} id={'FlexPicWrapper'}>
                        <PopOutFlexPics photo={photo} changePhoto={() => {
                          props.changeMainPic(null, photo, prop.setWindowContent)
                        }}/>
                      </FlexPicWrapperSmalls>
                    )
                  }
                })
              }
            </PopOutWindowFlex>
          </PopUpFlexWrappers>
        </PopOutWindowOfPics>

        <GreyOutBackground id='pictureGreyOutBackground' onClick={props.toggleWindowClosed}/>
      </div>
  )

}

export default PopUpWindow;