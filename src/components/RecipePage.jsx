import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Comments from './Comments';
import ImageSlider from './ImageSlider';
import { H2 } from './Headings';
import SEO from '../components/seo';
import Ingredients from './Ingredients';
import Steps from './Steps';
import {
  Wrapper,
  AboutBox,
  Details,
  MyH1,
  Image,
} from './RecipePageStyling';
import PropTypes from 'prop-types';

const convertDuration = (duration) => {
  if (duration > 59) {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    return `${hours}h ${mins}min`;
  } else {
    return `${duration}min`;
  }
}

function RecipePage({ data }) {
  const recipe = data.mongodbTestRecipes;
  const images = data.mongodbTestRecipes.fields.images;
  const [checkboxes, setCheckboxes] = useState(loadCheckboxes());

  // helper functions
  function loadCheckboxes() {
    if (typeof window !== 'undefined') {
      const storedData = JSON.parse(localStorage.getItem(recipe.id));
      return storedData === null ? {} : storedData;
    } else {
      return {};
    }
  }

  function handleCheck(e) {
    const storedData = JSON.parse(localStorage.getItem(recipe.id));
    storedData[e.target.id] = e.target.checked;
    localStorage.setItem(recipe.id, JSON.stringify(storedData));
    setCheckboxes(storedData);
  }

  // loads saved data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(recipe.id));
    if (storedData === null) {
      localStorage.setItem(recipe.id, JSON.stringify({}));
    } else {
      setCheckboxes({...storedData})
    }
  }, [recipe.id])

  return (
    <>
      <SEO title={recipe.title} description={recipe.intro} />
      <Wrapper>
        <MyH1>{recipe.title}</MyH1>
        <Image>
          <ImageSlider images={images} />
        </Image>
        <AboutBox>
          <H2>About</H2>
          <Details>
            <p>⏰ {convertDuration(recipe.duration)}</p>
            <p>Serves: {recipe.size}</p>
          </Details>
          <p>{recipe.intro}</p>
        </AboutBox>
        <Ingredients 
          recipe={recipe}
          checkboxes={checkboxes}
          handleCheck={handleCheck}
        />
        <Steps
          recipe={recipe}
          checkboxes={checkboxes}
          handleCheck={handleCheck}
        />
        <Comments mongodb_id={recipe.mongodb_id} />
      </Wrapper>
    </>
  )
}
RecipePage.propTypes = {
  data: PropTypes.object
}

export default RecipePage;

export const pageQuery = graphql`
  query($id: String!) {
    mongodbTestRecipes(id: { eq: $id }) {
      id
      mongodb_id
      title
      ingredients
      intro
      duration
      size
      steps
      fields {
        images {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;




        {
          /* <IngredientsBox
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
        </IngredientsBox> */
        }
        {
          /* <StepsBox id="steps-box">
          <H2 id="steps">Steps</H2>
          <p className="sidenote">
            ***click each step as you go to keep track of your progress***
          </p>
          <ul>
            {recipe.steps.map((step, index) => (
              <Step key={step} done={checkboxes[`step-checkbox-${index}`]}>
                <div className="step-box-holder">
                  <input
                    type="checkbox"
                    id={`step-checkbox-${index}`}
                    defaultChecked={
                      checkboxes[`step-checkbox-${index}`] === true
                        ? true
                        : false
                    }
                    onChange={handleCheck}
                  ></input>
                  <label
                    className="step-number"
                    htmlFor={`step-checkbox-${index}`}
                  >
                    {index + 1}
                  </label>
                </div>
                <label
                  className="step-text"
                  htmlFor={`step-checkbox-${index}`}
                >
                  {step}
                </label>
              </Step>
            ))}
          </ul>
        </StepsBox> */
        }