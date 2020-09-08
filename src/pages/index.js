import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import RecipeCard from '../components/RecipeCard';
// import SEO from '../components/seo';
import SEO from '../components/SEOv2';
import Hero from '../components/Hero';
import PropTypes from 'prop-types';
import makeSlug from '../utils/makeSlug';
import Loader from '../components/Loader';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  position: relative;
`;

const Recipes = styled.div`
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

function IndexPage({ data, setLoader }) {
  const recipes = data.allMongodbTestRecipes.edges;
  const [recipeClicked, setRecipeClicked] = useState(false);

  const handleRecipeClick = () => {
    setRecipeClicked(true);
  }
  
  useEffect(() => {
    setLoader(false)
  }, [])
  
  return (
    <>
      <SEO title="Peel the Garlic" description="Recipes that invite you to slow down and peel the garlic." />
      <Wrapper>
        <Hero setRecipeClicked={setRecipeClicked} />
        <div id="recipes-index"></div>
        <Recipes>
          {recipes.map(({node}) => {
            const slug = makeSlug(node.title);
            if (node.is_published) {
              return (
                <Link key={node.id} to={`/recipe/${slug}`} onClick={handleRecipeClick} aria-label={`Go to recipe ${node.title}`}>
                    <RecipeCard 
                      recipe={node} 
                      key={`card~${node.id}`} 
                    />
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
    allMongodbTestRecipes(sort: {
      fields: [publish_date]
      order: DESC
    }) {
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
                  fluid(maxWidth: 1000) {
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
