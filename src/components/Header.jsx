import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { H1 } from './Headings';

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
  @media (min-width: 600px) {
    font-size: 4em;
  }
`;

function Header() {

  return (
    <>
      <HeaderBar id="header">
        <Link to='/'>
          <MyH1>Peel the Garlic</MyH1>
        </Link>
      </HeaderBar>
    </>
  )
}

export default Header;

