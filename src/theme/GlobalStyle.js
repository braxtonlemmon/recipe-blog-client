import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *:before, *:after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    /* font-family: 'Special Elite', cursive; */
    font-family: 'Josefin Sans', sans-serif;
    font-family: 'Montserrat';
  }

  body, html {
    height: 100%;
    width: 100%;
    /* font-family: 'Special Elite', cursive; */
    font-family: 'Josefin Sans', sans-serif;
    font-family: 'Montserrat';
  }

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    /* overflow-y: scroll; */
  }

  body {
    margin: 0;
    overflow-y: scroll;
  }

  a {
    text-decoration: none;
    color: black;
  }

`

export default GlobalStyle;