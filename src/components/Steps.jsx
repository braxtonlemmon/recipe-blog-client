import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from './Headings';
import {
  StepsBox, 
  Step
} from './RecipePageStyling';

function Steps({ recipe, checkboxes, handleCheck, resetCheckboxes }) {
  return (
    <StepsBox id="steps-box">
      <H2 id="steps">Steps</H2>
      <p className="sidenote">
        (click each step as you go to keep track of your progress)
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
      <div className="reset-box">
        <p>Finished and want to make it again?</p>
        <div>
          <span className="reset-link" onClick={resetCheckboxes}>Reset</span> the page to clear the checkboxes and greyed-out steps (the page will refresh).
        </div>
      </div>
      <div id="steps-end"></div>
    </StepsBox>
  )
}

Steps.propTypes = {
  recipe: PropTypes.object,
  checkboxes: PropTypes.object,
  handleCheck: PropTypes.func,
  resetCheckboxes: PropTypes.func
}

export default Steps;