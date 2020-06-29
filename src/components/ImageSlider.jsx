import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Img from 'gatsby-image';

const slide = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .image {
    animation-delay: 0.1s;
    animation: ${slide} 0.8s ;
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
`;

const ButtonsBox = styled.div`
  display: ${props => (props.multiple === true ? "flex" : "none")};
  position: absolute;
  left: -35px;
  right: -35px;
  top: 0;
  /* width: 100%; */
  height: 100%;

  justify-content: space-between;
  align-items: center;
  .right {
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 8px lightgrey;
  }
  .left {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 8px lightgrey;
  }
`

const Button = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.5);
  /* border: 2px solid rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 0 50px white; */
  color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  @media (min-width: 600px) {
    height: 45px;
    width: 45px;
  }
`;

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);
   
  const length = images.length - 1;

  const handleNext = () => {
    index === length ? setIndex(0) : setIndex(index + 1);
  }

  const handlePrevious = () => {
    index === 0 ? setIndex(length) : setIndex(index - 1);
  }

  return (
    <ImgWrapper>
      <Img
        className="image"
        fluid={images[index].localFile.childImageSharp.fluid}
        key={`image${index}`}
        alt="okay"
      />
      <ButtonsBox
        multiple={images.length > 1}
      >
        <Button 
          className="left" 
          onClick={() => handlePrevious()}
        >
          {`<<`}
        </Button>
        <Button 
          className="right" 
          onClick={() => handleNext()}
        >
          {`>>`}
        </Button>
      </ButtonsBox>
    </ImgWrapper>
  )
}

export default ImageSlider;