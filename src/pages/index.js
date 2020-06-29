import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import RecipeCard from '../components/RecipeCard';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
import PageTransition from 'gatsby-plugin-page-transitions';

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  align-items: center;
  width: 90%;
  /* li {
    margin: 15px;
  } */
`;

const Recipes = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  li {
    margin: 20px;
  }
`;

function IndexPage({ data }) {
  const recipes = data.allMongodbTestRecipes.edges;
  return (
    <>
      <SEO title="Home" description="Catalog of recipes" />
      <PageTransition>
        <Wrapper>
          <H1>Recipes</H1>
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
      </PageTransition>
    </>
  )
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMongodbTestRecipes {
      edges {
        node {
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
          id
           
        }
      }
    }
  }
`

// mainImage {
          //   childImageSharp {
          //     fluid {
          //       ...GatsbyImageSharpFluid
          //     }
          //   }
          // }
          // image