import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import RecipeCard from '../components/RecipeCard';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-items: center;
  width: 100%;
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
  @media (min-width: 1000px) {
    max-width: 90%;
  }
`;

const Hero = styled.div`
  /* border: 3px solid black; */
  position: relative;
  height: 700px;
  height: 400px;
  width: 100%;
  background: url('https://remember-to-cook.s3.us-east-2.amazonaws.com/veg_burger1.jpg');
  background-size: cover;
  background-position: center;
  z-index: 10;
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 11;
`;

const HeroText = styled(H1)`
  color: white;
  font-size: 1.5em;
  font-weight: bolder;
  text-align: left;
`

const HeroTextBox = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 40%;
  position: flex;
  z-index: 13;
  flex-direction: column;
  align-content: baseline;
  p {
    color: white;
    font-size: 2.5em;
    font-style: italic;
  }
`

function IndexPage({ data }) {
  const recipes = data.allMongodbTestRecipes.edges;
  return (
    <>
      <SEO title="Home" description="Catalog of recipes" />
      <Wrapper>
        <Hero>
          <Layer></Layer>
          <HeroTextBox>
            <p>Turmeric in a burger? Yes, please.</p>
            <HeroText>Sweet Potato Burgers</HeroText>
          </HeroTextBox>
        </Hero>
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