import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'underscore';

import MainPic from './mainPic.jsx';
import SidebarPics from './sidebarPics.jsx';
import Thumbnail from './thumbnail.jsx';
import PopOutFlexPics from './popOutFlexGridPics.jsx';
import AlbumProcessor from './AlbumIntercept.jsx';

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


//styling pop out window
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
  overflow: scroll;
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
  z-index: 20;
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
  opacity: 40%;
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
  opacity: 40%;
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
      flexedPics: [],
      flexPicsIs: '',
      isFullSize: false
    }
  }

  getIdFromMainImgUrl(sentUrl) {
    let indexMain = sentUrl.indexOf('main');
    let indexJpg = sentUrl.indexOf('.jpg');
    let id = sentUrl.substring(indexMain + 4, indexJpg);
    return id;
  }

  changeMainPic (event, sentUrl, callback = () => {}) {
    let id;
    let newMain;
    if (event === null) {
      newMain = sentUrl;
      let id = this.getIdFromMainImgUrl(sentUrl);
      id--;
      this.setState({
        mainPhoto: newMain,
        mainPhotoId: id
      });
      callback('main', undefined, id);
    } else {
      id = Number.parseInt(event.target.id);
      let newMain = this.state.photos[id].imgMainUrl;
      this.setState({
        mainPhoto: newMain,
        mainPhotoId: id
      });
      callback('main', undefined, id);
    }
  }

  //pop up window
  toggleWindowOpen (comp) {

    this.setWindowContent(comp);

    document.getElementById('picturePopOutWindowOfPics').style.opacity = '100%';
    document.getElementById('picturePopOutWindowOfPics').style.zIndex = 4;
    document.getElementById('pictureGreyOutBackground').style.opacity = '60%';
    document.getElementById('pictureGreyOutBackground').style.zIndex = 3;

  }

  toggleWindowClosed() {
    document.getElementById('picturePopOutWindowOfPics').style.opacity = '0%';
    document.getElementById('picturePopOutWindowOfPics').style.zIndex = -3;
    document.getElementById('pictureGreyOutBackground').style.opacity = '0%';
    document.getElementById('pictureGreyOutBackground').style.zIndex = -2;
  }

  //Click router got pop-up window
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

  setWindowContent (comp, tag, id) {
    let statement;

    if (comp === 'main') {
      let fullMain = [];
      fullMain.push(id === undefined ? this.state.photos[this.state.mainPhotoId].imgFullUrl : this.state.photos[id].imgFullUrl);
      statement = `Photo uploaded by ${id === undefined ? this.state.photos[this.state.mainPhotoId].user : this.state.photos[id].user}:`;
      this.setState({
        flexedPics: fullMain,
        isFullSize: true
      })
    } else if (comp === 'most') {
      let arrayOfMost = this.state.tags[this.state.tags.most].map((photo) => {
        return photo.imgMainUrl;
      });
      statement = `${this.state.tags.most}:`;
      this.setState({
        flexedPics: arrayOfMost,
        isFullSize: false
      })
    } else if (comp === 'secMost') {
      let arrayOfSecMost = this.state.tags[this.state.tags.secondMost].map((photo) => {
        return photo.imgMainUrl;
      });
      statement = `${this.state.tags.secondMost}:`;
      this.setState({
        flexedPics: arrayOfSecMost,
        isFullSize: false
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
      statement = `All photos, sorted by user name:`;
      this.setState({
        flexedPics: sortedPhotos,
        isFullSize: false
      })
    } else if (comp === 'special') {
      let specialItems = this.state.photos.map((photo) => {
        return photo.special.specialItem;
      })
      statement = `${this.state.special.specialItemType}:`;
      this.setState({
        flexedPics: specialItems,
        isFullSize: true
      })
      //REFACTOR WHEN USING SPECIAL MEDIA TYPES
      if (this.state.photos.special.specialItemType === 'panorama') {

      } else if (this.state.photos.special.specialItemType === 'video') {

      }
    } else if (comp === 'tag') {
      let tagArray = this.state.tags[tag];
      let tagPhotoArray = tagArray.map((photo) => {
        return photo.imgMainUrl;
      })
      statement = `${tag}:`;
      this.setState({
        flexedPics: tagPhotoArray,
        isFullSize: false
      })
    }
    this.setState({
      flexPicsIs: statement
    })
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
      let tagAlbumArr = [];

      let userArr = [];

      let sortedPhotos = res.data.sort((photoObj1, photoObj2) => {
        let id1 = this.getIdFromMainImgUrl(photoObj1.imgMainUrl);
        let id2 = this.getIdFromMainImgUrl(photoObj2.imgMainUrl);
        return id1 - id2;
      })

      this.setState({ photos: sortedPhotos });
      this.setState({ mainPhoto: res.data[0].imgMainUrl })
      this.setState({ miniGrid: res.data.slice(0, 20) })

      res.data.map((photoObj, i) => {

        userArr.push(photoObj.user);
        if (tagObj[photoObj.tag] === undefined) {

          let tempTagObj = {};
          tempTagObj.tag = photoObj.tag;
          tempTagObj.photo = photoObj.imgMainUrl;
          tagAlbumArr.push(tempTagObj);

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
      tagObj.albums = tagAlbumArr;
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
          <PopUpFlexWrappers>
            <AlbumWrapper>
              <PopOutWindowAlbumGrid>
                <HeaderOfText>Albums Based On Tags: </HeaderOfText>
                <AlbumProcessor tags={this.state.tags.albums} changeContent={this.setWindowContent.bind(this)}/>
              </PopOutWindowAlbumGrid>
            </AlbumWrapper>
            <PopOutWindowFlex>
              <MainHeaderOfText>{this.state.flexPicsIs}</MainHeaderOfText>
              {
                this.state.flexedPics.map((photo, index) => {
                  if (this.state.isFullSize) {
                    return (
                      <FlexPicWrapperFull key={'popOut' + index} id={'FlexPicWrapper'}>
                        <PopOutPicArrowLeftBox onClick={() => {
                          this.changeMainPic(event, null , this.setWindowContent.bind(this))
                        }} id={this.state.mainPhotoId > 0 ? this.state.mainPhotoId - 1 : this.state.photos.length - 1}>
                          <PopOutPicArrowLeft />
                        </PopOutPicArrowLeftBox>
                        <PopOutFlexPics photo={photo}  id={index} />
                        <PopOutPicArrowRightBox onClick={() => {
                          this.changeMainPic(event, null , this.setWindowContent.bind(this))
                        }} id={this.state.mainPhotoId < this.state.photos.length - 1 ? this.state.mainPhotoId + 1 : 0}>
                          <PopOutPicArrowRight />
                        </PopOutPicArrowRightBox>
                      </FlexPicWrapperFull>
                    )
                  } else {
                    return (
                      <FlexPicWrapperSmalls key={'popOut' + index} id={'FlexPicWrapper'}>
                        <PopOutFlexPics photo={photo} changePhoto={() => {
                          this.changeMainPic(null, photo, this.setWindowContent.bind(this))
                        }}/>
                      </FlexPicWrapperSmalls>
                    )
                  }
                })
              }
            </PopOutWindowFlex>
          </PopUpFlexWrappers>
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