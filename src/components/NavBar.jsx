import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Responsive, Segment } from 'semantic-ui-react';

const HeaderBar = styled.div`
  position: sticky;
  top: 0;
  /* display: flex; */
  width: 100%;
  z-index: 503;
  background: white;
  height: 50px;
  box-shadow: 0px 2px 2px grey;
  grid-area: navbar;
  /* .logo { */
    /* font-weight: bolder; */
  /* } */
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
  /* padding-top: 12px; */
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

const MenuButton = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
  height: 28px;
  width: 28px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  cursor: pointer;
  .icon {
    display: inline-block;
    .line1,
    .line2,
    .line3 {
      margin: 6px 0;
      height: 2px;
      width: 35px;
      background: #2F3020;
      transition: transform 0.4s ease;
    }
    .line1 {
      transform-origin: top left;
    }
    .line3 {
      transform-origin: bottom left;
    }
    .view.line1 {
      transform: rotate(28deg);
    }
    .view.line2 {
      opacity: 0;
    }
    .view.line3 {
      transform: rotate(-28deg);
    }
  }
`

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
      <Responsive as={Segment} maxWidth={780}>
        <Content isHeaderVisible={isHeaderVisible}>
          <Link to="/">
            <Logo mobile isHeaderVisible={isHeaderVisible} className="logo">
              PEEL THE GARLIC
            </Logo>
          </Link>
          <MenuButton onClick={() => handleMenuClick()}>
            <div className="icon">
              <div className={showMenu ? "line1 view" : "line1"}></div>
              <div className={showMenu ? "line2 view" : "line2"}></div>
              <div className={showMenu ? "line3 view" : "line3"}></div>
            </div>
          </MenuButton>
        </Content>
      </Responsive>
      <Responsive as={Segment} minWidth={780}>
        <Content isHeaderVisible={isHeaderVisible}>
          <Link to="/">
            <Logo isHeaderVisible={isHeaderVisible} className="logo">
              PEEL THE GARLIC
            </Logo>
          </Link>
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
        </Content>
      </Responsive>
    </HeaderBar>
  )
}

export default NavBar;

