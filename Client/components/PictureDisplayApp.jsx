import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'underscore';

import MainPic from './mainPic.jsx';
import PopUpWindow from './PopoutWindow.jsx'
import SidebarPics from './sidebarPics.jsx';
import Thumbnail from './thumbnail.jsx';

//Styling

const PictureContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  font-family: 'Quicksand', Arial;
  z-index: 1;
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
  z-index: 1;
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
  z-index: 1;
`;

//App itself
class PictureDisplayApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentHotel: 'hotel0',
      photos: [],
      mainGalleryPhotos: [],
      currentMainPhotoIndex: 0,
      miniGrid: [],
      windowFullSizePhotos: [],
      currentFullSizePhotoIndex: 0,
      users: [],
      tags: {},
      flexPicsIs: '',
      flexedPics: [],
      sentUrl: '',
      isFullSize: false,
      windowOpen: false
    }
  }

  changeMainPic (event, direction, sentUrl, callback = () => {}) {
    let nextIndex;
    if (sentUrl !== undefined) {
      let sentURLIndex = this.state.windowFullSizePhotos.indexOf(sentUrl);
      this.setState({
        currentFullSizePhotoIndex: sentURLIndex
      })
    } else {
      nextIndex = this.state.currentMainPhotoIndex;
      if (event === null) {
        if (direction === 'right') {
          nextIndex + 1 > this.state.mainGalleryPhotos.length - 1 ? nextIndex = 0 : nextIndex++;
        } else {
          nextIndex - 1 < 0 ? nextIndex = this.state.mainGalleryPhotos.length - 1 : nextIndex--;
        }
      } else {
        nextIndex = event.target.id;
      }
      this.setState({
        currentMainPhotoIndex: nextIndex
      })

    }

    callback('main', undefined, sentUrl);
  }

  changeFullPic (event, direction, sentUrl, callback = () => {}) {
    let nextIndex;
    if (sentUrl !== undefined) {
      let sentURLIndex = this.state.windowFullSizePhotos.indexOf(sentUrl);
      this.setState({
        currentFullSizePhotoIndex: sentURLIndex
      })
    } else {
      nextIndex = this.state.currentFullSizePhotoIndex;
      if (event === null) {
        if (direction === 'right') {
          nextIndex + 1 > this.state.windowFullSizePhotos.length - 1 ? nextIndex = 0 : nextIndex++;
        } else {
          nextIndex - 1 < 0 ? nextIndex = this.state.windowFullSizePhotos.length - 1 : nextIndex--;
        }
      } else {
        nextIndex = event.target.id;
      }
      this.setState({
        currentFullSizePhotoIndex: nextIndex
      })
    }
    callback('main', undefined, sentUrl);
  }

  //pop up window
  toggleWindowOpen () {

    document.getElementById('picturePopOutWindowOfPics').style.opacity = '100%';
    document.getElementById('picturePopOutWindowOfPics').style.width = '95%';
    document.getElementById('picturePopOutWindowOfPics').style.height = '95%';
    document.getElementById('picturePopOutWindowOfPics').style.zIndex = 1001;
    document.getElementById('pictureGreyOutBackground').style.zIndex = 1000;
    document.getElementById('pictureGreyOutBackground').style.opacity = '60%';
    document.getElementById('pictureGreyOutBackground').style.width = "100%";
    document.getElementById('pictureGreyOutBackground').style.height = "100%";
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  toggleWindowClosed() {
    this.setState({
      windowOpen: false
    })
    document.getElementById('picturePopOutWindowOfPics').style.opacity = '0%';
    document.getElementById('picturePopOutWindowOfPics').style.width = '0.01%';
    document.getElementById('picturePopOutWindowOfPics').style.height = '0.01%';
    document.getElementById('pictureGreyOutBackground').style.opacity = '0%';
    document.getElementById('pictureGreyOutBackground').style.width = "0.01%";
    document.getElementById('pictureGreyOutBackground').style.height = "0.01%";
    document.getElementsByTagName('body')[0].style.overflow = 'scroll';
  }

  setWindowContent (comp, tag, sentUrl) {

    let statement;
    if (comp === 'main') {
      if (sentUrl === undefined) {
        let currentPhotoObjectIndex = this.state.isFullSize ? this.state.currentFullSizePhotoIndex : this.state.currentMainPhotoIndex;
        statement = `Photo uploaded by ${this.state.photos[currentPhotoObjectIndex].user}:`;
        this.windowIsMain(currentPhotoObjectIndex);
      } else {
        let currentUser = this.state.photos.map((photoObj) => {
          if (photoObj.imgFullUrl === sentUrl || photoObj.imgMainUrl === sentUrl ) {
            return photoObj.user
          }
        })
        statement = `Photo uploaded by ${currentUser[0]}:`;
        this.windowIsMain(this.state.currentFullSizePhotoIndex);
      }
    } else if (comp === 'most') {
      statement = `${this.state.tags.most}:`;
      this.windowIsMost();
    } else if (comp === 'secMost') {
      statement = `${this.state.tags.secondMost}:`;
      this.windowIsSecMost();
    } else if (comp === 'user') {
      statement = `All photos, sorted by user name:`;
      this.windowIsUser();
    } else if (comp === 'tag') {
      statement = `${tag}:`;
      this.windowIsTags(tag);
    }
    this.setState({
      flexPicsIs: statement
    })
    this.toggleWindowOpen();
  }

  windowIsMain (currentPhotoObjectIndex) {
    let fullMain = [];
    fullMain.push(this.state.windowFullSizePhotos[currentPhotoObjectIndex]);
    this.setState({
      windowOpen: true,
      flexedPics: fullMain,
      isFullSize: true
      })
  }

  windowIsMost () {
    let arrayOfMost = this.state.tags[this.state.tags.most].map((photo) => {
      return this.state.isFullSize ? photo.imgFullUrl : photo.imgMainUrl;
    });
    this.setState({
      flexedPics: arrayOfMost,
      isFullSize: false
    })
  }

  windowIsSecMost () {
    let arrayOfSecMost = this.state.tags[this.state.tags.secondMost].map((photo) => {
      return this.state.isFullSize ? photo.imgFullUrl : photo.imgMainUrl;
    });
    this.setState({
      flexedPics: arrayOfSecMost,
      isFullSize: false
    })
  }

  windowIsUser () {
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
      return this.state.isFullSize ? photo.imgFullUrl : photo.imgMainUrl;
    })
    this.setState({
      flexedPics: sortedPhotos,
      isFullSize: false
    })
  }

  windowIsTags (tag) {
    let tagArray = this.state.tags[tag] === undefined ? [] : this.state.tags[tag];
      let tagPhotoArray = tagArray.map((photo) => {
        return this.state.isFullSize ? photo.imgFullUrl : photo.imgMainUrl;
      })
      this.setState({
        flexedPics: tagPhotoArray,
        isFullSize: false
      })
  }

  setHotelState(data) {
    this.setState({
      currentHotel: data.name
    })
  }

  setUpPhotoStates(data) {
    this.setState({
      photos: data.photoObjects,
      windowFullSizePhotos: data.FullPhotos,
      mainGalleryPhotos: data.MainPhotos,
      miniGrid: data.ThumbnailPhotos.slice(0, 20)
    })
  }

  setUpUserState(data) {
    let userArr = data.users;
    userArr = _.uniq(userArr);
    userArr.sort();
    this.setState({ users: userArr });
  }

  setUpTagsState(data) {
    let tagObj = {};
    let most = 0;
    let secondMost = 0;
    let tagAlbumArr = [];
    data.photoObjects.map((photoObj, i) => {
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

    tagObj.tags = data.tags;
    tagObj.albums = tagAlbumArr;
    this.setState({ tags: tagObj });
  }

  componentDidMount () {
    axios({
      url: `/api/pictures/${this.state.currentHotel}`,
      method: 'GET'
    })
    .then((res) => {
      console.log(res.data[0]);
      this.setHotelState(res.data[0]);
      this.setUpPhotoStates(res.data[0]);
      this.setUpUserState(res.data[0]);
      this.setUpTagsState(res.data[0]);
    })
    .catch((err) => {
      throw err;
    })
  }

  renderingSections () {

    if (this.state.tags === undefined) {
      return (
        <div></div>
      )
    } else {

      return (
      <div>
        <PictureContainer>
          <div>
            <PictureMainViewer>
              <MainPic
              photos={this.state.mainGalleryPhotos === undefined ? ['Loading...'] : this.state.mainGalleryPhotos}
              MainGalleryPicture={this.state.mainGalleryPhotos[this.state.currentMainPhotoIndex]}
              toggleWindowMain={this.setWindowContent.bind(this)}
              changeMainPic={this.changeMainPic.bind(this)}
              />
            </PictureMainViewer>
            <PictureMiniGrid>
              {
                this.state.miniGrid.map((photoUrl, index) => {

                  return (
                    <Thumbnail photo={photoUrl} id={index} changePic={this.changeMainPic.bind(this)} style={{position: 'absolute'}} key={photoUrl}/>
                    )
                  })
                }
            </PictureMiniGrid>
          </div>
          <PictureSideGrid>
            <SidebarPics
            winMost={this.setWindowContent.bind(this, 'most')}
            winSecMost={this.setWindowContent.bind(this, 'secMost')}
            winUser={this.setWindowContent.bind(this, 'user')}
            users={this.state.users === undefined ? ['Loading...'] : this.state.users}
            tags={this.state.tags}
            photos={this.state.mainGalleryPhotos === undefined ? ['Loading...'] : this.state.mainGalleryPhotos}/>
          </PictureSideGrid>
        </PictureContainer>
        <PopUpWindow
          toggleWindowClosed={this.toggleWindowClosed.bind(this)}
          tags={this.state.tags.albums}
          setWindowContent={this.setWindowContent.bind(this)}
          flexPicsIs={this.state.flexPicsIs}
          isFullSize={this.state.isFullSize}
          changeFullPic={this.changeFullPic.bind(this)}
          mainPicIndex={this.state.currentFullSizePhotoIndex}
          flexedPics={this.state.flexedPics === undefined ? [] : this.state.flexedPics}
          photos={this.state.photos}
      />
      </div>
      )
    }
  }


  render () {
    return (
      <div className="pictureModule" style={{ maxWidth: '813px', boxSizing: 'border-box'}}>
        {this.renderingSections()}
      </div>
    );
  }

}

export default PictureDisplayApp;