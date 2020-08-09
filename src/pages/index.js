import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, graphql } from 'gatsby';
import RecipeCard from '../components/RecipeCard';
// import SEO from '../components/seo';
import SEO from '../components/SEOv2';
import Hero from '../components/Hero';
import PropTypes from 'prop-types';
import makeSlug from '../utils/makeSlug';
import Loader from '../components/Loader';


const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  position: relative;
`;

const Recipes = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 2em;
  a {
    margin: 20px;
  }
  @media (min-width: 1000px) {
    max-width: 90%;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const Loading = styled.div`
  position: fixed;
  top: calc(50% - 100px);
  z-index: 100;
  height: 200px;
  width: 200px;
  border: 20px double black;
  border-top: 20px solid yellow;
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;

function IndexPage({ data }) {
  const recipes = data.allMongodbTestRecipes.edges;
  const [recipeClicked, setRecipeClicked] = useState(false);

  const handleRecipeClick = () => {
    setRecipeClicked(true);
  }
  
  return (
    <>
      <SEO title="Home" description="Catalog of recipes" />
      <Wrapper>
        <Hero setRecipeClicked={setRecipeClicked} />
        <Recipes>
          {recipes.map(({node}) => {
            const slug = makeSlug(node.title);
            if (node.is_published) {
              return (
                <Link key={node.id} to={`/recipe/${slug}`} onClick={handleRecipeClick}>
                  <li key={`list~${node.id}`}>
                    <RecipeCard 
                      recipe={node} 
                      key={`card~${node.id}`} 
                    />
                  </li>
                </Link>)
              }
            })}
          </Recipes>
          {recipeClicked && <Loader message="Loading" />}
      </Wrapper>
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMongodbTestRecipes {
      edges {
        node {
          id
          title
          quote
          is_published
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
    }
  }
  `
