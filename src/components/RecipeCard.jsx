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
  justify-content: flex-end;
  box-shadow: 0 0 8px grey;
  padding: 0px 10px 20px 10px;
  margin: 15px 0;
  background: #f5f5f5;
  cursor: pointer;
  height: 100%;
  width: 280px;
  height: 350px;
  @media (min-width: 1000px) {
    width: 400px;
    height: 450px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
  padding: 0 10px;
`;

const H2 = styled.h2`
  font-size: 1.5em;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bolder;
`;

const Image = styled.div`
  height: 290px;
  width: 290px;
  height: 240px;
  width: 240px;
  position: relative;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  .thumbnail-image {
    height: 100%;
  }
  @media (min-width: 1000px) {
    height: 360px;
    width: 360px;  
  }
`;

const Quote = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: #2f302066;
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2em;
  p {
    margin: 0 20px;
  }
`;

// Functional component
function RecipeCard({ recipe }) {
  const images = recipe.fields.images;
  return (
    <Wrapper>
      <Title>
        <H2>{recipe.title}</H2>
      </Title>
      <Image>

          <Img
            className="thumbnail-image"
            // fluid={recipe.mainImage.childImageSharp.fluid}
            fluid={images[0].localFile.childImageSharp.fluid}
            alt={recipe.title}
          />

      </Image>
      <Quote>
        <p>{recipe.quote}</p>
      </Quote>
    </Wrapper>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.object,
}

export default RecipeCard;