import React from 'react';
import styled from 'styled-components';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const RatingBar = styled(Rating)`
  margin-bottom: 10px;
  .star {
    height: 30px;
    width: 30px;
    margin: 0 5px;
    color: #2f3020;
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