import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Responsive, Segment } from 'semantic-ui-react';
import Hamburger from './Hamburger';
import PropTypes from 'prop-types';

const HeaderBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 503;
  background: white;
  height: 50px;
  box-shadow: 0px 2px 2px grey;
  grid-area: navbar;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  padding: 11px 20px 10px 20px;
  align-items: center;
  align-content: center;
  justify-content: center;
  .logo {
    font-weight: bolder;
  }
`;

const Logo = styled.p`
  position: absolute;
  left: 10px;
  top: 12px;
  height: 100%;
  opacity: 0;
  color: #2f3020;
  transition: opacity 250ms ease;
  ${props =>
    !props.isHeaderVisible &&
    css`
      opacity: 1;
    `}
  font-size: 1.5em;
`

const Links = styled.div`
  display: grid;
  justify-items: center;
  justify-content: center;
  align-items: center;
  grid-auto-flow: column;
  transition: transform 500ms ease;
  justify-self: baseline;
  @media (min-width: 412px) {
    gap: 20px;
  }
  @media (min-width: 730px) {
    ${props => !props.isHeaderVisible && css`
      transform: translateX(30%);
    `}
  }
  @media (min-width: 900px) {
    transform: translateX(0);
  }
`;

const NavLink = styled.p`
  color: #2F3020;
  text-transform: uppercase;
  font-size: 0.9em;
  padding: 4px 0 5px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  border-top: 1px solid rgba(0, 0, 0, 0);
  transition: border-bottom 250ms ease-in-out;
  transition: border-top 250ms ease-in-out;
  transition: all 250ms ease;
  &:hover {
    border-bottom: 1px solid rgba(0, 0, 0, 1);
    border-top: 1px solid rgba(0, 0, 0, 1);
  }

  @media (min-width: 600px) {
    font-size: 1.2em;
  }
`;

function NavBar({ isHeaderVisible, handleMenuClick, showMenu }) {
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
  );
  
  const getRandomTitle = () => {
    const dbTitles = data.allMongodbTestRecipes.edges.map(({ node }) => node.title);
    const randomTitle = dbTitles[Math.floor(Math.random() * dbTitles.length)];
    return randomTitle.toLowerCase().replace(/ /g, '-');
  }
  
  return (
    <HeaderBar id="navbar" isHeaderVisible={isHeaderVisible}>
      <Content isHeaderVisible={isHeaderVisible}>
        <Link to="/">
          <Logo isHeaderVisible={isHeaderVisible} className="logo">
            PEEL THE GARLIC
          </Logo>
        </Link>

        {/* Mobile version */}
        <Responsive as={Segment} maxWidth={759}>
          <Hamburger onClick={() => handleMenuClick()}>
            <div className="icon">
              <div className={showMenu ? "line1 view" : "line1"}></div>
              <div className={showMenu ? "line2 view" : "line2"}></div>
              <div className={showMenu ? "line3 view" : "line3"}></div>
            </div>
          </Hamburger>
        </Responsive>

        {/* Larger-than-mobile version */}
        <Responsive as={Segment} minWidth={760}>
          <Links isHeaderVisible={isHeaderVisible}>
            <Link to="/">
              <NavLink>Recipes</NavLink>
            </Link>
            <Link to={`/recipe/${getRandomTitle()}`}>
              <NavLink>Random</NavLink>
            </Link>
            <Link to="/About">
              <NavLink>About</NavLink>
            </Link>
            <Link to="/Contact">
              <NavLink>Contact</NavLink>
            </Link>
          </Links>
        </Responsive>

      </Content>
    </HeaderBar>
  )
}

NavBar.propTypes = { 
  isHeaderVisible: PropTypes.bool, 
  handleMenuClick: PropTypes.func, 
  showMenu: PropTypes.func 
}

export default NavBar;

