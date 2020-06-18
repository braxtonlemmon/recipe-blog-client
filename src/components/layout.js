import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import PropTypes from "prop-types"
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    "header"
    "navbar"
    "main"
    "footer";
  min-height: 100vh;
`

const Main = styled.main`
  padding-bottom: 3em;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  grid-area: main;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <NavBar />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
