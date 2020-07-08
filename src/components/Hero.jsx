import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { H1 } from "./Headings"
import Img from 'gatsby-image';
import { Link, graphql, useStaticQuery } from 'gatsby';

const Wrapper = styled(Link)`
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
  transition: transform 1.1s ease;
  transform: ${({ isVisible }) => isVisible ? 'translateX(0)' : 'translateX(200%)'};

`

const HeroTextBox = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 60%;
  z-index: 13;
  display: flex;
  flex-direction: column;
  align-content: baseline;
  p {
    color: white;
    font-size: 2.5em;
    font-style: italic;
    transition: transform 1.1s ease;
    transform: ${({ isVisible }) => isVisible ? 'translateX(0)' : 'translateX(-105%)'};

  }
`

function Hero() {
  const [isVisible, setVisible] = useState();
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
  const slug = featured.title.toLowerCase().replace(/ /g, '-');

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
    <Wrapper to={`/recipe/${slug}`}>
      <DimLayer
        id="hero-image"
      ></DimLayer>
      <HeroImage
        fluid={featured.fields.images[0].localFile.childImageSharp.fluid}
        alt={featured.title}
        />
      <HeroTextBox
        isVisible={isVisible}
      >
        <p isVisible={isVisible}>{`"${featured.quote}"`}</p>
        <HeroText isVisible={isVisible}>{featured.title}</HeroText>
      </HeroTextBox>
    </Wrapper>
  )
}

export default Hero;