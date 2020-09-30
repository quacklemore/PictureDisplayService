import React from 'react';
import styled from 'styled-components';
import Thumbnail from './thumbnail.jsx';



const GridPics = (props) => {

// console.log(props.picsArray);
  return (
    <GridOfPics>
      {
        props.picsArray.map((photoObj, index) => {
          const ThumbWrapper = styled.div`
            grid-area: ${'grid' + index};
            `;

           return (
           <ThumbWrapper key={photoObj.imgThumbUrl}>
                <Thumbnail photo={photoObj.imgThumbUrl} id={index} changePic={props.changePic}/>
            </ThumbWrapper>
           )
        })
      }
    </GridOfPics>
  )

}

export default GridPics;