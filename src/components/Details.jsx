import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InfoBox } from './RecipePageStyling';
import { H2 } from './Headings';
import { FaRegClock } from 'react-icons/fa';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';

const AboutBox = styled(InfoBox)`
  grid-area: about;
  width: 90%;
  padding: 15px 0;
  margin: 15px 0;
  border-bottom: 5px solid ${props => props.theme.colors.dark};
  border-top: 5px solid ${props => props.theme.colors.dark};
  p {
    font-size: 1.2em;
    line-height: 1.5em;
  }
`;

const DateAndRatings = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  justify-content: space-evenly;
`;

const Specs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: lightslategrey;
  margin-bottom: 10px;
  margin: 10px 0;
  p {
    margin: 0 8px;
  }
`;

const TLDR = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0 20px 0;
  padding: 10px 0;
  width: 100%;
  max-width: 600px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-align: center;
  h1 {
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

const Intro = styled.div`
  margin: 10px 0;
  p {
    margin-bottom: 25px;
  }
  em {
    font-style: italic;
  }
`;

const getAverage = (ratings) => {
  if (ratings.length > 0) {
    return ratings.reduce((start, current) => { return start + current }) / ratings.length;
  } else {
    return 0;
  }
}

function Details({ recipe, convertDuration, ratings, content }) {
  return (
    <AboutBox id="about-box">
      <H2>About</H2>
      <DateAndRatings>
        <Rating
          readonly
          initialRating={getAverage(ratings)}
          emptySymbol={<FaRegStar/>}
          fullSymbol={<FaStar/>}
          />
        <p>{recipe.publish_date}</p>
      </DateAndRatings>
      <Specs>
        <p><FaRegClock /> Prep: {convertDuration(recipe.prep_time)}</p>
        <p><FaRegClock /> Cook: {convertDuration(recipe.cook_time)}</p>
        <p>Serves: {recipe.size}</p>
      </Specs>
      <TLDR>
        <h1>TL;DR</h1>
        <p>{recipe.description}</p>
      </TLDR>
      {/* <Intro dangerouslySetInnerHTML={{ __html: content }}> */}
      <Intro>
        <p>{recipe.intro}</p>
      </Intro>
      <div id="about-end"></div>
    </AboutBox>
  )
}

Details.propTypes = {
  recipe: PropTypes.object,
  convertDuration: PropTypes.func,
  ratings: PropTypes.array
}

export default Details;