import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'underscore';

import MainPic from './mainPic.jsx';
import GridPics from './gridPics.jsx';
import SidebarPics from './sidebarPics.jsx';

//Styling
const PictureAndGridContainer = styled.div`
display: grid;
grid-template-columns: repeat(13, 60px, [col-start]);
grid-template-rows: repeat(10, 50px, [row-start]);
background-color: green;
width: 818px;
height: 481px;
grid-template-areas:
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"gallery gallery gallery gallery gallery gallery gallery gallery gallery gallery viewOptions viewOptions viewOptions"
"gallery gallery gallery gallery gallery gallery gallery gallery gallery gallery viewOptions viewOptions viewOptions";
`

const PictureNoGalleryContainer = styled.div`
display: grid;
grid-template-columns: repeat(13, 60px, [col-start]);
grid-template-rows: repeat(10, 50px, [row-start]);
background-color: green;
width: 818px;
height: 481px;
grid-template-areas:
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions"
"main main main main main main main main main main viewOptions viewOptions viewOptions";
`

const PictureMainViewer = styled.div`
  grid-area: main;
  background-color: teal;
`

const PictureMiniGrid = styled.div`
  grid-area: gallery;
  background-color: orange;
`

const PictureSideGrid = styled.div`
  grid-area: viewOptions;
  background-color: blueviolet;
`;

//App itself
class PictureDisplayApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentHotel: 'hotel0',
      photos: [],
      users: [],
      mainPhoto: {},
      miniGrid: [],
      sideBarGrid: []
    }
  }

  componentDidMount () {
    axios('/api/pictures/', {
      method: 'POST',
      data: {
        "hotel": this.state.currentHotel
      }
    })
    .then((res) => {
      console.log("Got the response:", res.data[0].imgUrl);
      let tagArr = [];
      let userArr = [];
      this.setState({ photos: res.data });
      this.setState({ mainPhoto: res.data[0].imgUrl })
      this.setState({ miniGrid: res.data.slice(0, 20) })
      res.data.map((photoObj) => {
        userArr.push(photoObj.user);
        tagArr.push(photoObj.tag);
        userArr = _.uniq(userArr).sort();
        tagArr = _.uniq(tagArr).sort();
      })
      this.setState({ sideBarGrid: [userArr, tagArr, res.data[0].special] })

    })
    .catch((err) => {
      throw err;
    })
  }

  renderingChoices () {

    if (this.state.photos.length < 20) {
      return (
      <PictureNoGalleryContainer>
        <PictureMainViewer>
          <MainPic photo={this.state.mainPhoto}/>
        </PictureMainViewer>
        <PictureSideGrid>
          <SidebarPics catagories={this.state.sideBarGrid}/>
        </PictureSideGrid>
      </PictureNoGalleryContainer>
      )
    } else {
      return (
        <PictureAndGridContainer>
        <PictureMainViewer>
          <MainPic photo={this.state.mainPhoto}/>
        </PictureMainViewer>
        <PictureMiniGrid>
          <GridPics picsArray={this.state.miniGrid}/>
        </PictureMiniGrid>
        <PictureSideGrid>
          <SidebarPics catagories={this.state.sideBarGrid}/>
        </PictureSideGrid>
      </PictureAndGridContainer>
      )
    }
  }

  render () {

    return (
      <div className="pictureModule">
        {this.renderingChoices()}
      </div>
    );
  }

}

export default PictureDisplayApp;