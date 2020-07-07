import styled from 'styled-components';

const Hamburger = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
  height: 28px;
  width: 28px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  cursor: pointer;
  .icon {
    display: inline-block;
    .line1,
    .line2,
    .line3 {
      margin: 6px 0;
      height: 2px;
      width: 35px;
      background: #2F3020;
      transition: transform 0.4s ease;
    }
    .line1 {
      transform-origin: top left;
    }
    .line3 {
      transform-origin: bottom left;
    }
    .view.line1 {
      transform: rotate(28deg);
    }
    .view.line2 {
      opacity: 0;
    }
    .view.line3 {
      transform: rotate(-28deg);
    }
  }
`

export default Hamburger;