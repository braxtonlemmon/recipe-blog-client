import React from 'react';
import styled from 'styled-components';
import { H1 } from "./Headings"
import Img from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';

const Wrapper = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  z-index: 10;
  @media (min-width: 760px) {
    height: 700px;
  }
`;

const HeroImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > img {
    object-fit: cover;
  }
`
const DimLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 11;
`

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

function Hero() {
  const data = useStaticQuery(graphql`
    query {
      mongodbTestRecipes(title: { eq: "Sweet Potato Black Bean Burger" }) {
        title
        quote
        publish_date   
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
  `)
  const featured = data.mongodbTestRecipes;
  
  return (
    <Wrapper>
      <DimLayer></DimLayer>
      <HeroImage
        fluid={featured.fields.images[0].localFile.childImageSharp.fluid}
        alt={featured.title}
      />
      <HeroTextBox>
        <p>{featured.quote}</p>
        <HeroText>{featured.title}</HeroText>
      </HeroTextBox>
    </Wrapper>
  )
}

export default Hero;