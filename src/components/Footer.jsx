import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import SocialMedia from '../components/SocialMedia';

const Wrapper = styled.footer`
  background: #754c4ccf;
  background: #cdcbd6;
  background: ${props => props.theme.colors.dark};
  width: 100%;
  color: white;
  padding: 15px 0 ;
  padding-bottom: 50px;
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
    margin: 0 5px;
    &:hover {
      color: lightgray;
    }
    @media (min-width: 412px) {
      margin: 0 10px;
    }
  }
  padding-bottom: 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
`;

const Me = styled.div`
  margin-bottom: 10px;
  a {
    color: #cdcbd6;
    &:hover {
      color: #d96846;
    }
  }
`

const Copyright = styled.div`
  display: flex;
  span:first-child {
    font-size: 30px;
    margin-right: 3px;
    text-align: center;
  }
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function Footer() {
  return (
    <Wrapper>
      <Links>
        <Link aria-label="All Recipes" to='/'>Recipes</Link>
        <Link title="About Page" to='/About'>About</Link>
        <Link title="Contact Page" to='/Contact'>Contact</Link> 
        <Link title="Subscribe to Newsletter" to="/Subscribe">Subscribe</Link>
      </Links>
      <SocialMedia inverse={true} />
      <Me>Designed and developed by 
        <a title="Braxton Lemmon Web Developer" href="https://www.braxtonlemmon.com" target="_blank" rel="noopener noreferrer"> Braxton Lemmon</a>
      </Me>
      <Copyright>
        {'\u00A9 2020 - Peel the Garlic. All rights reserved.'}
      </Copyright>
    </Wrapper>
  )
}

export default Footer;