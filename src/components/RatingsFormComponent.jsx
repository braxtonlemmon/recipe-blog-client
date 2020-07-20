import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from "react-icons/fa"

const Wrapper = styled.div`
  padding: 10px 5px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  grid-area: ratings;
  .rating {
    .star {
      height: 30px;
      width: 30px;
      margin: 0 5px;
    }
  }
`;

function RatingsFormComponent({ handleOptionChange, selected }) {
  
  return (
    <Wrapper>
      <Rating
        className="rating"
        emptySymbol={<FaRegStar className="star"/>}
        fullSymbol={<FaStar className="star"/>}
        fractions={2}
        initialRating={selected}
        onChange={(value) => handleOptionChange(value)}
      />

    </Wrapper>
  )
  
  // return (
  //   <>
  //   <Wrapper>
  //     <p>{selected}</p>
  //     <div className="rating">
  //       <input 
  //         type="radio"
  //         id="rate-button-0"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '5'}
  //         value="5"
  //       />
  //       <input 
  //         type="radio"
  //         id="rate-button-1"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '4.5'}
  //         value="4.5"
  //       />
  //       <Star className="star">
  //         <Label className="label" htmlFor="rate-button-0"></Label>
  //         <Label className="label" htmlFor="rate-button-1"></Label>
  //       </Star>
  //       <input 
  //         type="radio"
  //         id="rate-button-2"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '4'}
  //         value="4"
  //       />

  //       <input 
  //         type="radio"
  //         id="rate-button-3"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '3.5'}
  //         value="3.5"
  //       />
  //       <Star className="star">
  //         <Label className="label" htmlFor="rate-button-2"></Label>
  //         <Label className="label" htmlFor="rate-button-3"></Label>
  //       </Star>
  //       <input 
  //         type="radio"
  //         id="rate-button-4"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '3'}
  //         value="3"
  //       />
        
  //       <input 
  //         type="radio"
  //         id="rate-button-5"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '2.5'}
  //         value="2.5"
  //       />
  //       <Star className="star">
  //         <Label className="label" htmlFor="rate-button-4"></Label>
  //         <Label className="label" htmlFor="rate-button-5"></Label>
  //       </Star>
  //       <input 
  //         type="radio"
  //         id="rate-button-6"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '2'}
  //         value="2"
  //       />

  //       <input 
  //         type="radio"
  //         id="rate-button-7"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '1.5'}
  //         value="1.5"
  //       />
  //       <Star className="star">
  //         <Label className="label" htmlFor="rate-button-6"></Label>
  //         <Label className="label" htmlFor="rate-button-7"></Label>
  //       </Star>
  //       <input 
  //         type="radio"
  //         id="rate-button-8"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '1'}
  //         value="1"
  //       />

  //       <input 
  //         type="radio"
  //         id="rate-button-9"
  //         name="rating"
  //         onChange={handleOptionChange}
  //         checked={selected === '0.5'}
  //         value="0.5"
  //       />
  //       <Star className="star">
  //         <Label className="label" htmlFor="rate-button-8"></Label>
  //         <Label className="label" htmlFor="rate-button-9"></Label>
  //       </Star>
  //     </div>
  //   </Wrapper>
  //   </>
  // )
}


RatingsFormComponent.propTypes = {
  handleOptionChange: PropTypes.func,
  selected: PropTypes.string
}

export default RatingsFormComponent;