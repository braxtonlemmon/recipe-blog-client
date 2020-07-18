import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { H1 } from './Headings';
import PropTypes from 'prop-types';

const HeaderBar = styled.div`
  /* display: ${props => props.mobile ? 'none' : 'flex'}; */
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  align-items: center;
  justify-content: space-between;
  justify-content: center;
  z-index: 501;
  grid-area: header;
  position: relative;
`;

const MyH1 = styled(H1)`
  font-size: 2em;
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  text-align: center;
  color: #2F3020;
  font-family: 'Montserrat';
  text-transform: uppercase;
  @media (min-width: 380px) {
    font-size: 2.5em;
  }
  @media (min-width: 600px) {
    font-size: 4em;
  }
  @media (min-width: 1024px) {
    font-size: 5em;
  }
`;

const Border = styled.div`
  position: absolute;
  bottom: 0;
  width: 80%; 
  margin: 0 auto;
  height: 1px;
  background: #2F3020;
  transition: transform 500ms ease;
  transform: ${props => props.isHeaderVisible ? 'scaleX(100%)' : 'scaleX(0%)'};
  @media (min-width: 1024px) {
    width: 60%;
  }
`;

function Header({ isHeaderVisible }) {
  return (
    <>
      <HeaderBar id="header">
        <Link to='/'>
          <MyH1>Peel the Garlic</MyH1>
        </Link>
        <Border isHeaderVisible={isHeaderVisible}></Border>
      </HeaderBar>
    </>
  )
}

Header.propTypes = {
  isHeaderVisible: PropTypes.bool
}

export default Header;

