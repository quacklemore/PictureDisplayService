import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'underscore';

import MainPic from './mainPic.jsx';
import SidebarPics from './sidebarPics.jsx';
import Thumbnail from './thumbnail.jsx';
import PopOutFlexPics from './popOutFlexGridPics.jsx';

//Styling

const PictureContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: flex-start;
align-items: stretch;
font-family: 'Quicksand';
`;

const PictureMainViewer = styled.div`
  position: relative;
  background-color: white;
  max-width: 600px;
  height: 400px;
  border: 3px solid white;
  background-color: rgba(74,74,74,.6);
  color: #fff;
  cursor: pointer;
  z-index: 1;
`;

const PictureMiniGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 605px;
`;

const PictureSideGrid = styled.div`
  display: flex;
  overflow: hidden;
  flex-flow: column wrap;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 25%;
  max-width: 200px;
  min-width: 170px;
`;

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

const PopOutWindowOfPics = styled.div`
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  width: 95%;
  height: 95%;
  background-color: white;
  opacity: 0%;
  z-index: -2;
  box-shadow: 10px 10px 15px grey;
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
`;

const GreyOutBackground = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  opacity: 0%;
  background-color: grey;
  z-index: -2;
`;

const ThumbCover = styled.div`
  position: absolute;
  width: 58px;
  height: 48px;
  opacity: 50%;
  background-color: black;
  &:hover{
    opacity: 0%;
  }
`;

const PopOutWindowFlex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: stretch;
  overflow: scroll;
  width: 100%;
  height: 100%;
`;

const FlexPicWrapper = styled.div`
  margin: 10px;
  max-height: 95%;
`;

//App itself
class PictureDisplayApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentHotel: 'hotel0',
      photos: [],
      users: [],
      mainPhoto: '',
      mainPhotoId: 0,
      miniGrid: [],
      tags: {},
      special: {},
      flexedPics: []
    }
  }

  changeMainPic (event) {
    event.preventDefault();
    let change;
    let id = Number.parseInt(event.target.id);
    let newMain = this.state.photos[event.target.id].imgMainUrl;
    this.setState({
      mainPhoto: newMain,
      mainPhotoId: id
    });
  }

  //pop up window
  toggleWindowOpen (comp) {
    document.getElementById('picturePopOutWindowOfPics').style.opacity = '100%';
    document.getElementById('picturePopOutWindowOfPics').style.zIndex = 4;
    document.getElementById('pictureGreyOutBackground').style.opacity = '60%';
    document.getElementById('pictureGreyOutBackground').style.zIndex = 3;

    //filtering the pictures for the window
    if (comp === 'main') {
      let fullMain = [];
      fullMain.push(this.state.photos[this.state.mainPhotoId].imgFullUrl);
      this.setState({
        flexedPics: fullMain
      })
    } else if (comp === 'most') {
      let arrayOfMost = this.state.tags[this.state.tags.most].map((photo) => {
        return photo.imgMainUrl;
      });
      this.setState({
        flexedPics: arrayOfMost
      })
    } else if (comp === 'secMost') {
      let arrayOfSecMost = this.state.tags[this.state.tags.secondMost].map((photo) => {
        return photo.imgMainUrl;
      });
      this.setState({
        flexedPics: arrayOfSecMost
      })
    } else if (comp === 'user') {
      let arrayOfSorted = this.state.photos.sort((photo1, photo2) => {
        if (photo1.user.toLowerCase() < photo2.user.toLowerCase()) {
          return -1;
        } else if (photo1.user.toLowerCase() > photo2.user.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
      let sortedPhotos = arrayOfSorted.map((photo) => {
        return photo.imgMainUrl;
      })
      this.setState({
        flexedPics: sortedPhotos
      })
    } else if (comp === 'special') {
      let specialItems = this.state.photos.map((photo) => {
        return photo.special.specialItem;
      })
      this.setState({
        flexedPics: specialItems
      })
      //REFACTOR WHEN USING SPECIAL MEDIA TYPES
      if (this.state.photos.special.specialItemType === 'panorama') {

      } else if (this.state.photos.special.specialItemType === 'video') {

      }
    }

  }

  toggleWindowClosed() {
    document.getElementById('picturePopOutWindowOfPics').style.opacity = '0%';
    document.getElementById('picturePopOutWindowOfPics').style.zIndex = -3;
    document.getElementById('pictureGreyOutBackground').style.opacity = '0%';
    document.getElementById('pictureGreyOutBackground').style.zIndex = -2;
  }

  //Click router
  toggleWindowMain () {
    this.toggleWindowOpen('main');
  }

  toggleWindowMost () {
    this.toggleWindowOpen('most');
  }

  toggleWindowSecMost () {
    this.toggleWindowOpen('secMost');
  }

  toggleWindowUser () {
    this.toggleWindowOpen('user');
  }

  toggleWindowSpecial () {
    this.toggleWindowOpen('special');
  }

  componentDidMount () {
    axios('/api/pictures/', {
      method: 'POST',
      data: {
        "hotel": this.state.currentHotel
      }
    })
    .then((res) => {

      //finding the most common tag and storing those pictures
      let tagObj = {};
      let most = 0;
      let secondMost = 0;
      let tagArr = [];

      let userArr = [];
      this.setState({ photos: res.data });
      this.setState({ mainPhoto: res.data[0].imgMainUrl })
      this.setState({ miniGrid: res.data.slice(0, 20) })
      // debugger;
      res.data.map((photoObj, i) => {
        userArr.push(photoObj.user);
        if (tagObj[photoObj.tag] === undefined) {
          tagObj[photoObj.tag] = [];
          tagObj[photoObj.tag].push(photoObj);
        } else {
          tagObj[photoObj.tag].push(photoObj);
        }
      })
      for (let key in tagObj) {
        tagArr.push(key);
        if (tagObj[key].length > most) {
          if (most !== 0) {
            secondMost = most;
            tagObj.secondMost = tagObj.most;
          }
          most = tagObj[key].length;
          tagObj.most = key;
        } else if (tagObj[key].length <= most && tagObj.most !== key && tagObj[key].length > secondMost) {
          secondMost = tagObj[key].length;
          tagObj.secondMost = key;
        }
      }
      userArr = _.uniq(userArr);
      userArr.sort();
      this.setState({ users: userArr });
      tagObj.tags = tagArr;
      this.setState({ tags: tagObj })
      this.setState({ special: res.data[0].special })

    })
    .catch((err) => {
      throw err;
    })
  }

  renderingChoices () {
    if (this.state.photos.length < 20) {
      return (
      <PictureContainer>
        <PictureMainViewer>
          <MainPic photo={this.state.mainPhoto}/>
        </PictureMainViewer>
        <PictureSideGrid>
          <SidebarPics catagories={this.state.sideBarGrid}/>
        </PictureSideGrid>
      </PictureContainer>
      )
    } else {
      return (
      <div>
        {/* pop out window business */}
        <PopOutWindowOfPics id='picturePopOutWindowOfPics'>
          <ClosePopUpButton onClick={this.toggleWindowClosed}>&#x2573;</ClosePopUpButton>
          <PopOutWindowFlex>
            {
              this.state.flexedPics.map((photo, index) => {
                return (
                  <FlexPicWrapper key={'popOut' + index}>
                    <PopOutFlexPics photo={photo} />
                  </FlexPicWrapper>
                )
              })
            }
          </PopOutWindowFlex>
        </PopOutWindowOfPics>
        <GreyOutBackground id='pictureGreyOutBackground' onClick={this.toggleWindowClosed}/>

        {/* Main module business */}
        <PictureContainer>
          <div>
            <PictureMainViewer>
              <MainPicArrowLeftBox onClick={this.changeMainPic.bind(this)} id={this.state.mainPhotoId > 0 ? this.state.mainPhotoId - 1 : this.state.photos.length - 1}>
                <MainPicArrowLeft />
              </MainPicArrowLeftBox>
              <MainPicArrowRightBox onClick={this.changeMainPic.bind(this)} id={this.state.mainPhotoId < this.state.photos.length - 1 ? this.state.mainPhotoId + 1 : 0}>
                <MainPicArrowRight />
              </MainPicArrowRightBox>
              <div onClick={this.toggleWindowMain.bind(this)} name='viewAllPics'>
                <MainPicFullViewBox>
                  <MainPicFullView>
                      &#x2922;  Full View
                  </MainPicFullView>
                </MainPicFullViewBox>
                <ViewAllCamera src={'https://tripadcoba.s3-us-west-1.amazonaws.com/camera-512.png'} />
                <ViewAllWithNumber>
                  View all {this.state.photos !== undefined ? this.state.photos.length : 0} Photos
                </ViewAllWithNumber>
                <MainPic photo={this.state.mainPhoto}/>
              </div>
            </PictureMainViewer>
            <PictureMiniGrid>
              {
                this.state.miniGrid.map((photoObj, index) => {
                  const ThumbWrapper = styled.div`
                    flex: 1;
                    border-top: 2px solid white;
                    width: 60px;
                    height: 50px;
                    `;
                  return (
                  <ThumbWrapper key={photoObj.imgThumbUrl}>
                        <ThumbCover id={index} onClick={this.changeMainPic.bind(this)}/>
                        <Thumbnail photo={photoObj.imgThumbUrl} id={index} changePic={this.changeMainPic.bind(this)} style={{position: 'absolute'}}/>
                    </ThumbWrapper>
                  )
                })
              }
            </PictureMiniGrid>
          </div>
          <PictureSideGrid>
            <SidebarPics winMost={this.toggleWindowMost.bind(this)} winSecMost={this.toggleWindowSecMost.bind(this)} winUser={this.toggleWindowUser.bind(this)} winSpec={this.toggleWindowSpecial.bind(this)} users={this.state.users} tags={this.state.tags} special={this.state.special} photos={this.state.photos}/>
          </PictureSideGrid>
        </PictureContainer>
      </div>
      )
    }
  }

  render () {

    return (
      <div className="pictureModule" style={{ maxWidth: '813px', boxSizing: 'border-box'}}>
        {this.renderingChoices()}
      </div>
    );
  }

}

export default PictureDisplayApp;