import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Comments from './Comments';
import ImageSlider from './ImageSlider';
import PageTransition from 'gatsby-plugin-page-transitions';
import { H2 } from './Headings';
import SEO from '../components/seo';
import Scrollbar from 'react-scrollbars-custom';

import {
  Wrapper,
  AboutBox,
  IngredientsBox,
  StepsBox,
  MyH1,
  Image,
  Ingredient,
  Step
} from './RecipePageStyling';
import PropTypes from 'prop-types';

function RecipePage({ data }) {
  const recipe = data.mongodbTestRecipes;
  const images = data.mongodbTestRecipes.fields.images;
  const [ingredientsFixed, setIngredientsFixed] = useState(false);
  const [checkboxes, setCheckboxes] = useState(loadCheckboxes());
  const [navHeight, setNavHeight] = useState();

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

  // useEffect

  // detects height of navbar to use when making ingredients box sticky
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const height = navbar.getBoundingClientRect().height;
    setNavHeight(height);
  }, []);

  // loads saved data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(recipe.id));
    if (storedData === null) {
      localStorage.setItem(recipe.id, JSON.stringify({}));
    } else {
      setCheckboxes({...storedData})
    }
  }, [recipe.id])

  // observer that watches position of ingredients box
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const box = document.getElementById('ingredients-box');
      const options = {
        threshold: 1
      }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          console.log(entry);
          entry.isIntersecting ? setIngredientsFixed(true) : setIngredientsFixed(false);
        })
      }, options)

      observer.observe(box);
      return () => observer.unobserve(box);
    }
  }, [])


  return (
    <>
      <SEO title={recipe.title} description={recipe.intro} />
      <PageTransition>

      <Wrapper>
        <MyH1>{recipe.title}</MyH1>
        <Image>
          <ImageSlider images={images} />
        </Image>
        <AboutBox>
          <H2>About</H2>
          <p>{recipe.intro}</p>
          <p>{`time: ${recipe.duration}`}</p>
        </AboutBox>

        <IngredientsBox 
          fixed={ingredientsFixed} 
          id="ingredients-box"
          navHeight={navHeight}
          >
          <H2 className="ingredients-box-title">Ingredients</H2>
   
{/* 
          <Scrollbar 
            // style={{height: "100%", width: "95%"}}
            translateContentSizeToHolder
            > */}
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
                    defaultChecked={checkboxes[`ingredient-checkbox-${index}`] === true}
                    onChange={handleCheck}
                    ></input>
                  <label className="ingredient-label" htmlFor={`ingredient-checkbox-${index}`}>
                    {ingredient}
                  </label>
                </Ingredient>
              ))}
            </ul>
          {/* </Scrollbar> */}
    
        </IngredientsBox>
        <StepsBox id="steps-box">
          <H2 id="steps">Steps</H2>
          <p className='sidenote'>***click each step as you go to keep track of your progress***</p>
          <ul>
            {recipe.steps.map((step, index) => (
              <Step
              key={step}
              done={checkboxes[`step-checkbox-${index}`]}
              >
                <div className="step-box-holder">
                  <input
                    type="checkbox"
                    id={`step-checkbox-${index}`}
                    defaultChecked={checkboxes[`step-checkbox-${index}`] === true ? true : false}
                    onChange={handleCheck}
                    ></input>
                  <label className="step-number" htmlFor={`step-checkbox-${index}`}>{index + 1}</label>
                </div>
                <label className="step-text" htmlFor={`step-checkbox-${index}`}>{step}</label>
              </Step>
            ))}
          </ul>
        </StepsBox>
        <Comments
          mongodb_id={recipe.mongodb_id}
          />
      </Wrapper>
      </PageTransition>
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
