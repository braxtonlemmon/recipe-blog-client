import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import SocialMedia from './SocialMedia';

const Wrapper = styled.div`
  grid-area: mobile;
  padding-top: 10px;
  display: flex;
  align-items: baseline;
  /* flex-direction: column; */
  /* align-items: flex-start; */
  /* justify-content: baseline; */
  position: fixed;
  top: 0;
  left: 0px;
  /* bottom: 0; */
  width: 100%;
  height: 100%;
  background: white;
  z-index: 502;
  box-shadow: -3px 0 2px 1px rgba(0, 0, 0, 0.4);
  transition: transform 400ms ease;
  transform: ${({ showMenu }) => showMenu ? 'translateX(20%)' : 'translateX(150%)'};
  @media (min-width: 760px) {
    display: none;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  max-height: 600px;
  padding-top: 50px;
  padding-left: 5px;
  a {
    /* padding: 20px 10px; */
    width: 100%;
    font-size: 1.3em;
    /* border-bottom: 1px solid black; */
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 300px;
  padding-left: 10px;
  justify-content: space-around;
`;

function MobileMenu({ showMenu, setShowMenu, isHeaderVisible }) {
  const data = useStaticQuery(
    graphql`
      query {
        allMongodbTestRecipes {
          edges {
            node {
              title
            }
          }
        }
      }
    `);

  const handleClick = () => {
    setShowMenu(false);
  }

  useEffect(() => {
    const body = document.querySelector('body');
    showMenu ? body.style.overflow = 'hidden' : body.style.overflow = 'visible';
  }, [showMenu])
  
        
  const getRandomTitle = () => {
    const dbTitles = data.allMongodbTestRecipes.edges.map(({ node }) => node.title)
    const randomTitle = dbTitles[Math.floor(Math.random() * dbTitles.length)]
    return randomTitle.toLowerCase().replace(/ /g, "-")
  }
    
  
  return (
    <>
      {!isHeaderVisible && (
        <Wrapper showMenu={showMenu} id="menu">
          <Container>
            <Links>
              <Link to="/" onClick={() => handleClick()}>
                Recipes
              </Link>
              <Link to="/About" onClick={() => handleClick()}>
                About
              </Link>
              <Link to="/Contact" onClick={() => handleClick()}>
                Contact
              </Link>
              <Link
                to={`/Subscribe`}
                onClick={() => handleClick()}
              >
                Subscribe
              </Link>
            </Links>
            <SocialMedia inverse={false} />
          </Container>
        </Wrapper>
      )}
    </>
  )
}

MobileMenu.propTypes = {
  showMenu: PropTypes.bool,
  setShowMenu: PropTypes.func,
  isHeaderVisible: PropTypes.bool
}

export default MobileMenu;