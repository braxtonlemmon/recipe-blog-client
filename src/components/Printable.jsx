import React, { Component } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  padding: 10px;
  margin: 20px;
  display: none;
  gap: 10px;
  justify-content: center;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    "title title"
    "about about"
    "ingredients steps"
    "outro outro";
  @media print {
    @page {
      margin: 10mm;
    }
    display: grid;
  }
`;

const Title = styled.h1`
  grid-area: title;
  width: 100%;
  text-align: center;
  font-size: 2em;
`;

const About = styled.ul`
  grid-area: about;
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    margin: 5px 0;
  }
`;


const Ingredients = styled.div`
  grid-area: ingredients;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    margin: 0 10px;
    padding: 5px 0;
    border-bottom: 1px solid black;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Steps = styled.div`
  grid-area: steps;
  display: flex;
  width: 100%;
  padding: 10px 0;
  flex-direction: column;
  align-items: center;
  ol {
    display: flex;
    flex-direction: column; 
    list-style: decimal;
    margin-left: 20px;
  }
  li {
    margin: 0 10px;
    padding: 5px 0;
    border-bottom: 1px solid black;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Outro = styled.ul`
  grid-area: outro;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  li {
    margin: 5px 0;
  }
`;


class Printable extends Component {
  render() {
    const { recipe, convertDuration } = this.props;
    const {
      ingredients,
      steps,
      duration,
      size,
      title
    } = recipe;
    return (
      <Wrapper>
        <Title>{title}</Title>
        <About>
          <li>Estimated time required: {convertDuration(duration)}</li>
          <li>Serving size: {size}</li>
        </About>
        <Ingredients>
          <h2>INGREDIENTS</h2>
          <ul>
            {ingredients.map((ingredient, i) => (
              <li key={`ingredient-${i + 1}`}>{ingredient}</li>
            ))}
          </ul>
        </Ingredients>
        <Steps>
          <h2>STEPS</h2>
          <ol>
            {steps.map((step, i) => (
              <li key={`step-${i + 1}`}><p>{step}</p></li>
            ))}
          </ol>
        </Steps>
        <Outro>
          <li>This recipe brought to you by Peel the Garlic!</li>
          <li>Find more recipes at www.peelthegarlic.com</li>
          <li>© 2020 - Peel the Garlic. All rights reserved.</li>
        </Outro>
      </Wrapper>
    )
  }
}

Printable.propTypes = {
  recipe: PropTypes.object,
  convertDuration: PropTypes.func
}

export default Printable;