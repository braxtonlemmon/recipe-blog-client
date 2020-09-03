/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { H1, H2 } from "./Headings"
import Img from 'gatsby-image';
import { Link, graphql, useStaticQuery } from 'gatsby';
import makeSlug from '../utils/makeSlug';
import PropTypes from 'prop-types';

const Wrapper = styled(Link)`
  overflow-x: hidden;
  position: relative;
  height: 400px;
  width: 100%;
  z-index: 10;
  background: ${props => props.theme.colors.hero};
  @media (min-width: 760px) {
    height: 700px;
  }
  @media (min-width: 900px) {
    height: 600px;
  }
  @media(min-width: 1200px) {
    height: 700px;
  }

`;

const BigScreenBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 25%;
  height: 100%;
  z-index: 13;
  opacity: 0;
  background: linear-gradient(to right, ${props => props.theme.colors.hero}, rgba(0,0,0,0));
  background: ${props => props.theme.colors.hero};

  @media (min-width: 900px) {
    opacity: 1;
  }
  @media (min-width: 1500px) {
    width: 40%;
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
  @media (min-width: 900px) {
    width: 75%;
    left: 25%;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 220px 0 180px 10px ${props => props.theme.colors.hero};
  }
  }
  @media (min-width: 1500px) {
    width: 60%;
    left: 40%;
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
  @media (min-width: 900px) {
    opacity: 0;
  }
`


const HeroTextBox = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 60%;
  z-index: 13;
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    /* width: 50%; */
    bottom: 15px;
    left: 15px;
  }
  @media (min-width: 900px) {
    bottom: 25%;
    width: 35%;
  }


`

const HeroQuote = styled(H2)`
  color: white;
  font-size: 2em;
  align-self: flex-start;
  text-align: left;
  transition: transform 1.1s ease;
  transform: ${({ isVisible }) => isVisible ? 'translateX(0)' : 'translateX(-105%)'};
  font-size: calc(32px + (70 - 32) * ((100vw - 320px) / (1600 - 320)));
  /* 
  calc([min] + ([max] - [min]) * ((100vw - [minVw]) / ([maxVw] - [minVw])))
   */
`;

const HeroTitle = styled(H1)`
  color: white;
  font-style: italic;
  font-size: 1.2em;
  font-weight: bolder;
  align-self: flex-start;
  text-align: start;
  transition: transform 1.1s ease;
  transform: ${({ isVisible }) => isVisible ? 'translateX(0)' : 'translateX(250%)'};
  font-size: calc(19px + (35 - 19) * ((100vw - 320px) / (1600 - 320)));
  @media (min-width: 760px) {
    transform: ${({ isVisible }) => isVisible ? 'translateX(0)' : 'translateX(800%)'};
  }
`

function Hero({ setRecipeClicked }) {
  const [isVisible, setVisible] = useState();
  const data = useStaticQuery(graphql`
    query {
      mongodbTestRecipes(title: { eq: "Shakshouka" }) {
        title
        quote
        publish_date   
        fields {
          images {
            localFile {
              childImageSharp {
                fluid(maxHeight: 1600) {
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
  const slug = makeSlug(featured.title);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const hero = document.getElementById('hero-image');
      const options = {
        threshold: 0.5
      }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.isIntersecting ? setVisible(true) : setVisible(false);
        })
      }, options);
      observer.observe(hero);
      return () => observer.unobserve(hero);
    }
  }, [])

  return (
    <Wrapper to={`/recipe/${slug}`} onClick={() => setRecipeClicked(true) }>
      <DimLayer
        id="hero-image"
      ></DimLayer>
      <BigScreenBox></BigScreenBox>
      <HeroImage
        fluid={featured.fields.images[0].localFile.childImageSharp.fluid}
        alt={featured.title}
        />
      <HeroTextBox
        isVisible={isVisible}
      >
        <HeroQuote isVisible={isVisible}>{`${featured.quote}`}</HeroQuote>
        {/* <HeroQuote isVisible={isVisible}>Turmeric in a burger? Yes, please.</HeroQuote> */}
        <HeroTitle isVisible={isVisible}>{featured.title}</HeroTitle>
      </HeroTextBox>
    </Wrapper>
  )
}
Hero.propTypes = {
  setRecipeClicked: PropTypes.func
}

export default Hero;