import React from 'react';
import styled from 'styled-components';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const RatingBar = styled(Rating)`
  margin-bottom: 12px;
  
  span .star {
    height: 35px;
    width: 35px;
    margin: 0 5px;
    color: ${props => props.theme.colors.star};
  }
`;

function Stars({ handleOptionChange, selected }) {
  return (
    <RatingBar
      emptySymbol={<FaRegStar className="star" />}
      fullSymbol={<FaStar className="star" />}
      fractions={2}
      initialRating={selected}
      onChange={(value) => handleOptionChange(value)}
    />
  )
}

Stars.propTypes = {
  handleOptionChange: PropTypes.func,
  selected: PropTypes.number
}

export default Stars;