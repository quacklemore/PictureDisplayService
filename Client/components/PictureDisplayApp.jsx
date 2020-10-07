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
  font-family: 'Quicksand';
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
    document.getElementById('picturePopOutWindowOfPics').style.opacity = '0%';
    document.getElementById('picturePopOutWindowOfPics').style.width = '0.01%';
    document.getElementById('picturePopOutWindowOfPics').style.height = '0.01%';
    document.getElementById('pictureGreyOutBackground').style.opacity = '0%';
    document.getElementById('pictureGreyOutBackground').style.width = "0.01%";
    document.getElementById('pictureGreyOutBackground').style.height = "0.01%";
    document.getElementsByTagName('body')[0].style.overflow = 'scroll';
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
      let tagArray = this.state.tags[tag] === undefined ? [] : this.state.tags[tag];
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
    axios({
      url: `/api/pictures/${this.state.currentHotel}`,
      method: 'GET'
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
        {/* ReactDom.createPortal( */}
        <PopUpWindow
          toggleWindowClosed={this.toggleWindowClosed.bind(this)}
          tags={this.state.tags.albums}
          setWindowContent={this.setWindowContent.bind(this)}
          flexPicsIs={this.state.flexPicsIs === undefined ? [] : this.state.flexPicsIs}
          isFullSize={this.state.isFullSize}
          changeMainPic={this.changeMainPic.bind(this)}
          mainPhotoId={this.state.mainPhotoId === undefined ? '' : this.state.mainPhotoId}
          photos={this.state.photos === undefined ? [] : this.state.mainPhotoId}
          />

        {/* , document.getElementById('pictureDisplayPortal')) */}

        {/* Main module business */}
        <PictureContainer>
          <div>
            <PictureMainViewer>
              <MainPic photo={this.state.mainPhoto} changeMainPic={this.changeMainPic.bind(this)} mainPhotoId={this.state.mainPhotoId} photos={this.state.photos} toggleWindowMain={this.toggleWindowMain.bind(this)}/>
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