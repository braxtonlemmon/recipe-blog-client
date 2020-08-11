import React, { useState, useEffect } from 'react';
import { H2 } from './Headings';
import PropTypes from 'prop-types';
import {
  IngredientsBox,
  Ingredient
} from './RecipePageStyling';

function Ingredients({ 
  recipe, 
  checkboxes, 
  handleCheck 
}) {
  const [ingredientsFixed, setIngredientsFixed] = useState(false)
  const [navHeight, setNavHeight] = useState()
  // detects height of navbar to use when making ingredients box sticky
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const height = navbar.getBoundingClientRect().height;
    setNavHeight(height);
  }, []);
  
  // observer that watches position of ingredients box
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const box = document.getElementById('ingredients-box');
      const options = {
        threshold: 1
      }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.isIntersecting ? setIngredientsFixed(true) : setIngredientsFixed(false);
        })
      }, options)

      observer.observe(box);
      return () => observer.unobserve(box);
    }
  }, [])

  return (
    <IngredientsBox
      fixed={ingredientsFixed}
      id="ingredients-box"
      navHeight={navHeight}
    >
      <H2 className="ingredients-box-title">Ingredients</H2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <Ingredient
            key={ingredient}
            done={checkboxes[`ingredient-checkbox-${index}`]}
            checkboxes={checkboxes}
          >
            <input
              className="checkbox"
              type="checkbox"
              id={`ingredient-checkbox-${index}`}
              defaultChecked={
                checkboxes[`ingredient-checkbox-${index}`] === true
              }
              onChange={handleCheck}
            ></input>
            <label
              className="ingredient-label"
              htmlFor={`ingredient-checkbox-${index}`}
            >
              {ingredient}
            </label>
          </Ingredient>
        ))}
      </ul>
    </IngredientsBox>
  )
}

Ingredients.propTypes = {
  recipe: PropTypes.object,
  ingredientsFixed: PropTypes.bool,
  navHeight: PropTypes.number,
  checkboxes: PropTypes.object,
  handleCheck: PropTypes.func
}

export default Ingredients;

