import React from 'react';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  grid-area: mobile;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 50px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 502;
  box-shadow: -3px 0 2px 1px rgba(0, 0, 0, 0.4);
  transition: transform 400ms ease;
  transform: ${({ showMenu }) => showMenu ? 'translateX(0%)' : 'translateX(150%)'};
  a {
    padding: 15px 10px;
    width: 100%;
    border-bottom: 1px solid black;
  }
  @media (min-width: 760px) {
    display: none;
  }
  
`
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
  
        
  const getRandomTitle = () => {
    const dbTitles = data.allMongodbTestRecipes.edges.map(({ node }) => node.title)
    const randomTitle = dbTitles[Math.floor(Math.random() * dbTitles.length)]
    return randomTitle.toLowerCase().replace(/ /g, "-")
  }
    
  
  return (
    <>
      {
        !isHeaderVisible && 
        <Wrapper showMenu={showMenu} id="menu">
          <Link 
            to="/"
            onClick={() => handleClick()}
            >
          Recipes
          </Link>
          <Link 
            to={`/recipe/${getRandomTitle()}`}
            onClick={() => handleClick()}
            >
          Random
          </Link>
          <Link 
            to="/About"
            onClick={() => handleClick()}
            >
          About
          </Link>
          <Link 
            to="/Contact"
            onClick={() => handleClick()}
            >
          Contact
          </Link>
        </Wrapper>
      }
    </>
  )
}

MobileMenu.propTypes = {
  showMenu: PropTypes.bool,
  setShowMenu: PropTypes.func,
  isHeaderVisible: PropTypes.bool
}

export default MobileMenu;