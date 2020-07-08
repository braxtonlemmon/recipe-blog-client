import React from 'react';
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
  background: #f5f5f5;
  cursor: pointer;
  width: 280px;
  height: 350px;
  @media (min-width: 412px) {
    width: 320px;
    height: 420px;
  }
  @media (min-width: 1000px) {
    width: 400px;
    height: 500px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
  padding: 0 10px;
`;

const H2 = styled.h2`
  font-size: 1.3em;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bolder;
  /* padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white; */
`;

const Image = styled.div`
  height: 240px;
  width: 240px;
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
    background: rgba(0, 0, 0, 0.4);
  }
  @media (min-width: 412px) {
    width: 280px;
    height: 280px;
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
  @media (min-width: 412px) {
    font-size: 2.5em;
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