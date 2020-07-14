import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from './Headings';
import {
  StepsBox, 
  Step
} from './RecipePageStyling';

function Steps({ recipe, checkboxes, handleCheck }) {
  return (
    <StepsBox id="steps-box">
      <H2 id="steps">Steps</H2>
      <p className="sidenote">
        ***click each step as you go to keep track of your progress***
      </p>
      <ul>
        {recipe.steps.map((step, index) => (
          <Step key={step} done={checkboxes[`step-checkbox-${index}`] === true ? 'yes' : 'no'}>
            <div className="step-box-holder">
              <input
                type="checkbox"
                id={`step-checkbox-${index}`}
                defaultChecked={
                  checkboxes[`step-checkbox-${index}`] === true ? true : false
                }
                onChange={handleCheck}
              ></input>
              <label className="step-label" htmlFor={`step-checkbox-${index}`}>
                <p className="step-number">{index + 1}</p>
                <p className="step-text">{step}</p>
              </label>
            </div>
          </Step>
        ))}
      </ul>
      <div id="steps-end"></div>
    </StepsBox>
  )
}

Steps.propTypes = {
  recipe: PropTypes.object,
  checkboxes: PropTypes.object,
  handleCheck: PropTypes.func
}

export default Steps;