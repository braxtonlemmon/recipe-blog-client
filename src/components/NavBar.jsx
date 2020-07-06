import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';


const HeaderBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px 10px 10px 10px;
  background: white;
  align-items: center;
  justify-content: space-between;
  z-index: 502;
  justify-content: center;
  box-shadow: 0px 2px 2px grey;
  grid-area: navbar;
`;

const Links = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
  gap: 10px;
  position: sticky;
  top: 10px;
  @media (min-width: 412px) {
    gap: 20px;
  }

`;

const NavLink = styled.p`
  color: #2F3020;
  text-transform: uppercase;
  font-size: 0.9em;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  transition: border-bottom 250ms ease-in-out;
  &:hover {
    border-bottom: 1px solid rgba(0, 0, 0, 1);
  }

  @media (min-width: 600px) {
    font-size: 1.2em;
  }
`;

function NavBar() {
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
    <HeaderBar id="navbar">
      <Links>
        <Link to='/'><NavLink>Recipes</NavLink></Link>
        <Link to={`/recipe/${getRandomTitle()}`}><NavLink>Random</NavLink></Link>
        <Link to='/About'><NavLink>About</NavLink></Link>
        <Link to='/Contact'><NavLink>Contact</NavLink></Link>
      </Links>
    </HeaderBar>
  )
}

export default NavBar;

