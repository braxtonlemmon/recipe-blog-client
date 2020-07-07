import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import PropTypes from "prop-types"
import Header from './Header';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import Transition from './transition';
import { Segment, Responsive } from 'semantic-ui-react';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
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

const Layout = ({ children, location }) => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  }

  const handleMainClick = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const header = document.getElementById('header');
      const options = {
        threshold: 0
      }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.isIntersecting ? setHeaderVisible(true) : setHeaderVisible(false);
        })
      }, options)

      observer.observe(header);
      return () => observer.unobserve(header);
    }
  }, [])
  return (
    <Wrapper>
      <Header />
      <NavBar 
        isHeaderVisible={isHeaderVisible} 
        handleMenuClick={handleMenuClick}
        showMenu={showMenu}  
      />
      <MobileMenu 
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <Transition location={location}>
        <Main
          onClick={() => handleMainClick()}
        >
          {children}
        </Main>
      </Transition>
      <Footer />
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
