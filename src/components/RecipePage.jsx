import React, { useEffect, useState, useRef } from 'react';
import { graphql } from 'gatsby';
import Comments from './Comments';
import ImageSlider from './ImageSlider';
import { H2 } from './Headings';
import SEO from '../components/seo';
import Ingredients from './Ingredients';
import Steps from './Steps';
import { Link as ScrollLink } from 'react-scroll';
import {
  Wrapper,
  Links,
  AboutBox,
  Details,
  MyH1,
  Image,
  ToTop
} from './RecipePageStyling';
import PropTypes from 'prop-types';
import Printable from './Printable';
import { useReactToPrint } from 'react-to-print';
import { FaPrint, FaRegClock } from 'react-icons/fa';
import { TiArrowUpOutline, TiArrowDownOutline } from 'react-icons/ti';

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
      <SEO title={recipe.title} description={recipe.intro} />
      <Wrapper id="page-top">
        <MyH1>{recipe.title}</MyH1>
        <Image>
          <ImageSlider images={images} />
        </Image>
        <Links>
          <p>Psst! Some shortcuts just for you...</p>
          <div className="links-buttons">
            <ScrollLink className="scrollLink button-w-icon" to={"about-end"} smooth={true}>
              Recipe
              <TiArrowDownOutline />
            </ScrollLink>
            <ScrollLink className="scrollLink button-w-icon" to={"steps-end"} smooth={true}>
              Comments
              <TiArrowDownOutline />
            </ScrollLink>
            <div className="scrollLink button-w-icon" onClick={handlePrint}>
              <p>Print</p>
              <FaPrint />
            </div>
          </div>
        </Links>
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


