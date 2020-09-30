import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'underscore';

import MainPic from './mainPic.jsx';
import GridPics from './gridPics.jsx';
import SidebarPics from './sidebarPics.jsx';
import Thumbnail from './thumbnail.jsx';

//Styling

const PictureContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: flex-start;
align-items: stretch;
`;

/* // const PictureAndGridContainer = styled.div`
// display: grid;
// grid-template-columns: repeat(13, 60px, [col-start]);
// grid-template-rows: repeat(10, 50px, [row-start]);
// background-color: green;
// width: 818px;
// height: 481px;
// grid-template-areas:
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "gallery gallery gallery gallery gallery gallery gallery gallery gallery gallery viewOptions viewOptions viewOptions"
// "gallery gallery gallery gallery gallery gallery gallery gallery gallery gallery viewOptions viewOptions viewOptions";
// `

// const PictureNoGalleryContainer = styled.div`
// display: grid;
// grid-template-columns: repeat(13, 60px, [col-start]);
// grid-template-rows: repeat(10, 50px, [row-start]);
// background-color: green;
// width: 818px;
// height: 481px;
// grid-template-areas:
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions"
// "main main main main main main main main main main viewOptions viewOptions viewOptions";
// ` */

const PictureMainViewer = styled.div`
  background-color: white;
  width: 600px;
  border: 2px solid white;
`;

const PictureMiniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 58px, [col-start]);
  grid-template-rows: repeat(2, 50px, [row-start]);
  margin-top: 2px;
  background-color: white;
  grid-template-areas:
  "grid0 grid1 grid2 grid3 grid4 grid5 grid6 grid7 grid8 grid9 "
  "grid10 grid11 grid12 grid13 grid14 grid15 grid16 grid17 grid18 grid19";
`;

const PictureSideGrid = styled.div`
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
      mainPhoto: '',
      miniGrid: [],
      sideBarGrid: []
    }
  }

  changeMainPic (event) {
    let newMain = this.state.photos[event.target.id].imgMainUrl;
    // console.log(newMain);
    this.setState({
      mainPhoto: newMain
    });
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
      let tagArr = [];
      let userArr = [];
      this.setState({ photos: res.data });
      this.setState({ mainPhoto: res.data[0].imgMainUrl })
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
            <MainPic photo={this.state.mainPhoto} />
          </PictureMainViewer>
          <PictureMiniGrid>
            {
              this.state.miniGrid.map((photoObj, index) => {
                const ThumbWrapper = styled.div`
                  grid-area: ${'grid' + index};
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
          <SidebarPics catagories={this.state.sideBarGrid}/>
        </PictureSideGrid>
      </PictureContainer>
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