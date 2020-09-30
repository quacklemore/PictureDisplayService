import React from 'react';
import styled from 'styled-components';
import Thumbnail from './thumbnail.jsx';

const GridPics = (props) => {

  const GridOfPics = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 60px, [col-start]);
    grid-template-rows: repeat(2, 50px, [row-start]);
    grid-template-areas:
    "grid0 grid1 grid2 grid3 grid4 grid5 grid6 grid7 grid8 grid9 "
    "grid10 grid11 grid12 grid13 grid14 grid15 grid16 grid17 grid18 grid19";
  `;

  return (
    <GridOfPics>
      {
        props.picsArray.map((photoObj, index) => {
          const ThumbWrapper = styled.div`
            grid-area: ${'grid' + index};
            background-color: blueviolet;
            `;
           return (
           <ThumbWrapper>
              <Thumbnail photo={photoObj.imgUrl}/>
            </ThumbWrapper>
           )
        })
      }
    </GridOfPics>
  )

}

export default GridPics;