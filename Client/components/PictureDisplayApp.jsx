import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'underscore';

import MainPic from './mainPic.jsx';
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
`;

const PictureMiniGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 605px;
  background-color: rgba(74,74,74,.6);
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
  z-index: 1;
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
  transform: rotate(45deg);
  overflow: hidden;
`;

const MainPicArrowRightBox = styled.div`
  opacity: 20%;
  &:hover {
    opacity: 100%;
  }
  position: absolute;
  z-index: 1;
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

const MainPicFullViewIcon = styled.span`
  transform: rotate(-45deg);
  width: 1px;
  display: inline-block;
  margin: 15px 15px;
`;

const MainPicFullView = styled.div`
  position: relative;
  display: inline-block;
  top: 10%;
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
      miniGrid: [],
      tags: {},
      special: {}
    }
  }

  changeMainPic (event) {
    event.preventDefault();
    let newMain = this.state.photos[event.target.id].imgMainUrl;
    this.setState({
      mainPhoto: newMain
    });
  }

  toggleWindow (event) {
    console.log('clicked!');
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
      <PictureContainer>
        <div>
          <PictureMainViewer>
            <MainPicArrowLeftBox>
              <MainPicArrowLeft />
            </MainPicArrowLeftBox>
            <MainPicArrowRightBox>
              <MainPicArrowRight />
            </MainPicArrowRightBox>
            <MainPicFullViewBox>
              <MainPicFullView>
                <MainPicFullViewIcon>
                  &#8596;
                </MainPicFullViewIcon>
                  <span>Full View</span>
              </MainPicFullView>
            </MainPicFullViewBox>
            <MainPic photo={this.state.mainPhoto} toggleWindow={this.toggleWindow.bind(this)}/>
          </PictureMainViewer>
          <PictureMiniGrid>
            {
              this.state.miniGrid.map((photoObj, index) => {
                const ThumbWrapper = styled.div`
                  flex: 1;
                  background-color: white;
                  border-top: 2px solid white;
                  `;
                return (
                <ThumbWrapper key={photoObj.imgThumbUrl}>
                      <Thumbnail photo={photoObj.imgThumbUrl} id={index} changePic={this.changeMainPic.bind(this)}/>
                  </ThumbWrapper>
                )
              })
            }
          </PictureMiniGrid>
        </div>
        <PictureSideGrid>
          <SidebarPics toggleWindow={this.toggleWindow.bind(this)} users={this.state.users} tags={this.state.tags} special={this.state.special} photos={this.state.photos}/>
        </PictureSideGrid>
      </PictureContainer>
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