import React from 'react';
import styled from 'styled-components';

import MainPic from './mainPic.jsx';
import GridPics from './gridPics.jsx';
import SidebarPics from './sidebarPics.jsx';


class PictureDisplayApp extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    return (
      <div className="picture-container">
        <div id="picture-mainViewer">
          <MainPic />
        </div>
        <div id="picture-miniGrid">
          <GridPics />
        </div>

        <div id="picture-sideGrid">
          <SidebarPics />
        </div>

      </div>
    );
  }

}

export default PictureDisplayApp;