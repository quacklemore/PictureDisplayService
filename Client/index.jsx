import React from 'react';
import ReactDOM from 'react-dom';
import PictureDisplayApp from './components/PictureDisplayApp.jsx';

  let hotelId = window.location.pathname.slice(1, -1);
  if (window.location.pathname === '/') {
    hotelId = 'hotel0';
  }

ReactDOM.render(<PictureDisplayApp hotelId={hotelId} />, document.getElementById('pictureDisplayApp'));