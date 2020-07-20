import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from "react-icons/fa"
import Button from './Button';

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`

const Wrapper = styled.div`
  padding: 10px 5px;
  width: 90%;
  display: flex;

  justify-content: center;
  align-items: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  grid-area: ratings;

  .star {
    height: 30px;
    width: 30px;
    margin: 0 5px;
    color: #2f3020;
  }

  .made-it {
    transform: rotate(20deg);
    margin-right: 15px;
    font-size: 1.2em;
    animation: ${bounce} 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    text-align: center;
  }
  .rate-it {
    transform: rotate(-20deg);
    margin-left: 15px;
    font-size: 1.2em;
    animation: ${bounce} 1.3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    text-align: center;
  }
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function Ratings({ id }) {
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
          setRated(true);
          return response.json()
        }
        throw new Error("Network response was not okay")
      })
      .catch(err => console.log(err.message))
  }

  return (
    <Wrapper>
      { !rated && <p className="made-it">Made it?</p>}
      {
        rated
        ? <p>Thanks for rating!</p>
        : 
        <Form>
          <Rating
            className="rating"
            emptySymbol={<FaRegStar className="star"/>}
            fullSymbol={<FaStar className="star"/>}
            fractions={2}
            initialRating={selected}
            onChange={(value) => handleOptionChange(value)}
          />
          <Button onClick={handleRate}>Rate</Button>
        </Form>
      }
      { !rated && <p className="rate-it">Rate it!</p>}
    </Wrapper>
  )
}

export default Ratings;

