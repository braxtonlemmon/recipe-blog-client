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
  top: 0;
  z-index: 15;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const ArrowBox = styled.div`
  display: flex;
  width: 40%;
  height: 80%;
  align-items: center;
  justify-content: baseline;
  cursor: pointer;
  .image-slider___right {
    margin-left: auto;
  }
  .image-slider___button {
    color: rgba(255, 255, 255, 0.5);
    z-index: 16;
    height: 60px;
    width: 60px;
    @media (min-width: 600px) {
      height: 80px;
      width: 80px;
    }
  }
  &:hover .image-slider___button {
    color: white;
    transform: scale(1.05);
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
    <ImgWrapper id="slider">
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
        <ArrowBox onClick={() => handlePrevious()}>
          <FaAngleLeft className="image-slider___button" />
        </ArrowBox>
        <ArrowBox onClick={() => handleNext()}>
          <FaAngleRight className="image-slider___button image-slider___right" />
        </ArrowBox>
      </ButtonsBox>
    </ImgWrapper>
  )
}

ImageSlider.propTypes = {
  images: PropTypes.array
}

export default ImageSlider;