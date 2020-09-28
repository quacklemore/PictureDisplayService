import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import MainPic from './mainPic.jsx';
import GridPics from './gridPics.jsx';
import SidebarPics from './sidebarPics.jsx';

//Styling
const PictureContainer = styled.div`
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
      users: []
    }
  }

  getPhotos() {
    axios.post('/api/pictures/', {
      "hotel": this.state.currentHotel
    })
    .then((data) => {
      let userArray = [];
      console.log(data);
      data.data.map((photo) => {
        userArray.push(photo.user);
      })
      this.setState({
        photos: data.data,
        users: userArray
      })
      console.log(this.state.photos);
      console.log(this.state.users);
    })
    .catch((err) => {
      throw err;
    })
  }

  componentDidMount () {
    this.getPhotos();
  }

  render () {

    return (
      <PictureContainer>
        <PictureMainViewer>
          <MainPic />
        </PictureMainViewer>
        <PictureMiniGrid>
          <GridPics />
        </PictureMiniGrid>
        <PictureSideGrid>
          <SidebarPics />
        </PictureSideGrid>

      </PictureContainer>
    );
  }

}

export default PictureDisplayApp;