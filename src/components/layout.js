import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import PropTypes from "prop-types"
import Header from './Header';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import Transition from './transition';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto auto 1fr auto auto;
  grid-template-areas:
    "header"
    "navbar"
    "main"
    "mobile"
    "footer";
  min-height: 100vh;
  @media (min-width: 760px) {
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      "header"
      "navbar"
      "main"
      "mobile"
      "footer";
  }
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
    const body = document.querySelector('body');
    showMenu ? body.style.overflow = 'hidden' : body.style.overflow = 'visible';
  }, [showMenu])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const header = document.getElementById('header');
      const options = {
        threshold: 0
      }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
            setShowMenu(false);
          } else {
            setHeaderVisible(false);
          }
        })
      }, options)

      observer.observe(header);
      return () => observer.unobserve(header);
    }
  }, [])
  
  return (
    <Wrapper
      onClick={() => handleMainClick()}
    >
      <Header isHeaderVisible={isHeaderVisible} />
      <NavBar
        isHeaderVisible={isHeaderVisible}
        handleMenuClick={handleMenuClick}
        showMenu={showMenu}
      />
      <MobileMenu showMenu={showMenu} isHeaderVisible={isHeaderVisible} setShowMenu={setShowMenu} />
      <Main onClick={() => handleMainClick()}>
        <Transition location={location}>
          {children}
        </Transition>
      </Main>
      <Footer />
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
