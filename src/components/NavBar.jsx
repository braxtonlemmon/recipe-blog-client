import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import Hamburger from "./Hamburger"
import PropTypes from "prop-types"

const HeaderBar = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 503;
  background: white;
  height: 60px;
  box-shadow: 0px 2px 2px grey;
  grid-area: navbar;
  @supports not (display: grid) {
    position: relative;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  .logo {
    font-weight: bolder;
  }
`

const Logo = styled.p`
  position: absolute;
  left: 10px;
  top: 17px;
  height: 100%;
  opacity: 0;
  color: ${props => props.theme.colors.dark};
  transition: opacity 250ms ease;
  opacity: ${({ isHeaderVisible }) => (isHeaderVisible ? "0" : "1")};
  font-size: 1.5em;
  transition: transform 400ms ease;
  transform: ${props =>
    props.isHeaderVisible ? "translateY(-150%)" : "translateY(0%)"};
`

const Links = styled.div`
  display: flex;
  display: grid;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  grid-auto-flow: column;
  justify-self: baseline;
  overflow: hidden;
  transition: transform 500ms ease;
  transform: ${props =>
    props.isHeaderVisible ? "translateY(0)" : "translateY(180%)"};
  @media (min-width: 412px) {
    gap: 20px;
    font-size: 1.1em;
  }
  @media (min-width: 730px) {
    ${props =>
      !props.isHeaderVisible &&
      css`
        transform: translateX(25%);
      `}
  }
  @media (min-width: 950px) {
    transform: translateX(0);
  }
`

const NavLink = styled.p`
  color: ${props => props.theme.colors.dark};
  text-transform: uppercase;
  font-size: 0.8em;
  padding: 4px 0 5px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  transition: border-bottom 250ms ease-in-out;
  transition: all 250ms ease;
  &:hover {
    border-bottom: 1px solid rgba(0, 0, 0, 1);
  }

  @media (min-width: 600px) {
    font-size: 1.2em;
  }

  @supports not (display: grid) {
    margin: 0 10px;
  }
`

function NavBar({
  isHeaderVisible,
  handleMenuClick,
  showMenu,
  location,
  setLoader,
}) {
  const handleClick = pageName => {
    if (pageName !== location.pathname) {
      setLoader(true)
    }
  }

  return (
    <HeaderBar id="navbar" isHeaderVisible={isHeaderVisible}>
      <Content isHeaderVisible={isHeaderVisible}>
        <Link to="/">
          <Logo isHeaderVisible={isHeaderVisible} className="logo">
            PEEL THE GARLIC
          </Logo>
        </Link>
        <Hamburger
          onClick={() => handleMenuClick()}
          isHeaderVisible={isHeaderVisible}
        >
          <div className="icon">
            <div className={showMenu ? "line1 view" : "line1"}></div>
            <div className={showMenu ? "line2 view" : "line2"}></div>
            <div className={showMenu ? "line3 view" : "line3"}></div>
          </div>
        </Hamburger>
        <Links isHeaderVisible={isHeaderVisible}>
          <Link onClick={() => handleClick("/")} to="/#recipes-index">
            <NavLink selected={location.pathname === "/"}>Recipes</NavLink>
          </Link>
          {/* <Link onClick={() => handleClick()} to={`/recipe/${getRandomTitle()}`}>
            <NavLink>Random</NavLink>
          </Link> */}
          <Link onClick={() => handleClick("/About")} to="/About">
            <NavLink selected={location.pathname === "/About"}>About</NavLink>
          </Link>
          <Link onClick={() => handleClick("/Contact")} to="/Contact">
            <NavLink selected={location.pathname === "/Contact"}>
              Contact
            </NavLink>
          </Link>
          <Link onClick={() => handleClick("/Newsletter")} to="/Newsletter">
            <NavLink>Newsletter</NavLink>
          </Link>
        </Links>
      </Content>
    </HeaderBar>
  )
}

NavBar.propTypes = {
  isHeaderVisible: PropTypes.bool,
  handleMenuClick: PropTypes.func,
  showMenu: PropTypes.bool,
  location: PropTypes.object,
  setLoader: PropTypes.func,
}

export default NavBar
