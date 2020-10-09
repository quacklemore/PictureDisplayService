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
      users: [],
      mainPhoto: '',
      mainPhotoId: 0,
      miniGrid: [],
      tags: {},
      special: {},
      flexedPics: [],
      flexPicsIs: '',
      sentUrl: '',
      isFullSize: false,
      windowFullSizeId: 0,
      windowFullSizePic: '',
      windowFullSizePhotos: [],
      windowOpen: false
    }
  }

  getIdFromMainImgUrl(sentUrl) {
    let indexMain = sentUrl.indexOf('main') === -1 ? sentUrl.indexOf('full') : sentUrl.indexOf('main');
    let indexJpg = sentUrl.indexOf('.jpg');
    let id = sentUrl.substring(indexMain + 4, indexJpg);
    return id;
  }

  changeMainPic (event, sentUrl, callback = () => {}) {
    let id;
    let newMain;
    if (event === null) {
      newMain = sentUrl;
      id = this.getIdFromMainImgUrl(sentUrl);
      this.state.isFullSize === false ? id-- : id = id;
    } else {
      id = Number.parseInt(event.target.id);
      newMain = this.state.photos[id].imgMainUrl;
    }

    if (this.state.windowOpen) {
      this.setState({
        windowFullSizePic: newMain,
        windowFullSizeId: id
      });
    } else {
      this.setState({
        mainPhoto: newMain,
        mainPhotoId: id
      });
    }
    callback('main', undefined, id);
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

  setWindowContent (comp, tag, id) {

    let statement;

    if (comp === 'main') {
      statement = `Photo uploaded by ${id === undefined ? this.state.photos[this.state.mainPhotoId].user : this.state.photos[id].user}:`;
      this.windowIsMain(id);
    } else if (comp === 'most') {
      statement = `${this.state.tags.most}:`;
      this.windowIsMost();
    } else if (comp === 'secMost') {
      statement = `${this.state.tags.secondMost}:`;
      this.windowIsSecMost();
    } else if (comp === 'user') {
      statement = `All photos, sorted by user name:`;
      this.windowIsUser();
    } else if (comp === 'special') {
      statement = `${this.state.special.specialItemType}:`;
      this.windowIsSpecial();
    } else if (comp === 'tag') {
      statement = `${tag}:`;
      this.windowIsTags(tag);
    }
    this.setState({
      flexPicsIs: statement
    })

    this.toggleWindowOpen();
  }

  windowIsMain (id) {
    let fullMain = [];
    fullMain.push(id === undefined ? this.state.photos[this.state.mainPhotoId].imgFullUrl : this.state.photos[id].imgFullUrl);
    let photo = this.state.mainPhoto;
    let photoId = this.state.mainPhotoId;
    this.setState({
      windowFullSizeId: photoId,
      windowFullSizePic: photo,
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

  //currently not in use
  windowIsSpecial () {
    let specialItems = this.state.photos.map((photo) => {
      return photo.special.specialItem;
    })
    this.setState({
      flexedPics: specialItems,
      isFullSize: true
    })
    //REFACTOR WHEN USING SPECIAL MEDIA TYPES
    if (this.state.photos.special.specialItemType === 'panorama') {

    } else if (this.state.photos.special.specialItemType === 'video') {

    }
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

  }

  setUpPhotoStates(data) {
    let sortedPhotos = data.sort((photoObj1, photoObj2) => {
      let id1 = this.getIdFromMainImgUrl(photoObj1.imgMainUrl);
      let id2 = this.getIdFromMainImgUrl(photoObj2.imgMainUrl);
      return id1 - id2;
    });
    this.setState({ photos: sortedPhotos });
    this.setState({ mainPhoto: data[0].imgMainUrl });
    this.setState({ miniGrid: data.slice(0, 20) });
  }

  setUpUserState(data) {
    let userArr = [];

    data.map((photoObj, i) => {
      userArr.push(photoObj.user);
    })

    userArr = _.uniq(userArr);
    userArr.sort();
    this.setState({ users: userArr });
  }

  setUpTagsState(data) {
    let tagObj = {};
    let most = 0;
    let secondMost = 0;
    let tagArr = [];
    let tagAlbumArr = [];

    data.map((photoObj, i) => {
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

    tagObj.tags = tagArr;
    tagObj.albums = tagAlbumArr;
    this.setState({ tags: tagObj });
  }

  setUpSpecialMediaState(data) {
    this.setState({ special: data });
  }

  componentDidMount () {
    axios({
      url: `/api/pictures/${this.state.currentHotel}`,
      method: 'GET'
    })
    .then((res) => {
      this.setHotelState(res.data);
      this.setUpPhotoStates(res.data);
      this.setUpUserState(res.data);
      this.setUpTagsState(res.data);
      this.setUpSpecialMediaState(res.data);
    })
    .catch((err) => {
      throw err;
    })
  }

  renderingSections () {

    if (this.state.tags === undefined || this.state.special === undefined) {
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
              photo={this.state.mainPhoto === undefined ? 'Loading...' : this.state.mainPhoto}
              changeMainPic={this.changeMainPic.bind(this)}
              mainPhotoId={this.state.mainPhotoId}
              photos={this.state.photos === undefined ? ['Loading...'] : this.state.photos}
              toggleWindowMain={this.setWindowContent.bind(this, 'main')}/>
            </PictureMainViewer>
            <PictureMiniGrid>
              {
                this.state.miniGrid.map((photoObj, index) => {

                  return (
                    <Thumbnail photo={photoObj.imgThumbUrl} id={index} changePic={this.changeMainPic.bind(this)} style={{position: 'absolute'}} key={photoObj.imgThumbUrl}/>
                    )
                  })
                }
            </PictureMiniGrid>
          </div>
          <PictureSideGrid>
            <SidebarPics winMost={this.setWindowContent.bind(this, 'most')} winSecMost={this.setWindowContent.bind(this, 'secMost')} winUser={this.setWindowContent.bind(this, 'user')} winSpec={this.setWindowContent.bind(this, 'special')} users={this.state.users === undefined ? ['Loading...'] : this.state.users} tags={this.state.tags} special={this.state.special} photos={this.state.photos === undefined ? ['Loading...'] : this.state.photos}/>
          </PictureSideGrid>
        </PictureContainer>
        <PopUpWindow
          toggleWindowClosed={this.toggleWindowClosed.bind(this)}
          tags={this.state.tags.albums}
          setWindowContent={this.setWindowContent.bind(this)}
          flexPicsIs={this.state.flexPicsIs}
          isFullSize={this.state.isFullSize}
          changeMainPic={this.changeMainPic.bind(this)}
          mainPhotoId={this.state.windowFullSizeId}
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