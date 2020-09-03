import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from "react-icons/fa"
import Button from './Button';
import Stars from './Stars';
import PropTypes from 'prop-types';

const grow = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

const Wrapper = styled.div`
  padding: 10px 5px;
  margin: 10px 0;
  /* height: 100px; */
  width: 90%;
  max-width: 320px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  grid-area: ratings;
  transition: height 500ms ease 2s, transform 500ms ease 2s;
  height: ${props => props.rated ? '0px' : '100px'};
  transform: ${props => props.rated ? 'scaleY(0)' : 'scaleY(100%)'};
  .star {
    height: 30px;
    width: 30px;
    margin: 0 5px;
    color: ${props => props.theme.colors.star};
  }
  .ratings-text {
    font-size: 1.2em;
    text-align: center;
  }

  .made-it {
    margin-right: 15px;
    /* animation: ${grow} 1.5s ease-in-out infinite; */
  }
  .rate-it {
    margin-left: 15px;
    animation: ${grow} 1.3s ease-in-out infinite;
  }
`

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

function Ratings({ id, handleNewRating }) {
  const [selected, setSelected] = useState(5);
  const [rated, setRated] = useState(false);

  const handleOptionChange = (value) => {
    setSelected(value);
  }

  const handleRate = () => {
    fetch(
      `https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${id}/ratings`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: selected
        }),
      })
      .then(response => {
        if (response.ok && response.status === 200) {
          handleNewRating();
          setRated(true);
          return response.json()
        }
        throw new Error("Network response was not okay")
      })
      .catch(err => console.log(err.message))
  }

  return (
    <Wrapper rated={rated}>
      { !rated &&
        <Stars 
          selected={selected}
          handleOptionChange={handleOptionChange}
        />
      }
      <Bottom>
        { !rated && <p className="made-it ratings-text">Made it?</p>}
        {
          rated
          ? <p className="ratings-text">Thanks for rating!</p>
          : 
          <Button onClick={handleRate}>Rate</Button>
        }
        { !rated && <p className="rate-it ratings-text">Rate it!</p>}
      </Bottom>
    </Wrapper>
  )
}

Ratings.propTypes = {
  id: PropTypes.string,
  handleNewRating: PropTypes.func
}

export default Ratings;

