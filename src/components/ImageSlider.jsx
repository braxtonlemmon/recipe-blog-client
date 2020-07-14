import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

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

const FakeImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: inset 0 0 50px black;
  z-index: 1;
`;

const ButtonsBox = styled.div`
  display: ${props => (props.multiple === true ? "flex" : "none")};
  position: absolute;
  left: -8px;
  right: -8px;
  top: 0;
  z-index: 15;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .button {
    color: rgba(255, 255, 255, 0.5);
    z-index: 16;
    height: 60px;
    width: 60px;
    cursor: pointer;
    &:hover {
      color: rgba(255, 255, 255);
      transform: scale(1.05);
    }
    @media (min-width: 600px) {
      height: 80px;
      width: 80px;
    }
  }
`

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
      <FakeImg></FakeImg>
      <Img
        className="image"
        fluid={images[index].localFile.childImageSharp.fluid}
        key={`image${index}`}
        alt="okay"
      />
      <ButtonsBox
        multiple={images.length > 1}
      >
        <FaAngleLeft 
          className="button"
          onClick={() => handlePrevious()}
        />
        <FaAngleRight 
          className="button"
          onClick={() => handleNext()}
        />
      </ButtonsBox>
    </ImgWrapper>
  )
}

ImageSlider.propTypes = {
  images: PropTypes.array
}

export default ImageSlider;