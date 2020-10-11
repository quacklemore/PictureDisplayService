import React from 'react';
import ReactDOM from 'react-dom';
import PictureDisplayApp from './components/PictureDisplayApp.jsx';

  const hotelId = window.location.pathname.slice(1, -1);

ReactDOM.render(<PictureDisplayApp hotelId={hotelId} />, document.getElementById('pictureDisplayApp'));