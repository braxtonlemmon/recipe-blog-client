import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

// Styled components
const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: -4px 4px 3px grey;
  padding: 15px 10px;
  margin: 15px 0;
  background: #f5f5f5;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
  height: 100%;
`;

const H2 = styled.h2`
  font-size: 1.5em;
  text-decoration: none;
`;

const Image = styled.div`
  height: 200px;
  width: 200px;
  position: relative;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  .thumbnail-image {
    height: 100%;
  }
`;

const Quote = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: white;
  color: black;
  z-index: 5;
  opacity: ${props => (props.isMouseOver ? "0.7" : "0.0")};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Functional component
function RecipeCard({ recipe }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const images = recipe.fields.images;
  const handleMouseOver = () => {
    setIsMouseOver(true);
  }

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  }

  return (
    <Wrapper onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onFocus={handleMouseOver}>
      <H2>{recipe.title}</H2>
      <Image>

          <Img
            className="thumbnail-image"
            // fluid={recipe.mainImage.childImageSharp.fluid}
            fluid={images[0].localFile.childImageSharp.fluid}
            alt={recipe.title}
          />

      </Image>
      <Quote isMouseOver={isMouseOver}>
        <p>{recipe.quote}</p>
      </Quote>
    </Wrapper>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.object,
}

export default RecipeCard;