import React, { useEffect, useState, useRef } from 'react';
import { graphql } from 'gatsby';
import Comments from './Comments';
import ImageSlider from './ImageSlider';
import Ratings from './Ratings';
import { H2 } from './Headings';
import Shortcuts from './Shortcuts';
import SEO from '../components/SEOv2';
import Ingredients from './Ingredients';
import Steps from './Steps';
import { Link as ScrollLink } from 'react-scroll';
import {
  Wrapper,
  AboutBox,
  Details,
  MyH1,
  Image,
  ToTop
} from './RecipePageStyling';
import PropTypes from 'prop-types';
import Printable from './Printable';
import { useReactToPrint } from 'react-to-print';
import { FaRegClock } from 'react-icons/fa';
import { TiArrowUpOutline } from 'react-icons/ti';
import useSiteMetadata from '../hooks/use-site-metadata';

const convertDuration = (duration) => {
  if (duration > 59) {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    return `${hours}h ${mins}min`;
  } else {
    return `${duration}min`;
  }
}

function RecipePage({ data, location }) {
  const recipe = data.mongodbTestRecipes;
  const images = data.mongodbTestRecipes.fields.images;
  const [checkboxes, setCheckboxes] = useState(loadCheckboxes());
  const { siteUrl } = useSiteMetadata();
  const url = `${siteUrl}${location.pathname}`;
  console.log(typeof location);
  // PRINTING
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  // helper functions
  function loadCheckboxes() {
    if (typeof window !== 'undefined' && typeof window.localStorage != 'undefined') {
      const storedData = JSON.parse(localStorage.getItem(recipe.id));
      return storedData === null ? {} : storedData;
    } else {
      return {};
    }
  }

  function handleCheck(e) {
    if (typeof window !== 'undefined' && typeof window.localStorage != 'undefined') {  
      const storedData = JSON.parse(localStorage.getItem(recipe.id));
      storedData[e.target.id] = e.target.checked;
      localStorage.setItem(recipe.id, JSON.stringify(storedData));
      setCheckboxes(storedData);
    }
  }

  // loads saved data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.localStorage != 'undefined') {
      const storedData = JSON.parse(localStorage.getItem(recipe.id));
      if (storedData === null) {
        localStorage.setItem(recipe.id, JSON.stringify({}));
      } else {
        setCheckboxes({...storedData})
      }
    }
  }, [recipe.id])

  return (
    <>
      <SEO
        recipe={recipe}
        isRecipe={true}
        title={recipe.title}
        description={recipe.description}
        url={url}
      />
      <Wrapper id="page-top">
        <MyH1>{recipe.title}</MyH1>
        <Image>
          <ImageSlider images={images} />
        </Image>
        <Shortcuts handlePrint={handlePrint} />
        <Ratings id={recipe.mongodb_id} />
        <AboutBox>
          <H2>About</H2>
          <p>{recipe.publish_date}</p>
          <Details>
            <p><FaRegClock/> {convertDuration(recipe.duration)}</p>
            <p>Serves: {recipe.size}</p>
          </Details>
          <p>{recipe.intro}</p>
          <div id="about-end"></div>
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
        <Printable
          ref={componentRef}
          recipe={recipe}
          convertDuration={convertDuration}
        />
        <ToTop>
          <ScrollLink className="scrollLink button-w-icon" to={"page-top"} smooth={true}>
            <span>
              <TiArrowUpOutline /> Top of page. <TiArrowUpOutline />
            </span>
            <p>(save your scroll finger)</p>
          </ScrollLink>
        </ToTop>
      </Wrapper>
    </>
  )
}
RecipePage.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object
}

export default RecipePage;

export const pageQuery = graphql`
  query($id: String!) {
    mongodbTestRecipes(id: { eq: $id }) {
      id
      mongodb_id
      title
      description
      keywords
      prep_time
      cook_time
      ingredients
      category
      cook_method
      cuisine
      intro
      size
      steps
      images
      ratings
      publish_date(
        formatString: "MMMM DD, YYYY"
      )
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


