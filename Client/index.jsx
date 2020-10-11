import React from 'react';
import ReactDOM from 'react-dom';
import PictureDisplayApp from './components/PictureDisplayApp.jsx';

// const hotelId = window.location.pathname.slice(7, -1);
const hotelId = 'hotel5';

ReactDOM.render(<PictureDisplayApp hotelId={hotelId}/>, document.getElementById('pictureDisplayApp'));