import React from 'react';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 50px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, lightgrey, white);
  z-index: 502;
  transition: transform 400ms ease;
  transform: ${({ showMenu }) => showMenu ? 'translateX(30%)' : 'translateX(100%)'};
  a {
    padding: 15px 10px;
    width: 100%;
    border-bottom: 1px solid black;
  }
  
`

function MobileMenu({ showMenu, setShowMenu }) {
  const handleClick = () => {
    clearAllBodyScrollLocks();
    setShowMenu(false);
  }
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
      `
    )

    const getRandomTitle = () => {
      const dbTitles = data.allMongodbTestRecipes.edges.map(
        ({ node }) => node.title
      )
      const randomTitle = dbTitles[Math.floor(Math.random() * dbTitles.length)]
      return randomTitle.toLowerCase().replace(/ /g, "-")
    }

  
  return (
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
  )
}

export default MobileMenu;