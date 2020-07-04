import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { H1 } from './Headings';

const HeaderBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 20px; */
  background: white;
  align-items: center;
  justify-content: space-between;
  justify-content: center;
  z-index: 501;
  grid-area: header;
`;

const MyH1 = styled(H1)`
  font-size: 2em;
  border-bottom: 1px solid lightgrey;
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: center;
  @media (min-width: 600px) {
    font-size: 2.2em;
  }
`;

function Header() {
  return (
    <HeaderBar>
      <Link to='/'>
        <MyH1>Peel the Garlic</MyH1>
      </Link>
    </HeaderBar>
  )
}

export default Header;

