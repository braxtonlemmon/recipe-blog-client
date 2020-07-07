import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import RecipeCard from '../components/RecipeCard';
import SEO from '../components/seo';
import Hero from '../components/Hero';
import PropTypes from 'prop-types';

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
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

function IndexPage({ data }) {
  const recipes = data.allMongodbTestRecipes.edges;

  return (
    <>
      <SEO title="Home" description="Catalog of recipes" />
      <Wrapper>
        <Hero />
        <Recipes>
          {recipes.map(({node}) => {
            const slug = node.title.toLowerCase().replace(/ /g, '-');
            if (node.is_published) {
              return (
                <Link key={node.id} to={`/recipe/${slug}`}>
                  <li key={`list~${node.id}`}>
                    <RecipeCard recipe={node} key={`card~${node.id}`} />
                  </li>
                </Link>)
              }
            })}
          </Recipes>
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
