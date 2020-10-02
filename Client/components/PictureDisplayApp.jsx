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
  background-color: white;
  max-width: 600px;
  min-width: 400px;
  max-height: 400px;
  margin-right: 3px;
  margin-bottom: 3px;
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
    let newMain = this.state.photos[event.target.id].imgMainUrl;
    // console.log(newMain);
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
      // console.log("Got the response:", res.data[0]);

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
    // console.log(this.state.photos);

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
            <MainPic photo={this.state.mainPhoto} toggleWindow={this.toggleWindow.bind(this)}/>
          </PictureMainViewer>
          <PictureMiniGrid>
            {
              this.state.miniGrid.map((photoObj, index) => {
                const ThumbWrapper = styled.div`
                  flex: 1;
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
      <div className="pictureModule" style={{ maxWidth: '813px'}}>
        {this.renderingChoices()}
      </div>
    );
  }

}

export default PictureDisplayApp;