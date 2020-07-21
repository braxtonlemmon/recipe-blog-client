import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: relative;
  box-shadow: 0 0 8px grey;
  cursor: pointer;
  width: 280px;
  height: 280px;
  @media (min-width: 412px) {
    width: 320px;
    height: 320px;
  }
  @media (min-width: 1000px) {
    width: 400px;
    height: 400px;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;

`;

const H2 = styled.h2`
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
  font-size: 1.3em;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bolder;
  color: white;
  width: min-content;
`;

const Image = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  .thumbnail-image {
    height: 100%;
  }
  p {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: white;
    padding: 5px;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Quote = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.colors.dark}66;
  color: white;
  opacity: 0;
  z-index: 5;
  transition: opacity 200ms ease-in;
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
  @media (min-width: 412px) {
    font-size: 2.5em;
  }
`;

// Functional component
function RecipeCard({ recipe }) {
  const images = recipe.fields.images;
 

  return (
    <Wrapper>
      <Image>
        <Title>
          <H2>{recipe.title}</H2>
        </Title>
        <Img
          className="thumbnail-image"
          fluid={images[0].localFile.childImageSharp.fluid}
          alt={recipe.title}
        />
        <p>{recipe.publish_date}</p>
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