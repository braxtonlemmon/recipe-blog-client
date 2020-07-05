import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';

const HeaderBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 10px;
  background: white;
  /* background: #cdcbd6; */
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 15px; */
  z-index: 502;
  justify-content: center;
  /* border-bottom: 3px solid black; */
  /* box-shadow: 0px 4px 3px lightgrey; */
  grid-area: navbar;
`;


const Buttons = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
  gap: 10px;
  position: sticky;
  top: 10px;
  border-top: 1px solid black;
  padding-top: 10px;
`;

const Button = styled.button`
  display: flex;
  /* background-color: #754c4ccf; */
  /* background-color: #596235; */
  background: white;
  color: white;
  color: black;
  justify-content: center;
  align-items: center;
  padding: 7px;
  font-size: 1em;
  border: none;
  /* border-radius: 5px; */
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    box-shadow: -2px 2px 2px darkgrey;
    transform: scale(1.01);
  }
  outline: none;
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
  )
  
  const getRandomTitle = () => {
    const dbTitles = data.allMongodbTestRecipes.edges.map(({ node }) => node.title);
    const randomTitle = dbTitles[Math.floor(Math.random() * dbTitles.length)];
    return randomTitle.toLowerCase().replace(/ /g, '-');
  }
  

  return (
    <HeaderBar id="navbar">
      <Buttons>
        <Link to='/'><Button>Recipes</Button></Link>
        <Link to={`/recipe/${getRandomTitle()}`}><Button>Random</Button></Link>
        <Link to='/About'><Button>About</Button></Link>
        <Link to='/Contact'><Button>Contact</Button></Link>
      </Buttons>
    </HeaderBar>
  )
}

export default NavBar;

