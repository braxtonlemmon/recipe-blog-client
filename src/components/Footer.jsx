import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.footer`
  background: #754c4ccf;
  width: 100%;
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  grid-area: footer;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-evenly;
  a {
    color: white;
    margin: 0 10px;
    &:hover {
      color: lightgray;
    }
  }
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
`;

const Me = styled.div`
  margin-bottom: 10px;
  a {
    color: purple;
    &:hover {
      color: lightblue;
    }
  }
`

const Copyright = styled.div`
  display: flex;
  span:first-child {
    font-size: 30px;
  }
  align-items: center;
`;

function Footer() {
  return (
    <Wrapper>
      <Links>
        <Link to='/'>Recipes</Link> -
        <Link to='/About'>About</Link> -
        <Link to='/Contact'>Contact</Link>
      </Links>
      <Me>Designed and developed by 
        <a href="https://www.braxtonlemmon.com" target="_blank"> Braxton Lemmon</a>
      </Me>
      <Copyright>
        <span role="img" aria-label="copyright">©</span>
        <span>2020 - Peel the Garlic. All rights reserved.</span>
      </Copyright>
    </Wrapper>
  )
}

export default Footer;