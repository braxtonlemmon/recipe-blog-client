import React, { useEffect, useState, useRef } from 'react';
import { graphql } from 'gatsby';
import Comments from './Comments';
import ShareLinks from './ShareLinks';
import ImageSlider from './ImageSlider';
import Ratings from './Ratings';
import Shortcuts from './Shortcuts';
import SEO from '../components/SEOv2';
import Ingredients from './Ingredients';
import Steps from './Steps';
import Details from './Details';
import ToTop from './ToTop';
import GoUp from './GoUp';
import {
  Wrapper,
  MyH1,
  Image,
  // ToTop
} from './RecipePageStyling';
import PropTypes from 'prop-types';
import Printable from './Printable';
import { useReactToPrint } from 'react-to-print';
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
  const content = data.markdownRemark.html;
  const [viewShare, setViewShare] = useState(false);
  const [checkboxes, setCheckboxes] = useState(loadCheckboxes());
  const [ratings, setRatings] = useState([]);
  const [ratingsLoaded, setRatingsLoaded] = useState(false);
  const { siteUrl } = useSiteMetadata();
  const url = `${siteUrl}${location.pathname}`;

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

  function handleNewRating() {
    setRatingsLoaded(false);
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

  useEffect(() => {
    const id = recipe.mongodb_id;
    fetch(
      `https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${id}/ratings`,
      {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )
    .then(response => response.json())
    .then(data => {
      setRatings(data.ratings);
      setRatingsLoaded(true);
    })
    .catch(err => console.error('Request failed', err));
  }, [ratingsLoaded])

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
        { viewShare && 
        <ShareLinks setViewShare={setViewShare} ></ShareLinks>
        }
        <Image>
          <ImageSlider images={images} />
        </Image>
        <Shortcuts 
          handlePrint={handlePrint} 
          setViewShare={setViewShare}
        />
        <Ratings 
          id={recipe.mongodb_id}
          handleNewRating={handleNewRating} 
        />
        <Details 
          recipe={recipe} 
          convertDuration={convertDuration}
          ratings={ratings}
          content={content}
        />
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
        <Comments 
          mongodb_id={recipe.mongodb_id} 
          handleNewRating={handleNewRating}
        />
        <Printable
          ref={componentRef}
          recipe={recipe}
          convertDuration={convertDuration}
        />
        <ToTop />
        <GoUp />
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
  query($id: String!, $title: String!) {
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
    markdownRemark(frontmatter: { title: {eq: $title } } ) {
      html
    }
  }
`;


