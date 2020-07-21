import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InfoBox } from './RecipePageStyling';
import { H2 } from './Headings';
import { FaRegClock } from 'react-icons/fa';
 
const AboutBox = styled(InfoBox)`
  grid-area: about;
  width: 90%;
  padding: 15px 0;
  margin-bottom: 15px;
  border-bottom: 5px solid #2f3020;
`;

const Specs = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: lightslategrey;
  margin-bottom: 10px;
  margin: 10px 0;
`;

function Details({ recipe, convertDuration }) {
  return (
    <AboutBox>
      <H2>About</H2>
      <p>{recipe.publish_date}</p>
      <Specs>
        <p><FaRegClock /> {convertDuration(recipe.duration)}</p>
        <p>Serves: {recipe.size}</p>
      </Specs>
      <p>{recipe.intro}</p>
      <div id="about-end"></div>
    </AboutBox>
  )
}

Details.propTypes = {
  recipe: PropTypes.object,
  convertDuration: PropTypes.func
}

export default Details;